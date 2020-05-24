import React, { memo, useState } from "react";
import css from './Header.module.css';

const HeaderComponent = ({
                           bruker,
                           signOut,
                           visFerdige,
                           setVisFerdige
                         }) => {

  const [visMeny, setVisMeny] = useState(false);

  return (
    <header hidden={!bruker} className={css.container}>
      <div className={css.topp}>
        <h1>Handleliste</h1>
        <label>
          Vis ferdige
          <input
            type="checkbox"
            value={visFerdige}
            onClick={() => setVisFerdige(vis => !vis)}
          />
        </label>
        <button
          aria-expanded={visMeny}
          className={css.menyknapp}
          onClick={() => setVisMeny(vis => !vis)}
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