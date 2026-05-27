import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasiSdkPath = process.env.WASI_SDK_PATH || 'C:/Users/admin/apps/wasi-sdk-33.0-x86_64-windows';
const binDir = path.join(wasiSdkPath, 'bin');
const clangPath = path.join(binDir, 'wasm32-wasip1-clang');
const ldPath = path.join(binDir, 'wasm-ld');
const wasiSysroot = path.join(wasiSdkPath, 'share', 'wasi-sysroot');
const includeDir = path.join(wasiSysroot, 'include', 'wasm32-wasip1');
const libDir = path.join(wasiSysroot, 'lib', 'wasm32-wasip1');
const rtDir = path.join(wasiSdkPath, 'lib', 'clang', '22', 'lib', 'wasm32-unknown-wasip1');
const publicDir = path.join(__dirname, '..', 'public');
const sourceFile = path.join(__dirname, '..', 'src', 'linecount.c');
const objectFile = path.join(__dirname, '..', 'linecount.o');
const outputFile = path.join(publicDir, 'linecount.wasm');

console.log('Compiling linecount.c to WebAssembly...');
console.log(`WASI SDK: ${wasiSdkPath}`);
console.log(`Source: ${sourceFile}`);
console.log(`Output: ${outputFile}`);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(clangPath + '.exe')) {
  console.error(`Error: clang not found at ${clangPath}`);
  process.exit(1);
}

try {
  // Step 1: Compile to object file
  const compileCmd = [
    `"${clangPath}.exe"`,
    `--target=wasm32`,
    `--sysroot "${wasiSysroot}"`,
    `-I "${includeDir}"`,
    `-O2`,
    `-c`,
    `-o "${objectFile}"`,
    `"${sourceFile}"`,
  ].join(' ');

  console.log(`\n[1/2] Compiling: ${compileCmd}\n`);
  execSync(compileCmd, { stdio: 'inherit' });

  // Step 2: Link to wasm
  const linkCmd = [
    `"${ldPath}.exe"`,
    `-L "${libDir}"`,
    `-L "${rtDir}"`,
    `"${libDir}/crt1.o"`,
    `"${objectFile}"`,
    `-lc`,
    `-lclang_rt.builtins`,
    `--export-all`,
    `--export-dynamic`,
    `-o "${outputFile}"`,
  ].join(' ');

  console.log(`\n[2/2] Linking: ${linkCmd}\n`);
  execSync(linkCmd, { stdio: 'inherit' });

  // Cleanup
  fs.unlinkSync(objectFile);

  console.log('\n✓ Compilation successful!');
  console.log(`Output: ${outputFile}`);
} catch (error) {
  console.error('\n✗ Compilation failed!');
  if (fs.existsSync(objectFile)) {
    fs.unlinkSync(objectFile);
  }
  process.exit(1);
}