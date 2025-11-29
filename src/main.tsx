import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { FirebaseWiring } from './firebase/FirebaseWiring.tsx';
import { App } from './App.tsx';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <FirebaseWiring>
      <App />
    </FirebaseWiring>
  </StrictMode>,
);
