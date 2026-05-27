import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import htm from 'htm';
import './style.css';

const html = htm.bind(h);

function generateLibraryCode(libKey, inputMethod, filePath, stdinContent) {
  const args = inputMethod === 'stdin'
    ? []
    : ['linecount.wasm', '-i', '/public/test.txt'];

  switch (libKey) {
    case 'wasmer':
      return `import { init, runWasix } from "@wasmer/sdk";

await init();

const module = await WebAssembly.compile(wasmBytes);
const encoder = new TextEncoder();
const mount = ${inputMethod === 'stdin' ? '{}' : `{
  "/public": { "test.txt": encoder.encode(testInput) }
}`};
const stdin = ${inputMethod === 'stdin' ? 'encoder.encode(testInput)' : '""'};

const instance = await runWasix(module, { args, mount, stdin });
const result = await instance.wait();
console.log(result.stdout);`;

    case 'browserWasiShim':
      if (inputMethod === 'stdin') {
        return `import { WASI, File, OpenFile, ConsoleStdout } from "@bjorn3/browser_wasi_shim";

// 创建 WASI 实例 (stdin 输入)
const wasi = new WASI(
  ['./linecount'],
  [],
  [
    new OpenFile(new File(new TextEncoder().encode(testInput))),
    ConsoleStdout.lineBuffered((text) => console.log(text)),
    ConsoleStdout.lineBuffered((text) => console.warn(text)),
  ]
);

// 加载并运行 WASM
const { instance } = await WebAssembly.instantiate(wasmBytes, {
  wasi_snapshot_preview1: wasi.wasiImport,
});

wasi.start(instance);`;
      } else {
        return `import { WASI, File, OpenFile, ConsoleStdout, PreopenDirectory } from "@bjorn3/browser_wasi_shim";

// 获取文件内容 (fetch)
const fileResponse = await fetch('${filePath}');
const fileData = new Uint8Array(await fileResponse.arrayBuffer());

// 解析目录和文件名
const parts = '${filePath}'.split('/');
const fileName = parts.pop();
const dirPath = parts.join('/') || '.';

// 创建 WASI 实例 (文件输入)
const wasi = new WASI(
  ['./linecount', '-i', '${filePath}'],
  [],
  [
    new OpenFile(new File([])), // stdin
    ConsoleStdout.lineBuffered((text) => console.log(text)),
    ConsoleStdout.lineBuffered((text) => console.warn(text)),
    new PreopenDirectory(dirPath, [[fileName, new File(fileData)]]),
  ]
);

// 加载并运行 WASM
const { instance } = await WebAssembly.instantiate(wasmBytes, {
  wasi_snapshot_preview1: wasi.wasiImport,
});

wasi.start(instance);`;
      }

    case 'wasmRunner':
      return `// 使用原生 WebAssembly API 运行 WASI 程序
const args = ${JSON.stringify(args)};
const encoder = new TextEncoder();
const argBuffers = args.map(arg => encoder.encode(arg + '\\0'));
const totalArgSize = argBuffers.reduce((sum, buf) => sum + buf.length, 0);

const importObject = {
  wasi_snapshot_preview1: {
    args_sizes_get: (argc, argv_buf_size) => {
      new Uint32Array(memory.buffer, argc, 1)[0] = args.length;
      new Uint32Array(memory.buffer, argv_buf_size, 1)[0] = totalArgSize;
      return 0;
    },
    args_get: (argv, argv_buf) => {
      const argvArray = new Uint32Array(memory.buffer, argv, args.length);
      let offset = 0;
      for (let i = 0; i < args.length; i++) {
        argvArray[i] = argv_buf + offset;
        const buf = argBuffers[i];
        new Uint8Array(memory.buffer, argv_buf + offset, buf.length).set(buf);
        offset += buf.length;
      }
      return 0;
    },
    environ_sizes_get: (count, size) => {
      new Uint32Array(memory.buffer, count, 1)[0] = 0;
      new Uint32Array(memory.buffer, size, 1)[0] = 0;
      return 0;
    },
    environ_get: () => 0,
    proc_exit: (code) => { throw new Error(\`Process exited: \${code}\`); },
    clock_time_get: (id, precision, buf) => {
      new BigUint64Array(memory.buffer, buf, 1)[0] = BigInt(Date.now()) * BigInt(1000000);
      return 0;
    },
    clock_res_get: () => 0,
    random_get: (buf, len) => { crypto.getRandomValues(new Uint8Array(memory.buffer, buf, len)); return 0; },
    fd_write: (fd, iovs_ptr, iovs_len, nwritten_ptr) => {
      if (fd === 1) {
        let total = 0;
        for (let i = 0; i < iovs_len; i++) {
          const ptr = new Uint32Array(memory.buffer, iovs_ptr + i * 8, 1)[0];
          const len = new Uint32Array(memory.buffer, iovs_ptr + i * 8 + 4, 1)[0];
          stdoutData += new TextDecoder().decode(new Uint8Array(memory.buffer, ptr, len));
          total += len;
        }
        new Uint32Array(memory.buffer, nwritten_ptr, 1)[0] = total;
        return 0;
      }
      return 0;
    },
    fd_read: ${inputMethod === 'stdin' ? `(fd, iovs_ptr, iovs_len, nread_ptr) => {
      if (fd === 0) {
        let total = 0;
        for (let i = 0; i < iovs_len; i++) {
          const ptr = new Uint32Array(memory.buffer, iovs_ptr + i * 8, 1)[0];
          const len = new Uint32Array(memory.buffer, iovs_ptr + i * 8 + 4, 1)[0];
          const dest = new Uint8Array(memory.buffer, ptr, len);
          const toRead = Math.min(len, stdinBuffer.length - stdinOffset);
          for (let j = 0; j < toRead; j++) dest[j] = stdinBuffer[stdinOffset + j];
          stdinOffset += toRead;
          total += toRead;
        }
        new Uint32Array(memory.buffer, nread_ptr, 1)[0] = total;
        return 0;
      }
      return 0;
    }` : `() => 0`},
    fd_close: () => 0,
    fd_seek: () => 0,
    fd_fdstat_get: () => 0,
    fd_filestat_get: () => 0,
    fd_prestat_get: () => 0,
    fd_prestat_dir_name: () => 0,
    path_open: () => 0,
    path_filestat_get: () => 0,
    fd_advise: () => 0,
    fd_allocate: () => 0,
    fd_datasync: () => 0,
    fd_fdstat_set_flags: () => 0,
    fd_fdstat_set_rights: () => 0,
    fd_filestat_set_size: () => 0,
    fd_filestat_set_times: () => 0,
    fd_pread: () => 0,
    fd_pwrite: () => 0,
    fd_readdir: () => 0,
    fd_renumber: () => 0,
    fd_sync: () => 0,
    fd_tell: () => 0,
    path_create_directory: () => 0,
    path_filestat_set_times: () => 0,
    path_link: () => 0,
    path_readlink: () => 0,
    path_remove_directory: () => 0,
    path_rename: () => 0,
    path_symlink: () => 0,
    path_unlink_file: () => 0,
    poll_oneoff: () => 0,
    sched_yield: () => 0,
    sock_accept: () => 0,
    sock_recv: () => 0,
    sock_send: () => 0,
    sock_shutdown: () => 0,
  },
};

let stdoutData = '';
let memory = null;${inputMethod === 'stdin' ? `
let stdinBuffer = new TextEncoder().encode(testInput);
let stdinOffset = 0;` : ''}

const { instance } = await WebAssembly.instantiate(wasmBytes, importObject);
memory = instance.exports.memory;

instance.exports._start();
console.log(stdoutData);`;
  }
}

const LIBRARIES = {
  wasmer: {
    name: '@wasmer/sdk',
    description: '官方 Wasmer SDK',
    features: ['本地 WASM', 'WASI/WASIX 支持', '需要 COOP/COEP'],
  },
  browserWasiShim: {
    name: '@bjorn3/browser_wasi_shim',
    description: '纯浏览器 WASI shim 实现',
    features: ['无需服务端', '轻量级', '浏览器运行'],
  },
  wasmRunner: {
    name: 'WASM Runner (原生)',
    description: '原生 WebAssembly API',
    features: ['零依赖', '最轻量', '跨平台兼容'],
  },
};

const DEMO_C_CODE = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char* argv[]) {
    FILE* input = stdin;
    FILE* output = stdout;
    char* input_path = NULL;
    char* output_path = NULL;

    // 解析参数 (-i input_file, -o output_file)
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-i") == 0 && i + 1 < argc) {
            input_path = argv[++i];
            input = fopen(input_path, "r");
        } else if (strcmp(argv[i], "-o") == 0 && i + 1 < argc) {
            output_path = argv[++i];
            output = fopen(output_path, "w");
        }
    }

    if (!input) {
        fprintf(stderr, "Error opening input\\n");
        return 1;
    }

    // 统计行数
    long lines = 0;
    int last_ch = 0;
    int ch;

    while ((ch = fgetc(input)) != EOF) {
        if (ch == '\\n') lines++;
        last_ch = ch;
    }
    if (last_ch != '\\n' && last_ch != 0) lines++;

    fprintf(output, "%ld\\n", lines);

    if (input_path) fclose(input);
    if (output_path) fclose(output);

    return 0;
}`;

function App() {
  const [selectedLib, setSelectedLib] = useState('wasmRunner');
  const [inputMethod, setInputMethod] = useState('stdin');
  const [filePath, setFilePath] = useState('public/test.txt');
  const [testInput, setTestInput] = useState('Hello, World!\nThis is line 2\nAnd line 3');
  const [wasmBinary, setWasmBinary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    loadWasm();
    setSelectedLib('wasmer');
  }, []);

  useEffect(() => {
    const code = generateLibraryCode(selectedLib, inputMethod, filePath, testInput);
    setGeneratedCode(code);
  }, [selectedLib, inputMethod, filePath, testInput]);

  async function loadWasm() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('linecount.wasm');
      if (!response.ok) {
        throw new Error('Failed to load WASM file. Please compile linecount.c first.');
      }
      const binary = await response.arrayBuffer();
      setWasmBinary(new Uint8Array(binary));
      setWasmLoaded(true);
    } catch (err) {
      setError(err.message);
      setWasmLoaded(false);
    }
    setLoading(false);
  }

  async function runWasmRunner() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let stdoutData = '';
      let memory = null;
      let stdinBuffer = null;
      let stdinOffset = 0;
      let fileBuffer = null;
      let fileOffset = 0;
      let fileFd = -1;

      // 构建参数字符串
      const args = inputMethod === 'stdin'
        ? ['./linecount']
        : ['./linecount', '-i', filePath];

      // 初始化 stdin/file 输入缓冲区
      if (inputMethod === 'stdin') {
        stdinBuffer = new TextEncoder().encode(testInput);
      } else {
        // 使用文件输入，先获取文件内容
        const fileResponse = await fetch(`/${filePath}`);
        if (fileResponse.ok) {
          const fileData = await fileResponse.arrayBuffer();
          fileBuffer = new Uint8Array(fileData);
        }
      }

      // 预分配参数内存
      const encoder = new TextEncoder();
      const argBuffers = args.map(arg => encoder.encode(arg + '\0'));
      const totalArgSize = argBuffers.reduce((sum, buf) => sum + buf.length, 0);

      const importObject = {
        wasi_snapshot_preview1: {
          args_sizes_get: (argc, argv_buf_size) => {
            new Uint32Array(memory.buffer, argc, 1)[0] = args.length;
            new Uint32Array(memory.buffer, argv_buf_size, 1)[0] = totalArgSize;
            return 0;
          },
          args_get: (argv, argv_buf) => {
            const argvArray = new Uint32Array(memory.buffer, argv, args.length);
            let offset = 0;
            for (let i = 0; i < args.length; i++) {
              argvArray[i] = argv_buf + offset;
              const buf = argBuffers[i];
              const dest = new Uint8Array(memory.buffer, argv_buf + offset, buf.length);
              dest.set(buf);
              offset += buf.length;
            }
            return 0;
          },
          environ_sizes_get: (count, size) => {
            new Uint32Array(memory.buffer, count, 1)[0] = 0;
            new Uint32Array(memory.buffer, size, 1)[0] = 0;
            return 0;
          },
          environ_get: () => 0,
          proc_exit: (code) => { throw new Error(`Process exited: ${code}`); },
          fd_write: (fd, iovs_ptr, iovs_len, nwritten_ptr) => {
            if (fd === 1) {
              let total = 0;
              for (let i = 0; i < iovs_len; i++) {
                const ptr = new Uint32Array(memory.buffer, iovs_ptr + i * 8, 1)[0];
                const len = new Uint32Array(memory.buffer, iovs_ptr + i * 8 + 4, 1)[0];
                stdoutData += new TextDecoder().decode(new Uint8Array(memory.buffer, ptr, len));
                total += len;
              }
              new Uint32Array(memory.buffer, nwritten_ptr, 1)[0] = total;
              setResult({ stdout: stdoutData.trim(), stderr: '' });
            }
            return 0;
          },
          fd_read: (fd, iovs_ptr, iovs_len, nread_ptr) => {
            const buf = inputMethod === 'stdin' ? stdinBuffer : (fd === fileFd ? fileBuffer : null);
            const offset = inputMethod === 'stdin' ? stdinOffset : (fd === fileFd ? fileOffset : 0);
            if (buf) {
              let total = 0;
              for (let i = 0; i < iovs_len; i++) {
                const ptr = new Uint32Array(memory.buffer, iovs_ptr + i * 8, 1)[0];
                const len = new Uint32Array(memory.buffer, iovs_ptr + i * 8 + 4, 1)[0];
                const dest = new Uint8Array(memory.buffer, ptr, len);
                const toRead = Math.min(len, buf.length - offset);
                for (let j = 0; j < toRead; j++) dest[j] = buf[offset + j];
                if (inputMethod === 'stdin') stdinOffset += toRead;
                else fileOffset += toRead;
                total += toRead;
              }
              new Uint32Array(memory.buffer, nread_ptr, 1)[0] = total;
              return 0;
            }
            return 0;
          },
          fd_seek: (fd, offset, whence, newoffset) => {
            if (fd === fileFd && fileBuffer) {
              let newOff;
              if (whence === 0) newOff = offset;
              else if (whence === 1) newOff = fileOffset + offset;
              else if (whence === 2) newOff = fileBuffer.length + offset;
              else return -1;
              fileOffset = newOff;
              if (newoffset) new Uint32Array(memory.buffer, newoffset, 1)[0] = fileOffset;
              return 0;
            }
            return 0;
          },
          fd_close: (fd) => { if (fd === fileFd) fileFd = -1; return 0; },
          fd_fdstat_get: (fd, buf) => {
            const view = new Uint8Array(memory.buffer, buf, 24);
            if (fd === 0 || fd === 1 || fd === 2) view[0] = 2;
            else if (fd === 3) view[0] = 1;
            else if (fd === fileFd) view[0] = 1;
            return 0;
          },
          fd_filestat_get: (fd, buf) => {
            if (fd === fileFd && fileBuffer) {
              new BigUint64Array(memory.buffer, buf, 6)[5] = BigInt(fileBuffer.length);
              return 0;
            }
            return 0;
          },
          fd_prestat_get: (fd, buf) => {
            if (fd === 3) {
              new Uint8Array(memory.buffer, buf, 1)[0] = 1;
              new Uint32Array(memory.buffer, buf + 4, 1)[0] = 1;
              return 0;
            }
            return 8;
          },
          fd_prestat_dir_name: (fd, path_ptr, path_len) => {
            if (fd === 3 && path_len > 0) {
              new Uint8Array(memory.buffer, path_ptr, 1)[0] = 46;
              return 0;
            }
            return 8;
          },
          path_open: (fd, dirflags, path, path_len, oflags, rights_base, rights_inheriting, fdflags, opened_fd) => {
            const pathStr = new TextDecoder().decode(new Uint8Array(memory.buffer, path, path_len));
            const fileName = pathStr.split('/').pop();
            if (inputMethod === 'argument' && fileBuffer && fileName === filePath.split('/').pop()) {
              fileFd = 4;
              new Uint32Array(memory.buffer, opened_fd, 1)[0] = fileFd;
              return 0;
            }
            return -1;
          },
          path_filestat_get: (fd, flags, path, path_len, buf) => {
            if (fd === fileFd && fileBuffer) {
              new BigUint64Array(memory.buffer, buf, 6)[5] = BigInt(fileBuffer.length);
              return 0;
            }
            return -1;
          },
          clock_time_get: (id, precision, buf) => {
            new BigUint64Array(memory.buffer, buf, 1)[0] = BigInt(Date.now()) * BigInt(1000000);
            return 0;
          },
          clock_res_get: () => 0,
          random_get: (buf, len) => { crypto.getRandomValues(new Uint8Array(memory.buffer, buf, len)); return 0; },
          fd_advise: () => 0,
          fd_allocate: () => 0,
          fd_datasync: () => 0,
          fd_fdstat_set_flags: () => 0,
          fd_fdstat_set_rights: () => 0,
          fd_filestat_set_size: () => 0,
          fd_filestat_set_times: () => 0,
          fd_pread: () => 0,
          fd_pwrite: () => 0,
          fd_readdir: () => 0,
          fd_renumber: () => 0,
          fd_sync: () => 0,
          fd_tell: () => 0,
          path_create_directory: () => 0,
          path_filestat_set_times: () => 0,
          path_link: () => 0,
          path_readlink: () => 0,
          path_remove_directory: () => 0,
          path_rename: () => 0,
          path_symlink: () => 0,
          path_unlink_file: () => 0,
          poll_oneoff: () => 0,
          sched_yield: () => 0,
          sock_accept: () => 0,
          sock_recv: () => 0,
          sock_send: () => 0,
          sock_shutdown: () => 0,
        },
      };

      const { instance } = await WebAssembly.instantiate(wasmBinary.buffer, importObject);
      memory = instance.exports.memory;
      instance.exports._start();
    } catch (err) {
      setError(`WASM Runner Error: ${err.message}`);
    }
    setLoading(false);
  }

  async function runWithBrowserWasiShim() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { WASI, File, OpenFile, ConsoleStdout, PreopenDirectory } = await import('@bjorn3/browser_wasi_shim');

      let stdoutData = '';

      if (inputMethod === 'stdin') {
        const wasi = new WASI(
          ['./linecount'],
          [],
          [
            new OpenFile(new File(new TextEncoder().encode(testInput))),
            ConsoleStdout.lineBuffered((text) => {
              stdoutData += text;
              setResult({ stdout: stdoutData.trim(), stderr: '' });
            }),
            ConsoleStdout.lineBuffered(() => {}),
          ]
        );

        const { instance } = await WebAssembly.instantiate(wasmBinary.buffer, {
          wasi_snapshot_preview1: wasi.wasiImport,
        });
        wasi.start(instance);
      } else {
        // 使用 fetch 获取文件内容
        const fileResponse = await fetch(`/${filePath}`);
        if (!fileResponse.ok) {
          throw new Error(`Failed to fetch file: ${filePath}`);
        }
        const fileData = new Uint8Array(await fileResponse.arrayBuffer());

        // 解析目录和文件名
        const parts = filePath.split('/');
        const fileName = parts.pop();
        const dirPath = parts.join('/') || '.';

        const wasi = new WASI(
          ['./linecount', '-i', filePath],
          [],
          [
            new OpenFile(new File([])), // stdin
            ConsoleStdout.lineBuffered((text) => {
              stdoutData += text;
              setResult({ stdout: stdoutData.trim(), stderr: '' });
            }),
            ConsoleStdout.lineBuffered(() => {}),
            new PreopenDirectory(dirPath, [[fileName, new File(fileData)]]),
          ]
        );

        const { instance } = await WebAssembly.instantiate(wasmBinary.buffer, {
          wasi_snapshot_preview1: wasi.wasiImport,
        });
        wasi.start(instance);
      }
    } catch (err) {
      setError(`Browser WASI Shim Error: ${err.message}`);
    }
    setLoading(false);
  }

  async function ensureWasmerInit() {
    if (window.__WASMER_INITIALIZED__) return;

    const { init, initializeLogger } = await import("/node_modules/@wasmer/sdk/dist/index.mjs?v=ccc61144");
    
    await init();
    initializeLogger("debug");
    
    window.__WASMER_INITIALIZED__ = true;
  }

  async function runWithWasmerWasix() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      await ensureWasmerInit();

      const { runWasix } = await import("/node_modules/@wasmer/sdk/dist/index.mjs?v=ccc61144");

      const module = await WebAssembly.compile(wasmBinary);

      const args = inputMethod === 'stdin' ? [] : ["linecount.wasm", '-i', '/public/test.txt'];
      const mount = {};
      if (inputMethod !== 'stdin') {
        const encoder = new TextEncoder();
        // NOT WORKING
        // mount["/public/test.txt"] = encoder.encode(testInput); 
        // WORKING
        // mount = {
        //   "/public" : {
        //     "test.txt": encoder.encode(testInput)
        //   }
        // }
        mount["/public"] = {
          "test.txt": encoder.encode(testInput)
        }
      };
      const stdin = inputMethod === 'stdin' ? new TextEncoder().encode(testInput) : "";

      const instance = await runWasix(module, { args, mount, stdin });

      // working as passed as stdin in runWasix, different with pkg.entrypoint.run
      // if (inputMethod === 'stdin') {
      //   const encoder = new TextEncoder();
      //   const writer = instance.stdin.getWriter();
      //   await writer.write(encoder.encode(testInput));
      //   await writer.close();
      // }

      const result = await instance.wait();

      if (result.ok) {
        setResult({ stdout: result.stdout || '', stderr: '' });
      } else {
        setError(`Exit code: ${result.code}\n${result.stderr || ''}`);
      }
    } catch (err) {
      setError(`Wasmer Error: ${err.message}`);
      console.error(err);
    }
    setLoading(false);
  }

  async function runWithWasmer() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      await ensureWasmerInit();

      const { Wasmer } = await import("/node_modules/@wasmer/sdk/dist/index.mjs?v=ccc61144");

      const args = inputMethod === 'stdin' ? [] : ['-i', '/public/test.txt'];
      const mount = inputMethod === 'stdin' ? {} : {
          "/public" : {
            "test.txt": new TextEncoder().encode(testInput)
          }
      };
      const stdin = inputMethod === 'stdin' ? new TextEncoder().encode(testInput) : "";

      // method 1 working
      // Wasmer.fromWasm accept Uint8Array (wasmBinary) instead of ArrayBuffer (wasmBinary.buffer)
      const pkg = await Wasmer.fromWasm(wasmBinary);
      const instance = await pkg.entrypoint.run({ args, mount, stdin });

      // method 2 working
      // const manifest = {
      //     module: [
      //       {
      //         name: "main-module",
      //         abi: "wasi",
      //         source: wasmBinary,
      //       },
      //     ],
      //     command: [
      //       {
      //         name: "main-command",
      //         module: "main-module",
      //         runner: "wasi", // or "wasix" depending on your binary dependencies
      //       },
      //     ],
      // };
      // const pkg = await Wasmer.createPackage(manifest);
      // const instance = await pkg.commands["main-command"].run({ args, mount, });

      // method 3 not working
      // Wasmer Error: Unable to detect the WEBC version
      // const pkg = await Wasmer.fromFile(wasmBinary.buffer);

      // need to parse stdin in pkg.entrypoint.run, or will get stdin as output direct
      // if (inputMethod === 'stdin') {
      //   const writer = instance.stdin.getWriter();
      //   await writer.write(new TextEncoder().encode(testInput));
      //   await writer.close();
      // }

      const result = await instance.wait();

      if (result.ok) {
        setResult({ stdout: result.stdout || '', stderr: '' });
      } else {
        setError(`Exit code: ${result.code}\n${result.stderr || ''}`);
      }
    } catch (err) {
      setError(`Wasmer Error: ${err.message}`);
    }
    setLoading(false);
  }

  async function runWasm() {
    switch (selectedLib) {
      case 'wasmer':
        await runWithWasmer();
        break;
      case 'browserWasiShim':
        await runWithBrowserWasiShim();
        break;
      case 'wasmRunner':
        await runWasmRunner();
        break;
    }
  }

  const currentLib = LIBRARIES[selectedLib];

  return html`
    <div class="space-y-8">
      <header class="text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          WASI WebAssembly Demo
        </h1>
        <p class="text-slate-400 text-lg">在浏览器中运行 WASI 目标 WebAssembly 程序</p>
      </header>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="space-y-6">
          <!-- Library Selector -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              选择运行库
            </h2>
            <div class="grid gap-3">
              ${Object.entries(LIBRARIES).map(([key, lib]) => html`
                <button
                  key=${key}
                  onclick=${() => setSelectedLib(key)}
                  class="p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedLib === key
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                  }"
                >
                  <div class="font-semibold text-lg">${lib.name}</div>
                  <div class="text-slate-400 text-sm mt-1">${lib.description}</div>
                  <div class="flex flex-wrap gap-2 mt-2">
                    ${lib.features.map(f => html`
                      <span class="px-2 py-0.5 bg-slate-600/50 rounded text-xs">${f}</span>
                    `)}
                  </div>
                </button>
              `)}
            </div>
          </div>

          <!-- Input Method -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4">输入方式</h2>
            <div class="flex gap-2 mb-4">
              <button
                onclick=${() => setInputMethod('stdin')}
                class="px-4 py-2 rounded-lg transition-colors ${
                  inputMethod === 'stdin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }"
              >
                Stdin
              </button>
              <button
                onclick=${() => setInputMethod('argument')}
                class="px-4 py-2 rounded-lg transition-colors ${
                  inputMethod === 'argument'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }"
              >
                Argument (-i file)
              </button>
            </div>

            ${inputMethod === 'stdin' ? html`
              <textarea
                value=${testInput}
                oninput=${(e) => setTestInput(e.target.value)}
                placeholder="输入要统计行数的文本..."
                class="w-full h-32 p-4 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              ></textarea>
              <p class="text-slate-500 text-sm mt-2">
                当前行数: ${(testInput.match(/\n/g) || []).length + (testInput ? 1 : 0)}
              </p>
            ` : html`
              <input
                type="text"
                value=${filePath}
                oninput=${(e) => setFilePath(e.target.value)}
                placeholder="输入文件路径 (如: public/test.txt)"
                class="w-full p-4 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <p class="text-slate-500 text-sm mt-2">
                使用 -i 参数指定输入文件
              </p>
            `}
          </div>

          <!-- Run Button -->
          <button
            onclick=${runWasm}
            disabled=${!wasmLoaded || loading}
            class="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            ${loading ? html`
              <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              运行中...
            ` : html`
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              运行 WebAssembly
            `}
          </button>

          <!-- Result -->
          ${result && html`
            <div class="bg-green-900/30 border border-green-700 rounded-2xl p-6">
              <h3 class="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                执行结果
              </h3>
              <div class="font-mono bg-slate-900/50 rounded-lg p-4">
                <pre class="text-green-300 whitespace-pre-wrap">${result.stdout}</pre>
              </div>
            </div>
          `}

          ${error && html`
            <div class="bg-red-900/30 border border-red-700 rounded-2xl p-6">
              <h3 class="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                错误
              </h3>
              <pre class="text-red-300 font-mono text-sm whitespace-pre-wrap">${error}</pre>
            </div>
          `}
        </div>

        <div class="space-y-6">
          <!-- Generated Code -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              ${currentLib.name} 代码
            </h2>
            <div class="bg-slate-900 rounded-xl p-4 overflow-auto max-h-80">
              <pre class="text-sm font-mono text-slate-300"><code>${generatedCode}</code></pre>
            </div>
          </div>

          <!-- C Code -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              C 源代码
            </h2>
            <div class="bg-slate-900 rounded-xl p-4 overflow-auto max-h-80">
              <pre class="text-sm font-mono text-slate-300"><code>${DEMO_C_CODE}</code></pre>
            </div>
          </div>

          <!-- Compile Instructions -->
          <div class="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              编译命令
            </h2>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-sm space-y-1">
              <p class="text-cyan-300"># npm run compile</p>
              <p class="text-green-400 mt-2"># 或手动编译:</p>
              <p class="text-yellow-400 mt-2">wasm32-wasip1-clang --target=wasm32 \</p>
              <p class="text-slate-400">&nbsp;&nbsp;--sysroot "C:\Users\admin\apps\wasi-sdk-33.0-x86_64-windows\share\wasi-sysroot" \</p>
              <p class="text-slate-400">&nbsp;&nbsp;-O2 -c src/linecount.c -o linecount.o</p>
              <p class="text-yellow-400 mt-2">wasm-ld \</p>
              <p class="text-slate-400">&nbsp;&nbsp;-L "wasi-sysroot/lib/wasm32-wasip1" \</p>
              <p class="text-slate-400">&nbsp;&nbsp;wasi-sysroot/lib/wasm32-wasip1/crt1.o linecount.o \</p>
              <p class="text-slate-400">&nbsp;&nbsp;-lc -lclang_rt.builtins --export-all --export-dynamic \</p>
              <p class="text-slate-400">&nbsp;&nbsp;-o public/linecount.wasm</p>
            </div>
          </div>
        </div>
      </div>

      <footer class="text-center text-slate-500 text-sm mt-8">
        <p>WASI Demo - 使用不同 JavaScript 库在浏览器中运行 WebAssembly</p>
      </footer>
    </div>
  `;
}

render(html`<${App} />`, document.getElementById('app'));