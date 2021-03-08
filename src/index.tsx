import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import { App } from './components/App';
// import * as serviceWorker from './serviceWorker';
import { Wiring } from "./domene/Avhengigheter";
import { firebaseHandlelisteServiceImpl } from "./firebase/FirebaseHandlelisteServiceImpl";
import { setup } from "./firebase/setup";
import { firebaseBrukerServiceImpl } from "./firebase/FirebaseBrukerServiceImpl";

const firebaseSetup = setup();
const brukerService = firebaseBrukerServiceImpl(firebaseSetup);
const handlelisteService = firebaseHandlelisteServiceImpl(firebaseSetup);

render(
  <React.StrictMode>
    <Wiring
      brukerService={brukerService}
      handlelisteService={handlelisteService}
    >
      <App/>
    </Wiring>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
