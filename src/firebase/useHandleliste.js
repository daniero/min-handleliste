import { auth, database } from './setup';
import { useEffect, useState } from "react";

let handleliste = [];

let databaseRef = null;
const handlelisteListeners = new Set();

function oppdaterHandleliste(nyHandleliste) {
  handleliste = nyHandleliste;
  handlelisteListeners.forEach(listener => listener(nyHandleliste));
}

function registerHandlelisteListener(listener) {
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

  databaseRef.on('child_added', snap => {
    oppdaterHandleliste([...handleliste, {
      id: snap.key,
      ...snap.val()
    }]);
  });

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

const leggTilTing = (nyTing) => databaseRef.push(nyTing);

const oppdaterTing = (tingId, verdi) => {
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

  databaseRef.child(tingId).update(oppdatertTing)
};

export const useHandleliste = () => {
  const [state, setState] = useState(handleliste);

  useEffect(() => registerHandlelisteListener(setState), []);

  return { handleliste: state, leggTilTing, oppdaterTing };
};
