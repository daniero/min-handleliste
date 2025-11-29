import { firebaseApp } from './Config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import type { BrukerService } from '../domene/bruker/BrukerService';
import type { Bruker } from '../domene/bruker/Bruker.ts';
import { createStore } from '../utils/store.ts';

const auth = getAuth(firebaseApp);
const { store, update } = createStore<Bruker | null>(null);

export const ready = auth.authStateReady();

auth.onAuthStateChanged((user) => {
  update(
    () =>
      user && {
        epost: user.email!,
      },
  );
});

export const firebaseBrukerServiceImpl: BrukerService = {
  ...store,

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
