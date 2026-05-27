# WASI WebAssembly Demo

一个演示如何在浏览器中运行 WASI 目标 WebAssembly 程序的示例项目。

## 功能特性

- 支持 3 种 JavaScript 运行库：
  - **@bjorn3/browser_wasi_shim** - 纯浏览器 WASI shim
  - **WASM Runner** - 原生 WebAssembly API
  - **@wasmer/sdk** - Wasmer Registry 包运行器

- 行数统计示例程序 (C 语言编写)
- 响应式 UI (TailwindCSS)
- 核心代码展示

## 快速开始

```bash
# 安装依赖
npm install

# 编译 C 代码到 WASM
npm run compile

# 启动开发服务器
npm run dev
```

## CLI 测试命令

### 使用 wasi-sdk (本地编译)

```bash
# 编译 C 代码
cd wasi-demo

# 方式1: 使用 wasm32-wasip1-clang
"wasm32-wasip1-clang" \
  --target=wasm32 \
  --sysroot "C:\Users\admin\apps\wasi-sdk-33.0-x86_64-windows\share\wasi-sysroot" \
  -O2 -c src/linecount.c -o linecount.o

# 链接
"wasm-ld" \
  -L "C:\Users\admin\apps\wasi-sdk-33.0-x86_64-windows\share\wasi-sysroot\lib\wasm32-wasip1" \
  -L "C:\Users\admin\apps\wasi-sdk-33.0-x86_64-windows\lib\clang\22\lib\wasm32-unknown-wasip1" \
  "C:\Users\admin\apps\wasi-sdk-33.0-x86_64-windows\share\wasi-sysroot\lib\wasm32-wasip1/crt1.o" \
  linecount.o -lc -lclang_rt.builtins \
  --export-all --export-dynamic \
  -o public/linecount.wasm

# 运行 (stdin)
echo -e "line1\nline2\nline3" | wasmtime public/linecount.wasm

# 运行 (带参数)
wasmtime public/linecount.wasm -i public/test.txt
```

### 使用 wasmtime CLI

```bash
# 安装 wasmtime (如果未安装)
# Windows: winget install BytecodeLL.Wasmtime
# macOS: brew install wasmtime
# Linux: curl https://wasmtime.dev/install.sh -sSf | bash

# 基本运行 (stdin)
echo -e "hello\nworld\ntest" | wasmtime public/linecount.wasm

# 运行 (文件输入) - 需要 --dir 允许访问目录
wasmtime --dir=. public/linecount.wasm -- -i public/test.txt
```

### 使用 wasmer CLI

```bash
# 安装 wasmer (如果未安装)
# Windows: iwr https://win.wasmer.io -o wasmer-install.exe; .\wasmer-install.exe
# macOS: curl https://get.wasmer.io -sSfL | sh
# Linux: curl https://get.wasmer.io -sSfL | sh

# 基本运行 (stdin)
echo -e "hello\nworld\ntest" | wasmer run public/linecount.wasm

# 运行 (文件输入) - 必须使用 --volume 挂载目录
wasmer run --volume public:public public/linecount.wasm -- -i public/test.txt

# 挂载当前目录
wasmer run --volume .:. public/linecount.wasm -- -i public/test.txt

# 使用 wasmer js binding (Node.js)
npx wasmer-js-cli run public/linecount.wasm --stdin
```

### 使用 Node.js 运行 WASM

```bash
# 使用 @bjorn3/browser_wasi_shim (Node.js 适配)
node -e "
const { WASI, File, OpenFile, ConsoleStdout } = require('@bjorn3/browser_wasi_shim');
const fs = require('fs');

const wasi = new WASI(
  ['./linecount'],
  [],
  [
    new OpenFile(new File(Buffer.from('line1\nline2\nline3\n'))),
    ConsoleStdout.lineBuffered((text) => console.log('Output:', text)),
    ConsoleStdout.lineBuffered((text) => console.error('Error:', text)),
  ]
);

const wasm = fs.readFileSync('public/linecount.wasm');
WebAssembly.instantiate(wasm, { wasi_snapshot_preview1: wasi.wasiImport })
  .then(({ instance }) => wasi.start(instance));
"
```

## 项目结构

```
wasi-demo/
├── src/
│   ├── main.js           # 前端代码 (Preact)
│   └── linecount.c       # C 源代码
├── public/
│   ├── linecount.wasm    # 编译后的 WASM (gitignore)
│   └── test.txt          # 测试文件
├── scripts/
│   └── compile.js        # 编译脚本
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 依赖说明

- **@bjorn3/browser_wasi_shim** - 纯 JS 实现的 WASI，可在浏览器和 Node.js 运行
- **@wasmer/sdk** - 运行 Wasmer Registry 包 (如 Python/Rust)，需要 COOP/COEP headers
- **coi-serviceworker** - 提供跨域隔离支持 (用于 @wasmer/sdk)

## 浏览器运行

浏览器中运行时，`@wasmer/sdk` 需要 Cross-Origin Isolation 支持。coi-serviceworker 会自动添加必要的 headers。

访问 http://localhost:3000 后，选择运行库并测试。

## License

MIT