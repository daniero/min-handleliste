import { useState } from 'react';
import { useBruker } from "../domene/bruker/useBruker";
import { Header } from "./Header";
import { Handleliste } from "./Handleliste";
import { Login } from "./login/Login";
import css from './App.module.css';

export const App = () => {
  const { bruker, laster, signUp, signIn, signOut } = useBruker();
  const [visFerdige, setVisFerdige] = useState(false);

  return (
    <>
      {(laster || !bruker) && (
        <h1 className={css.header}>Handleliste</h1>
      )}
      {!laster && !bruker && (
        <Login
          signUp={signUp}
          signIn={signIn}
        />
      )}

      <Header
        bruker={bruker}
        signOut={signOut}
        visFerdige={visFerdige}
        setVisFerdige={setVisFerdige}
      />
      <Handleliste
        hidden={!bruker}
        visFerdige={visFerdige}
      />
    </>
  );
};
