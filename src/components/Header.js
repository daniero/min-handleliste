import React, { memo } from "react";
import css from './Header.module.css';

const HeaderComponent = ({ bruker, signOut }) => {

  return (
    <div className={css.container}>
      <h1>Handleliste</h1>
      <button className={css.menyknapp}>···</button>
      <div className={css.meny}>
        {`Logget inn som ${bruker?.email}`}
        {' '}
        <button
          tabIndex={-1}
          onClick={signOut}
        >
          Logg ut
        </button>
      </div>
    </div>
  );
};

export const Header = memo(HeaderComponent);