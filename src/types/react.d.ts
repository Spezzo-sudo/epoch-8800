declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const createElement: any;
  export const Fragment: any;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
