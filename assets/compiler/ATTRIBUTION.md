# Bundled toolchain

StudyMon compiles and runs Side Quest programs entirely on your machine. Nothing is
uploaded and no compiler needs to be installed. That is possible because the
following third-party components are bundled here.

## wasm-clang
Clang and LLD compiled to WebAssembly, plus the sysroot and the `memfs` /
`shared.js` support code.

- Source: https://github.com/binji/wasm-clang
- Licence: Apache License 2.0 with LLVM exceptions, see `LICENSE`
- `shared.js` is modified: `hostWrite` additionally receives the file
  descriptor, so compiler diagnostics can be separated from program output.
- `worker.js` ships unmodified but is unused; StudyMon uses `js/engine/c-worker.js`.

| file | size | sha256 (first 32) |
| --- | --- | --- |
| clang | 29.8 MB | 2a466f0e990329d3230b869d04fc2080 |
| lld | 18.6 MB | 36419ed202011765222098d770121837 |
| memfs | 0.3 MB | 2c72ee42bd9430029dda8c6bafc9f371 |
| sysroot.tar | 8.9 MB | 2435a7b549af30c2be7ec249c405bc2e |
| shared.js (modified) | 24 KB | 00ba4470118725ca72a472821285fda2 |

## browser_wasi_shim
Runs the compiled student program in an in-memory WASI sandbox. Used for
execution only; the original `memfs` is still used for the compiler's sysroot,
because its EOF handling was not usable for student programs.

- Source: https://github.com/bjorn3/browser_wasi_shim
- Version 0.4.2, extracted under `wasi-shim/package`
- Licence: MIT or Apache-2.0, see `wasi-shim/package/LICENSE-MIT` and
  `LICENSE-APACHE`

### Adaptations, in js/engine/c-worker.js
The bundled libc predates WASI preview1, so three things are adapted rather than
patched into the shim:

1. `fd_seek` whence constants are remapped (legacy CUR/END/SET is 0/1/2, preview1
   is SET/CUR/END).
2. `fd_filestat_get` and `path_filestat_get` write the 56-byte legacy filestat
   layout.
3. Directory and file descriptors advertise full rights. This libc asks what
   rights it may inherit before it will call `path_open`, and the shim answers
   with none, so every `fopen` previously failed with ENOTCAPABLE (76) without
   ever reaching the filesystem. The sandbox boundary is the in-memory
   filesystem itself, which contains only the current test's files, so these
   bits are plumbing this libc requires rather than a control being relied on.

Individual sandbox files are capped at 1 MB by wrapping the shim's write paths.
