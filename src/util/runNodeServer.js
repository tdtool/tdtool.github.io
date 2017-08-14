/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-10 10:26:28
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-10 15:57:12
 */

 import path from 'path'
 import cp from 'child_process'

 const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//

 let server
 let pending = true
 let serverPath

 function runServer(serverConfig) {
   serverPath = path.join(serverConfig.output.path, serverConfig.output.filename)
   return new Promise((resolve) => {
     function onStdOut(data) {
       const time = new Date().toTimeString();
       const match = data.toString('utf8').match(RUNNING_REGEXP);

       process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
       process.stdout.write(data);

       if (match) {
         server.host = match[1];
         server.stdout.removeListener('data', onStdOut);
         server.stdout.on('data', x => process.stdout.write(x));
         pending = false;
         resolve(server);
       }
     }

     if (server) {
       server.kill('SIGTERM');
     }

     server = cp.spawn('node', [serverPath], {
       env: Object.assign({ NODE_ENV: 'development' }, process.env),
       silent: false,
     });

     if (pending) {
       server.once('exit', (code, signal) => {
         if (pending) {
           throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
         }
       });
     }

     server.stdout.on('data', onStdOut);
     server.stderr.on('data', x => process.stderr.write(x));

     return server;
   });
 }

 process.on('exit', () => {
   if (server) {
     server.kill('SIGTERM');
   }
 });

 export default runServer;
