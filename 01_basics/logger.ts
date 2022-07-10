export default class Logger {
    constructor(filePath: string) {
        this.encoder = new TextEncoder();
        this.filePath = filePath;
        this.fileContents = undefined;
        this.decoder = new TextDecoder();
        this.logLines = undefined;
    }

   async Decode(buffer: Deno.Buffer) {
        this.fileContents = await Deno.readFile(this.filePath);
        this.logLines = this.GetLogLines();
        setInterval(() => {
            const randomLine = Math.floor(Math.min(Math.random() * 1000, this.logLines.length));
            buffer.write(this.encoder.encode(this.logLines[randomLine]));
        },   100)
    }

    GetLogLines() {
        return this.decoder.decode(this.fileContents).split("\n");
    }

    async ProcessLogs(buffer: Deno.Buffer) {
        const destination = new Uint8Array(256);
        const readBytes = await buffer.read(destination);
        if (readBytes) {
            const read = this.decoder.decode(destination);
            console.log(read);
            await Deno.stdout.write(this.encoder.encode(`${read}\n`));
        }
        setTimeout(this.ProcessLogs, 10);
    }
}