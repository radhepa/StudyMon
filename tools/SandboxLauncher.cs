using System;
using System.IO;
using System.Net;
using System.Diagnostics;
using System.Threading;
using System.Windows.Forms;
[assembly: System.Reflection.AssemblyTitle("Kingdom Sandbox")]
[assembly: System.Reflection.AssemblyDescription("StudyMon Pokemon Kingdom sandbox launcher")]
/* Same idea as Launcher.cs, on its own port so the sandbox and the game can
   run side by side. Build: see the comment at the top of "Kingdom Sandbox.bat". */
class SandboxLauncher {
 const string Root = "http://127.0.0.1:8796/";
 const string Page = Root + "kingdom-sandbox.html";
 static bool Ready() {
  try { var req=(HttpWebRequest)WebRequest.Create(Page);req.Timeout=1000;req.ReadWriteTimeout=1000;req.Proxy=null;
   using(var response=req.GetResponse())using(var reader=new StreamReader(response.GetResponseStream()))return reader.ReadToEnd().Contains("Kingdom Sandbox");
  }catch{return false;}
 }
 [STAThread] static int Main(string[] args) {
  try {
   string root=AppDomain.CurrentDomain.BaseDirectory;
   if(!Ready()) {
    string node=Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),"nodejs","node.exe");
    if(!File.Exists(node))node="node.exe";
    var start=new ProcessStartInfo(node,"\""+Path.Combine(root,"tools","serve.js")+"\" 8796");
    start.WorkingDirectory=root;start.UseShellExecute=false;start.CreateNoWindow=true;start.WindowStyle=ProcessWindowStyle.Hidden;
    Process.Start(start);
    bool up=false;for(int i=0;i<30;i++){if(Ready()){up=true;break;}Thread.Sleep(200);}
    if(!up)throw new Exception("The sandbox server could not start on port 8796. Another application may be using this port.");
   }
   if(args.Length==0 || args[0]!="--check")Process.Start(new ProcessStartInfo(Page){UseShellExecute=true});
   return 0;
  } catch(Exception ex){MessageBox.Show(ex.Message,"Kingdom Sandbox launcher",MessageBoxButtons.OK,MessageBoxIcon.Error);return 1;}
 }
}
