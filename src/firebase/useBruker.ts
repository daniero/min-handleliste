import { auth } from "./setup";
import { useEffect, useState } from "react";
import { Bruker } from "../domene/bruker/Bruker";

interface BrukerHook {
  bruker?: Bruker,
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

export const useBruker: () => BrukerHook = () => {
  const [bruker, setBruker] = useState<Bruker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => auth.onAuthStateChanged(user => {
    setLoading(false);
    setBruker(user && {
      epost: user.email!
    });
  }), []);

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password)
  };

  const signIn = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password)
  };

  const signOut = () => {
    setBruker(null);
    return auth.signOut()
  };

  return {
    bruker,
    loading,
    signUp,
    signIn,
    signOut
  } as BrukerHook;
};
