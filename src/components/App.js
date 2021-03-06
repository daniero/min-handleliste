import React, { useState } from 'react';
import { Header } from "./Header";
import { Handleliste } from "./Handleliste";
import { Login } from "./login/Login";
import { useBruker } from "../firebase/useBruker";
import css from './App.module.css';

export const App = () => {
  const { bruker, loading, signUp, signIn, signOut } = useBruker();
  const [visFerdige, setVisFerdige] = useState(false);

  return (
    <>
      {(loading || !bruker) && (
        <h1 className={css.header}>Handleliste</h1>
      )}
      {!loading && !bruker && (
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
