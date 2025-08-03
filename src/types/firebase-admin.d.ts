declare module 'firebase-admin' {
  namespace admin {
    const apps: any[];
    function initializeApp(options: any): void;
    namespace credential {
      function cert(data: any): any;
    }
    function firestore(): any;
  }
  export = admin;
  export type ServiceAccount = any;
}
