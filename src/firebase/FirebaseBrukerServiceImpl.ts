import { Dispatch } from "react";
import { Bruker } from "../domene/bruker/Bruker";
import { BrukerService } from "../domene/bruker/BrukerService";
import type { FirebaseApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"

export const firebaseBrukerServiceImpl: (firebaseApp: FirebaseApp) => BrukerService = (firebaseApp) => {
  let brukerDispatcher: Dispatch<Bruker | null> | null = null;

  const auth = getAuth(firebaseApp)
  const unsubscribe = auth.onAuthStateChanged(user =>
    brukerDispatcher?.(user && {
      epost: user.email!
    })
  );

  return {
    registerHandler: dispatcher => brukerDispatcher = dispatcher,
    unregisterHandler: _ => {
      unsubscribe();
      brukerDispatcher = null;
    },

    signUp: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password)
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            throw Error('Ukjent epost eller ukorrekt passord');
          } else {
            throw Error(error.message);
          }
        }),

    signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),

    signOut: () => auth.signOut()
  }
}

