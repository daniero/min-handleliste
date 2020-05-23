import React from 'react';
import { Header } from "./Header";
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
      <Header
        bruker={bruker}
        signOut={signOut}
      />
      <Handleliste/>
    </>
  );
};
