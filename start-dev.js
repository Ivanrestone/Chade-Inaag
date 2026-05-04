import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Chade Inaag development server...\n');

// Start backend
const backend = spawn('node', ['server.js'], {
  cwd: join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping development servers...');
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit(0);
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
  frontend.kill('SIGINT');
  process.exit(code);
});

frontend.on('close', (code) => {
  console.log(`Frontend process exited with code ${code}`);
  backend.kill('SIGINT');
  process.exit(code);
});
