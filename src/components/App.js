import React, { useCallback, useState } from 'react';
import css from './App.module.css';
import { Ting } from "./Ting";
import { LeggTilTing } from "./LeggTilTing";
import { Bruker } from "./Bruker";

export const App = () => {
  const [handleliste, setHandleliste] = useState([]);

  const leggTilTing = useCallback((nyTing) => setHandleliste(liste => [nyTing, ...liste]), [setHandleliste]);

  const oppdaterTing = useCallback((tingId, callback) => {
    setHandleliste(oldState => oldState.map(oldTing =>
      oldTing.id === tingId ? callback(oldTing) : oldTing));
  }, [setHandleliste]);


  return (
    <>
      <Bruker/>
      <h1>Handleliste</h1>
      <LeggTilTing leggTilTing={leggTilTing}/>
      <ul className={css.liste}>
        {handleliste.map(ting => (
          <Ting
            key={ting.id}
            ting={ting}
            oppdaterTing={oppdaterTing}
          />
        ))}
      </ul>
    </>
  );
};
