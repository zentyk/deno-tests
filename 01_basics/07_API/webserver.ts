import { serve } from 'http/server.ts';

interface PostIt {
    title: string,
    id: string,
    body: string,
    createdAt: Date
}

interface ResponseTemplate {
    body : any;
    status : number;
}

class PostItManager {
    constructor() {
        let postIts : Record<PostIt["id"], PostIt> = {
            '3209ebc7-b3b4-4555-88b1-b64b33d507ab' : {
                title: 'Read more',
                body: 'PacktPub books',
                id: '3209ebc7-b3b4-4555-88b1-b64b33d507ab',
                createdAt: new Date() },
            'a1afee4a-b078-4eff-8ca6-06b3722eee2c': {
                title: 'Finish book',
                body: 'Deno Web Development',
                id: '3209ebc7-b3b4-4555-88b1-b64b33d507ab',
                createdAt: new Date()
            }
        }
        this.postIts = postIts;
    }

    FindAll() : PostIt[] {
        const allPostIts = Object.keys(this.postIts)
            .reduce((allPostIts: PostIt[], postItId) => {
                return allPostIts.concat(this.postIts[postItId]);
            }, []);
        return allPostIts;
    }

    FindById(id: string) : PostIt | undefined {}

    Create(postIt: PostIt) : PostIt {}

    Update(id: string, postIt: PostIt) : PostIt {}

    Delete(id: string) : PostIt {}
}

class Server {
    constructor(public port: number) {
        this.port = port;
        this.host = "localhost";
        this.protocol = "http";
        this.postItManager = new PostItManager();

        console.log(`HTTP webserver running.  Access it at: ${this.protocol}://${this.host}:${this.port}/`);

        this.serve = serve({port: this.port});
    }

    CreateResponse(status,body) : ResponseTemplate {
        return {
            body: body,
            status: status
        }
    }

    Respond(request : Request) : Response {
        const url = new URL(`${this.protocol}://${this.host}${request.url}`);
        const pathWithMethod = `${request.method} ${url.pathname}`;

        switch (pathWithMethod) {
            case "GET /api/post-its":
                let values = this.postItManager.FindAll();
                if(values) {
                    request.respond(this.CreateResponse(200,JSON.stringify(values)));
                } else {
                    request.respond(this.CreateResponse(404,'not-found'));
                }
            break;
            default:
                request.respond(this.CreateResponse(404,'not-found'));
            break;
        }
    }
}

let server = new Server(8080);

for await (const req of server.serve) {
    server.Respond(req);
}