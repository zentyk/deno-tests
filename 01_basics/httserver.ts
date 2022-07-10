//--import-map=import-maps.json --unstable httserver.ts
import { serve } from "http/server.ts";

class WebServer {
    constructor(public port: number) {
        this.port = port;
        this.handler = this.Handle.bind(this);
        console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);
        serve(this.handler,{port: this.port});
    }

    Handle(request:Request): Response {
        const body = `Your user-agent is:\n\n${request.headers.get("user-agent") ?? "Unknown"}`;
        return new Response(body, {status: 200});
    }
}

new WebServer(8080);