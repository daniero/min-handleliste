import { DatabaseRef, Setup, Unsubscribe } from "./types";
import { HandlelisteService } from "../domene/handleliste/HandlelisteService";
import { Dispatch } from "react";
import { TingId } from "../domene/handleliste/Ting";
import {
  HandlelisteAction,
  leggTilTing,
  oppdaterTing,
  settHandleliste,
  slettTing
} from "../domene/handleliste/handlelisteActions";

export const firebaseHandlelisteServiceImpl: (setup: Setup) => HandlelisteService = ({ auth, database }) => {
  let unsubscribe: Unsubscribe;
  let databaseRef: DatabaseRef | null = null;
  let tingDispatcher: Dispatch<HandlelisteAction> | null = null;

  unsubscribe = auth.onAuthStateChanged(user => {
    databaseRef?.off();

    if (!user) {
      tingDispatcher?.(settHandleliste([]));
      databaseRef = null;
      return;
    }

    databaseRef = database.ref(`users/${user.uid}/handleliste`);

    databaseRef.on('child_added',
      snap => tingDispatcher?.(leggTilTing({
        id: snap.key,
        ...snap.val()
      })),
      (error: Error) => {
        console.warn(error);
      }
    );

    databaseRef.on('child_changed',
      snap => tingDispatcher?.(oppdaterTing(snap.key as TingId, snap.val()))
    );

    databaseRef.on('child_removed',
      snap => tingDispatcher?.(slettTing(snap.key as TingId))
    );
  });

  return {
    registerHandler: dispatcher => tingDispatcher = dispatcher,
    unregisterHandler: () => {
      unsubscribe();
      tingDispatcher = null;
    },

    leggTilTing: nyTing => databaseRef?.push(nyTing),
    oppdaterTing: (id, oppdatertTing) => databaseRef?.child(id).update(oppdatertTing),
    slettTing: id => databaseRef?.child(id).remove()
  }
}