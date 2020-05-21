import React from 'react';
import { Bruker } from "./Bruker";
import { Handleliste } from "./Handleliste";
import { Login } from "./login/Login";
import { useBruker } from "../firebase/useBruker";

export const App = () => {
  const { bruker, loading, signUp, signIn, signOut } = useBruker();

  if (loading) {
    return 'Vent litt ...';
  }

  if (!bruker) {
    return (
      <Login
        signUp={signUp}
        signIn={signIn}
      />
    );
  }

  return (
    <>
      <Bruker
        bruker={bruker}
        signOut={signOut}
      />
      <Handleliste/>
    </>
  );
};
