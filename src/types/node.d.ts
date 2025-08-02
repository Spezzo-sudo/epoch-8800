declare var require: any;
declare var module: any;
declare var process: { env: any };

declare module 'http' {
  import { IncomingMessage, ServerResponse } from 'node:http';
  export function createServer(handler: (req: IncomingMessage, res: ServerResponse) => void): any;
  export interface IncomingMessage { headers: any; url?: string; method?: string; socket: { remoteAddress?: string }; on(event: string, cb: (chunk: any) => void): void; }
  export interface ServerResponse { statusCode: number; setHeader(name: string, value: string): void; end(data?: any): void; }
}

declare module 'crypto' {
  export function randomUUID(): string;
}

declare module 'url' {
  export class URL {
    constructor(url: string, base?: string);
    pathname: string;
    searchParams: any;
  }
}

declare module 'fs' {
  export function readFileSync(path: string, encoding?: string): string;
}
declare function fetch(url: string, options?: any): Promise<any>;
