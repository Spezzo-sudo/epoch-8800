declare module 'express' {
  import { IncomingMessage, ServerResponse } from 'http';
  export interface Request extends IncomingMessage { body: any; headers: any; ip: string; }
  export interface Response extends ServerResponse {
    json(data: any): Response;
    status(code: number): Response;
    send(data?: any): Response;
    setHeader(name: string, val: string): void;
    set(field: string, val: string): Response;
    write(chunk: any): void;
  }
  export interface Router { use(path: string, ...handlers: any[]): void; post(path: string, ...handlers: any[]): void; get(path: string, ...handlers: any[]): void; }
  export interface Express extends Router { listen(port: number, cb?: () => void): void; }
  function express(): Express;
  namespace express { function Router(): Router; function json(): any; }
  export default express;
}
