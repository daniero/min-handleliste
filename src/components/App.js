import React, { useState } from 'react';
import { Header } from "./Header";
import { Handleliste } from "./Handleliste";
import { Login } from "./login/Login";
import { useBruker } from "../firebase/useBruker";

export const App = () => {
  const { bruker, loading, signUp, signIn, signOut } = useBruker();
  const [visFerdige, setVisFerdige] = useState(false);

  return (
    <>
      {loading && (
        'Vent litt ...'
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
