import { useBruker } from './domene/bruker/useBruker.ts';
import { Menyknapp } from './components/Menyknapp.tsx';
import { Handleliste } from './components/handleliste/Handleliste.tsx';
import { useReducer } from 'react';
import { toggle } from './utils/toggle.ts';
import { useHandleliste } from './domene/handleliste/useHandleliste.ts';
import { LeggTilTing } from './components/handleliste/LeggTilTing.tsx';
import { Login } from './components/login/Login.tsx';

export const App = () => {
  const { bruker, signUp, signIn, signOut } = useBruker();
  const [visFerdige, toggleVisFerdige] = useReducer(toggle, false);
  const { leggTilTing } = useHandleliste();

  return (
    <div className="container">
      <header className="main-header">
        <h1>Handleliste</h1>
        {bruker && <Menyknapp bruker={bruker} signOut={() => void signOut()} />}
      </header>

      {!bruker ? (
        <Login signUp={signUp} signIn={signIn} />
      ) : (
        <>
          <article className="order-2 box-border p-2 sm:order-1">
            <LeggTilTing leggTilTing={leggTilTing} />

            <div className="order-2 flex-0">
              <label htmlFor="vis-ferdige">Vis ferdige</label>
              <input
                id="vis-ferdige"
                className="ml-2 bg-white"
                type="checkbox"
                checked={visFerdige}
                onChange={toggleVisFerdige}
              />
            </div>
          </article>

          <Handleliste visFerdige={visFerdige} />
        </>
      )}
    </div>
  );
};
