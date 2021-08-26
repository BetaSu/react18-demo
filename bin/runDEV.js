const {spawn} = require('child_process');
const killPort = require('kill-port');

// 应用使用的端口
const DEFAULT_PORT = 3000;

killPort(DEFAULT_PORT, 'tcp').then(() => {
  spawn('vite', ['--force'], {stdio: 'inherit', shell: process.platform === 'win32'});
}, (e) => {
  console.log(`关闭端口${PORT}报错\n`, e);
})