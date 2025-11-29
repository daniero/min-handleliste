import { getAuth } from 'firebase/auth';
import type { DatabaseReference } from 'firebase/database';
import {
  child,
  getDatabase,
  off,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  push,
  ref,
  remove,
  update,
} from 'firebase/database';
import type { HandlelisteService } from '../domene/handleliste/HandlelisteService';
import {
  leggTilTing,
  oppdaterTing,
  slettTing,
} from '../domene/handleliste/handlelisteActions';
import type { Ting } from '../domene/handleliste/Ting.ts';
import { firebaseApp } from './Config.ts';
import { createStore } from '../utils/store.ts';
import { handlelisteReducer } from '../domene/handleliste/handlelisteReducer.ts';

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const { store, update: updateStore } = createStore<Ting[]>([]);

let handlelisteRef: DatabaseReference | null = null;

auth.onAuthStateChanged((user) => {
  if (handlelisteRef) off(handlelisteRef);

  if (!user) {
    updateStore(() => []);
    handlelisteRef = null;
    return;
  }

  handlelisteRef = ref(database, `users/${user.uid}/handleliste`);

  onChildAdded(handlelisteRef, (snap) => {
    updateStore((oldState) =>
      handlelisteReducer(
        oldState,
        leggTilTing({
          id: snap.key!,
          ...(snap.val() as Omit<Ting, 'id'>),
        }),
      ),
    );
  });

  onChildChanged(handlelisteRef, (snap) => {
    updateStore((oldState) =>
      handlelisteReducer(
        oldState,
        oppdaterTing(snap.key!, snap.val() as Omit<Ting, 'id'>),
      ),
    );
  });

  onChildRemoved(handlelisteRef, (snap) => {
    updateStore((oldState) =>
      handlelisteReducer(oldState, slettTing(snap.key!)),
    );
  });
});

export const firebaseHandlelisteServiceImpl: HandlelisteService = {
  ...store,

  leggTilTing(nyTing) {
    if (!handlelisteRef) return;

    void push(handlelisteRef, nyTing);
  },

  oppdaterTing(id, oppdatertTing) {
    if (!handlelisteRef) return;

    const childRef = child(handlelisteRef, id);
    void update(childRef, oppdatertTing);
  },

  slettTing(id) {
    if (!handlelisteRef) return;

    const childRef = child(handlelisteRef, id);
    void remove(childRef);
  },
};
