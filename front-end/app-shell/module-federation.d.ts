declare module 'shellAdmin/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'order/App' {
  const App: React.ComponentType;
  export default App;
}

declare global {
  interface Window {
    shellAdmin: any;
    order: any;
  }

  const __webpack_share_scopes__: {
    default: any;
  };
}

export {};
