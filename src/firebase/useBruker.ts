import { auth } from "./setup";
import { useEffect, useState } from "react";
import { User } from "./User";

interface BrukerHook {
  bruker?: User,
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

export const useBruker: () => BrukerHook = () => {
  const [bruker, setBruker] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => auth.onAuthStateChanged(user => {
    setLoading(false);
    setBruker(user);
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
