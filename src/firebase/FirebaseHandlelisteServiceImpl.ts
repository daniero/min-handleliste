import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { DatabaseReference } from "firebase/database";
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
  update
} from "firebase/database";
import type { HandlelisteService } from "../domene/handleliste/HandlelisteService";
import { Dispatch } from "react";
import { TingId } from "../domene/handleliste/Ting";
import {
  HandlelisteAction,
  leggTilTing,
  oppdaterTing,
  settHandleliste,
  slettTing
} from "../domene/handleliste/handlelisteActions";

export const firebaseHandlelisteServiceImpl: (firebaseApp: FirebaseApp, auth: Auth) => HandlelisteService = (firebaseApp, auth) => {
  let tingDispatcher: Dispatch<HandlelisteAction> | null = null;

  const database = getDatabase(firebaseApp);

  let handlelisteRef: DatabaseReference | null = null;

  const unsubscribeUser = auth.onAuthStateChanged(user => {
    handlelisteRef && off(handlelisteRef);

    if (!user) {
      tingDispatcher?.(settHandleliste([]));
      handlelisteRef = null;
      return;
    }

    handlelisteRef = ref(database, `users/${user.uid}/handleliste`);

    onChildAdded(handlelisteRef, snap => {
      tingDispatcher?.(leggTilTing({
        id: snap.key,
        ...snap.val()
      }));
    });

    onChildChanged(handlelisteRef, snap => {
      tingDispatcher?.(oppdaterTing(snap.key as TingId, snap.val()));
    });

    onChildRemoved(handlelisteRef, snap => {
      return tingDispatcher?.(slettTing(snap.key as TingId));
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

      return push(handlelisteRef, nyTing);
    },

    oppdaterTing(id, oppdatertTing) {
      if (!handlelisteRef) return;

      const childRef = child(handlelisteRef, id);
      return update(childRef, oppdatertTing);
    },

    slettTing(id) {
      if (!handlelisteRef) return;

      const childRef = child(handlelisteRef, id);
      return remove(childRef)
    }
  }
}