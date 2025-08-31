import { useBruker } from './domene/bruker/useBruker.ts';
import { Menyknapp } from './components/Menyknapp.tsx';
import { Handleliste } from './components/handleliste/Handleliste.tsx';
import { useReducer } from 'react';
import { toggle } from './utils/toggle.ts';
import { useHandleliste } from './domene/handleliste/useHandleliste.ts';
import { LeggTilTing } from './components/handleliste/LeggTilTing.tsx';
import { Login } from './components/login/Login.tsx';

export const App = () => {
  const { bruker, laster, signUp, signIn, signOut } = useBruker();
  const [visFerdige, toggleVisFerdige] = useReducer(toggle, false);
  const { leggTilTing } = useHandleliste();

  return (
    <div className="fixed inset-0 flex flex-col sm:py-5 sm:px-8">
      <header className="flex-0 flex px-2 flex-wrap items-center">
        <h1 className="text-3xl sm:my-3 my-1 font-bold flex-1">Handleliste</h1>
        {bruker && <Menyknapp bruker={bruker} signOut={() => void signOut()} />}
      </header>

      {!bruker ? (
        !laster && <Login signUp={signUp} signIn={signIn} />
      ) : (
        <>
          <article className="order-2 sm:order-1 box-border p-2">
            <LeggTilTing leggTilTing={leggTilTing} />

            <div className="flex-0 order-2">
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
