/// <reference types="react-scripts" />

declare module '*.json' {
  const value: any;
  export default value;
}

declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    div: any;
  }
}
