import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
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
import { type Dispatch } from 'react';
import {
  type HandlelisteAction,
  leggTilTing,
  oppdaterTing,
  settHandleliste,
  slettTing,
} from '../domene/handleliste/handlelisteActions';
import type { Ting } from '../domene/handleliste/Ting.ts';

export const firebaseHandlelisteServiceImpl: (
  firebaseApp: FirebaseApp,
  auth: Auth,
) => HandlelisteService = (firebaseApp, auth) => {
  let tingDispatcher: Dispatch<HandlelisteAction> | null = null;

  const database = getDatabase(firebaseApp);

  let handlelisteRef: DatabaseReference | null = null;

  const unsubscribeUser = auth.onAuthStateChanged((user) => {
    if (handlelisteRef) off(handlelisteRef);

    if (!user) {
      tingDispatcher?.(settHandleliste([]));
      handlelisteRef = null;
      return;
    }

    handlelisteRef = ref(database, `users/${user.uid}/handleliste`);

    onChildAdded(handlelisteRef, (snap) => {
      tingDispatcher?.(
        leggTilTing({
          id: snap.key!,
          ...(snap.val() as Omit<Ting, 'id'>),
        }),
      );
    });

    onChildChanged(handlelisteRef, (snap) => {
      tingDispatcher?.(oppdaterTing(snap.key!, snap.val() as Omit<Ting, 'id'>));
    });

    onChildRemoved(handlelisteRef, (snap) => {
      return tingDispatcher?.(slettTing(snap.key!));
    });
  });

  return {
    registerHandler(dispatcher) {
      tingDispatcher = dispatcher;
    },

    unregisterHandler() {
      unsubscribeUser();
      tingDispatcher = null;
    },

    leggTilTing(nyTing) {
      if (!handlelisteRef) return;

      return void push(handlelisteRef, nyTing);
    },

    oppdaterTing(id, oppdatertTing) {
      if (!handlelisteRef) return;

      const childRef = child(handlelisteRef, id);
      return void update(childRef, oppdatertTing);
    },

    slettTing(id) {
      if (!handlelisteRef) return;

      const childRef = child(handlelisteRef, id);
      return void remove(childRef);
    },
  };
};
