import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './components/App';
// import * as serviceWorker from './serviceWorker';
import { Wiring } from "./domene/Avhengigheter";
import { setup } from "./firebase/setup";

const { brukerService, handlelisteService } = setup();

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Wiring
      brukerService={brukerService}
      handlelisteService={handlelisteService}
    >
      <App />
    </Wiring>
  </StrictMode>
);
