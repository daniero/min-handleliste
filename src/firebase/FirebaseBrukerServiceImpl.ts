import { Dispatch } from "react";
import { Bruker } from "../domene/bruker/Bruker";
import { Auth, Setup, Unsubscribe } from "./types";
import { BrukerService } from "../domene/bruker/BrukerService";

export const firebaseBrukerServiceImpl: (setupPromise: Promise<Setup>) => BrukerService = (setupPromise) => {
  let auth: Auth;
  let unsubscribe: Unsubscribe
  let brukerDispatcher: Dispatch<Bruker | null> | null = null;

  setupPromise.then((setup) => {
    auth = setup.auth;
    unsubscribe = auth.onAuthStateChanged(user =>
      brukerDispatcher?.(user && {
        epost: user.email!
      })
    );
  });

  return {
    registerHandler: dispatcher => brukerDispatcher = dispatcher,
    unregisterHandler: _ => {
      unsubscribe();
      brukerDispatcher = null;
    },

    signUp: (email, password) => auth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          throw Error('Ukjent epost eller ukorrekt passord');
        } else {
          throw Error(error.message);
        }
      }),

    signIn: (email, password) => auth.signInWithEmailAndPassword(email, password),

    signOut: () => auth.signOut()
  }
}

