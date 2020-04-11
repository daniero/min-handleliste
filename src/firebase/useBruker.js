import { auth } from "./setup";
import { useEffect, useState } from "react";

export const useBruker = () => {
  const [bruker, setBruker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => auth.onAuthStateChanged(user => {
    setLoading(false);
    setBruker(user);
  }), []);

  const signUp = (email, password) => {
    setLoading(true);
    auth.createUserWithEmailAndPassword(email, password)
  };

  const signIn = (email, password) => {
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password)
  };

  const signOut = () => {
    setLoading(true);
    auth.signOut()
  };

  return {
    bruker,
    loading,
    signUp,
    signIn,
    signOut
  };
};
