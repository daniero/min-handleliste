import React, { memo, useReducer } from "react";
import css from './Header.module.css';
import { User } from "../firebase/User";
import { toggle } from "../utils/toggle";

interface Headerprops {
  bruker?: User,
  signOut: () => void,
  visFerdige: boolean,
  setVisFerdige: (vis: (ja: boolean) => boolean) => void
}

const HeaderComponent = ({
                           bruker,
                           signOut,
                           visFerdige,
                           setVisFerdige
                         }: Headerprops) => {

  const [visMeny, toggleVisMeny] = useReducer(toggle, false);

  return (
    <header hidden={!bruker} className={css.container}>
      <div className={css.topp}>
        <h1>Handleliste</h1>
        <label>
          Vis ferdige
          <input
            type="checkbox"
            checked={visFerdige}
            onChange={() => setVisFerdige(vis => !vis)}
          />
        </label>
        <button
          aria-expanded={visMeny}
          className={css.menyknapp}
          onClick={toggleVisMeny}
        >
          ···
        </button>
      </div>
      <div hidden={!visMeny} className={css.meny}>
        {`Logget inn som ${bruker?.email}`}
        {' '}
        <button
          onClick={signOut}
        >
          Logg ut
        </button>
      </div>
    </header>
  );
};

export const Header = memo(HeaderComponent);