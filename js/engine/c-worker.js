/* Real Clang/LLD compilation and WASI execution, entirely within this worker. */
importScripts('../../assets/compiler/shared.js');
const ROOT='../../assets/compiler/';
const clean=s=>s.replace(/\x1b\[[0-9;]*m/g,'');
let running=false;
self.onmessage=async function(event){
 if(running)return;running=true;
 const job=event.data;let phase='compile',diagnostics='',output='',stderr='';
 const modules={};
 async function read(name){const r=await fetch(name);if(!r.ok)throw Error('Compiler asset unavailable: '+name);return r.arrayBuffer();}
 async function mod(name){return modules[name]||(modules[name]=await WebAssembly.compile(await read(name)));}
 try{
  postMessage({type:'phase',phase:'compile'});
  const api=new API({clang:ROOT+'clang',lld:ROOT+'lld',memfs:ROOT+'memfs',sysroot:ROOT+'sysroot.tar',readBuffer:read,compileStreaming:mod,hostWrite:s=>{diagnostics+=s;if(diagnostics.length>32768)throw Error('Compiler diagnostic limit exceeded.');}});
  api.hostLog=()=>{};api.hostLogAsync=async(_label,promise)=>await promise;
  await api.ready;
  api.memfs.addFile('quest.c',new TextEncoder().encode(job.source+"\n"));
  if(job.harness)api.memfs.addFile('harness.c',new TextEncoder().encode(job.harness+"\n"));
  const flags=api.clangCommonArgs.filter(x=>!['-disable-free','-fcolor-diagnostics'].includes(x));
  await api.run(await api.getModule(ROOT+'clang'),'clang','-cc1','-emit-obj',...flags,'-std=c11','-Wall','-Wextra','-Werror','-pedantic-errors','-O0','-o','quest.o','-x','c',job.harness?'harness.c':'quest.c');
  await api.run(await api.getModule(ROOT+'lld'),'wasm-ld','--no-threads','-z','stack-size=1048576','--max-memory=67108864','-Llib/wasm32-wasi','lib/wasm32-wasi/crt1.o','quest.o','-lc','-o','quest.wasm');
  const program=await WebAssembly.compile(api.memfs.getFileContents('quest.wasm').slice());
  const cases=job.cases||[{input:job.input||''}];
  postMessage({type:'compiled',diagnostics:clean(diagnostics).trim()});
  for(let i=0;i<cases.length;i++){
   phase='run';output='';stderr='';
   postMessage({type:'phase',phase:'run',index:i,total:cases.length});
   const {WASI,File,OpenFile,ConsoleStdout,PreopenDirectory}=await import('../../assets/compiler/wasi-shim/package/dist/index.js');
   const limit=1048576n;
   if(!OpenFile.prototype.questBounded){
    for(const method of ['fd_write','fd_pwrite','fd_allocate','fd_filestat_set_size']){
     const original=OpenFile.prototype[method];
     OpenFile.prototype[method]=function(...args){
      const end=method==='fd_write'?this.file_pos+BigInt(args[0].length):method==='fd_pwrite'?args[1]+BigInt(args[0].length):method==='fd_allocate'?args[0]+args[1]:args[0];
      if(end>limit)throw Error('Sandbox file limit exceeded (1 MB).');
      return original.apply(this,args);
     };
    }
    OpenFile.prototype.questBounded=true;
   }
   /* This libc predates preview1 and asks the directory what rights it may
      inherit BEFORE it will call path_open. The shim answers Fdstat(dir, 0),
      i.e. no rights at all, so every fopen failed with ENOTCAPABLE (76) and
      never reached the filesystem. Grant the full set: the sandbox boundary is
      the in-memory filesystem itself, which holds only this case's files, so
      the rights bits are plumbing this libc needs rather than a control we
      rely on. */
   if(!PreopenDirectory.prototype.questRights){
    const ALL_RIGHTS=(1n<<64n)-1n;
    for(const cls of [OpenFile,PreopenDirectory]){
     const original=cls.prototype.fd_fdstat_get;
     cls.prototype.fd_fdstat_get=function(){
      const r=original.call(this);
      if(r&&r.fdstat){r.fdstat.fs_rights_base=ALL_RIGHTS;r.fdstat.fs_rights_inherited=ALL_RIGHTS;}
      return r;
     };
    }
    PreopenDirectory.prototype.questRights=true;
   }
   const enc=new TextEncoder(),dec=new TextDecoder();
   const stdoutDecoder=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}),stderrDecoder=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true});
   let outputBytes=0;
   const entries=Object.entries(cases[i].files||{}).map(([name,data])=>[name,new File(Array.isArray(data)?new Uint8Array(data):enc.encode(data))]);
   const capture=fd=>bytes=>{outputBytes+=bytes.byteLength;if(outputBytes>16384)throw Error('Output limit exceeded (16 KB).');const str=(fd===2?stderrDecoder:stdoutDecoder).decode(bytes,{stream:true});if(fd===2)stderr+=str;else output+=str;};
   const wasi=new WASI(['quest'],[],[new OpenFile(new File(enc.encode(cases[i].input||''))),new ConsoleStdout(capture(1)),new ConsoleStdout(capture(2)),new PreopenDirectory('.',entries)]);
   const imports={...wasi.wasiImport};
   // This compiler's libc uses the original WASI ABI, predating preview1.
   const stat=(ptr,f)=>{const v=new DataView(wasi.inst.exports.memory.buffer);v.setBigUint64(ptr,f.dev,true);v.setBigUint64(ptr+8,f.ino,true);v.setUint8(ptr+16,f.filetype);v.setUint32(ptr+20,Number(f.nlink),true);for(const [offset,key] of [[24,'size'],[32,'atim'],[40,'mtim'],[48,'ctim']])v.setBigUint64(ptr+offset,f[key],true);};
   imports.fd_filestat_get=(fd,ptr)=>{const r=wasi.fds[fd]?.fd_filestat_get()||{ret:8};if(r.filestat)stat(ptr,r.filestat);return r.ret;};
   imports.path_filestat_get=(fd,flags,ptr,len,out)=>{const path=dec.decode(new Uint8Array(wasi.inst.exports.memory.buffer,ptr,len));const r=wasi.fds[fd]?.path_filestat_get(flags,path)||{ret:8};if(r.filestat)stat(out,r.filestat);return r.ret;};
   imports.fd_seek=(fd,offset,whence,out)=>wasi.wasiImport.fd_seek(fd,offset,[1,2,0][whence],out);
   let exitCode=0,error=null;
   try{const instance=await WebAssembly.instantiate(program,{wasi_unstable:imports});exitCode=wasi.start(instance);output+=stdoutDecoder.decode();stderr+=stderrDecoder.decode();}catch(e){exitCode=typeof e.code==='number'?e.code:1;error=clean(e.message||String(e));}
   postMessage({type:'case',index:i,output,stderr,exitCode,error});
  }
  postMessage({type:'done'});
 }catch(e){postMessage({type:'error',phase,message:clean(e.message),diagnostics:clean(diagnostics)});}
};
