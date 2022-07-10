class Server {
    server : any = undefined;

    constructor(public port: number) {
      this.port = port;
      this.server = Deno.listen({ port: this.port });

      console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);
    }

    async ServeHTTP(conn: Deno.Conn) {
      const httpConn = Deno.serveHttp(conn);

      for await (const requestEvent of httpConn) {
        const body = `Your user-agent is:\n\n${
          requestEvent.request.headers.get("user-agent") ?? "Unknown"
        }`;

        requestEvent.respondWith(
            new Response(body, {
              status: 200,
            }),
        );
      }
    }
}

let server = new Server(8080);

(async ()=>{
    for await (const conn of server.server) {
        server.ServeHTTP(conn);
    }
})()