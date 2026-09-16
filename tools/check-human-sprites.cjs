const { execFileSync } = require('child_process');

try {
  process.stdout.write(execFileSync('python', ['tools/check-human-sprites.py'], {
    cwd: require('path').resolve(__dirname, '..'),
    encoding: 'utf8'
  }));
} catch (error) {
  process.stdout.write(error.stdout || '');
  process.stderr.write(error.stderr || '');
  process.exitCode = error.status || 1;
}
