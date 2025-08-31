import type { Dispatch } from 'react';
import type { Bruker } from '../domene/bruker/Bruker';
import type { BrukerService } from '../domene/bruker/BrukerService';
import type { Auth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const firebaseBrukerServiceImpl: (auth: Auth) => BrukerService = (
  auth,
) => {
  let brukerDispatcher: Dispatch<Bruker | null> | null = null;

  const unsubscribe = auth.onAuthStateChanged((user) =>
    brukerDispatcher?.(
      user && {
        epost: user.email!,
      },
    ),
  );

  return {
    registerHandler: (dispatcher) => (brukerDispatcher = dispatcher),
    unregisterHandler: () => {
      unsubscribe();
      brukerDispatcher = null;
    },

    signUp: async (email, password) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/wrong-password':
              throw Error('Ukjent epost eller ukorrekt passord');
            case 'auth/email-already-in-use':
              throw Error('Epost-adressen er allerede i bruk');
          }
        }

        console.error(error);
        throw Error('Det oppstod en ukjent feil');
      }
    },

    signIn: async (email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error: unknown) {
        if (
          error instanceof FirebaseError &&
          error.code === 'auth/wrong-password'
        ) {
          throw Error('Ukjent epost eller ukorrekt passord');
        }

        console.error(error);
        throw Error('Det oppstod en ukjent feil');
      }
    },

    signOut: () => auth.signOut(),
  };
};
