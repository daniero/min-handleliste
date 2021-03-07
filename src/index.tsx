import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import { App } from './components/App';
// import * as serviceWorker from './serviceWorker';
import { HandlelisteProvider } from "./domene/handleliste/HandlelisteProvider";
import { firebaseHandlelisteServiceImpl } from "./firebase/FirebaseHandlelisteServiceImpl";

render(
  <React.StrictMode>
    <HandlelisteProvider handlelisteService={firebaseHandlelisteServiceImpl()}>
      <App/>
    </HandlelisteProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
