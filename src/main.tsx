import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { Wiring } from './domene/Wiring.tsx';
import { setup } from './firebase/setup';

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
  </StrictMode>,
);
