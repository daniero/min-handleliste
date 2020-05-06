import React from "react";
import css from "./App.module.css";
import { LeggTilTing } from "./LeggTilTing";
import { Ting } from "./Ting";
import { useHandleliste } from "../firebase/useHandleliste";

export const Handleliste = () => {
  const { handleliste, leggTilTing, oppdaterTing, slettTing } = useHandleliste();

  return (
    <>
      <h1>Handleliste</h1>
      <LeggTilTing leggTilTing={leggTilTing}/>

      <ul className={css.liste}>
        {handleliste.map(ting => (
          <Ting
            key={ting.id}
            ting={ting}
            oppdaterTing={oppdaterTing}
            slettTing={slettTing}
          />
        ))}
      </ul>
    </>
  );
};