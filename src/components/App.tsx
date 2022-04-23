import { useReducer } from 'react';
import { useBruker } from "../domene/bruker/useBruker";
import { Menyknapp } from "./Menyknapp";
import { Handleliste } from "./Handleliste";
import { Login } from "./login/Login";
import { toggle } from "../utils/toggle";

export const App = () => {
  const { bruker, laster, signUp, signIn, signOut } = useBruker();
  const [visFerdige, toggleVisFerdige] = useReducer(toggle, false);

  return (
    <>
      <header className="my-3 flex flex-wrap justify-between items-center">
        <h1 className="text-3xl my-0 font-bold flex-1">Handleliste</h1>
        {bruker && (
          <>
            <div className="flex-1">
              <label htmlFor="vis-ferdige">Vis ferdige</label>
              <input
                id="vis-ferdige"
                className="ml-2"
                type="checkbox"
                checked={visFerdige}
                onChange={toggleVisFerdige}
              />
            </div>
            <Menyknapp
              bruker={bruker}
              signOut={signOut}
            />
          </>
        )}
      </header>

      <main>
        {!laster && !bruker && (
          <Login
            signUp={signUp}
            signIn={signIn}
          />
        )}
        <Handleliste
          hidden={!bruker}
          visFerdige={visFerdige}
        />
      </main>
    </>
  );
};
