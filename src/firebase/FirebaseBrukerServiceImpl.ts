import type { Dispatch } from 'react';
import type { Bruker } from '../domene/bruker/Bruker';
import type { BrukerService } from '../domene/bruker/BrukerService';
import type { Auth } from 'firebase/auth';
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

    signUp: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password).catch(
        (error: unknown) => {
          // @ts-expect-error TODO code er udefinert men det funker
          if (error.code === 'auth/wrong-password') {
            throw Error('Ukjent epost eller ukorrekt passord');
          } else {
            // @ts-expect-error TODO message er udefinert men det funker
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            throw Error(error.message);
          }
        },
      ),

    signIn: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),

    signOut: () => auth.signOut(),
  };
};
