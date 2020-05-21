import {auth, database} from './setup';
import {useEffect, useState} from "react";
import firebase from "firebase";

let handleliste: Array<any> = [];

let databaseRef: firebase.database.Reference | null = null;
const handlelisteListeners = new Set<Function>();

function oppdaterHandleliste(nyHandleliste: Array<any>) {
  handleliste = nyHandleliste;
  handlelisteListeners.forEach(listener => listener(nyHandleliste));
}

function registerHandlelisteListener(listener: Function) {
  handlelisteListeners.add(listener);
  return () => {
    handlelisteListeners.delete(listener);
  }
}

auth.onAuthStateChanged(user => {
  if (databaseRef !== null) {
    databaseRef.off();
  }

  if (!user) {
    oppdaterHandleliste([]);
    databaseRef = null;
    return;
  }

  databaseRef = database.ref(`users/${user.uid}/handleliste`);

  databaseRef.on('child_added',
    snap => {
      oppdaterHandleliste([...handleliste, {
        id: snap.key,
        ...snap.val()
      }]);
    },
    (error: Error) => {
      console.warn(error);
    }
  );

  databaseRef.on('child_changed', snap => {
    const tingId = snap.key;
    oppdaterHandleliste(handleliste.map(ting => {
      if (ting.id === tingId) {
        return {
          ...snap.val(),
          id: tingId
        };
      }
      return ting;
    }));
  });

  databaseRef.on('child_removed', snap => {
    oppdaterHandleliste(handleliste.filter(ting => ting.id !== snap.key));
  });

});

const leggTilTing = (nyTing: any) => databaseRef?.push(nyTing);

const oppdaterTing = (tingId: string, verdi: any) => {
  let oppdatertTing;
  if (typeof verdi === 'function') {
    const ting = handleliste.find(ting => ting.id === tingId);
    if (!ting) {
      console.warn(`Fant ikke ting med id "${tingId}"`);
      return;
    }
    oppdatertTing = verdi(ting);
  } else {
    oppdatertTing = verdi;
  }

  databaseRef?.child(tingId).update(oppdatertTing)
};

const slettTing = (tingId: string) => {
  databaseRef?.child(tingId).remove();
};

export const useHandleliste = () => {
  const [state, setState] = useState(handleliste);

  useEffect(() => registerHandlelisteListener(setState), []);

  return { handleliste: state, leggTilTing, oppdaterTing, slettTing };
};
