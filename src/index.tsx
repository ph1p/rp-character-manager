import ReactDOM from 'react-dom';
import React from 'react';
import { create } from 'mobx-persist';

import { rootStore } from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';
import App from './App';

import './globals.css';
import './i18n';

const hydrate = create();

Promise.all([hydrate('__rpcm__', rootStore)]).then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
