import Logger from "./logger.ts";
let logger = new Logger('./wasm/optimized.wasm');
const buffer = new Deno.Buffer();
let wasmFile = undefined;
logger.Decode(buffer).then(() => {
    wasmFile = logger.ProcessLogs(buffer);
});

/*const wasmModule = new WebAssembly.Module(module);

const wasmInstance = new WebAssembly.Instance(wasmModule);

const main = wasmInstance.exports.main as CallableFunction;
console.log(main().toString());*/