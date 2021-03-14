import css from "./App.module.css";
import { LeggTilTing } from "./LeggTilTing";
import { HandlelisteTing } from "./HandlelisteTing";
import { useHandleliste } from "../domene/handleliste/useHandleliste";

export const Handleliste = ({
                              hidden = false,
                              visFerdige = false,
                            }) => {

  const { handleliste, leggTilTing, oppdaterTing, slettTing } = useHandleliste();

  return (
    <main hidden={hidden}>
      <LeggTilTing leggTilTing={leggTilTing}/>

      <ul className={css.liste}>
        {handleliste
          .map(ting => (
            <HandlelisteTing
              key={ting.id}
              ting={ting}
              oppdaterTing={oppdaterTing}
              slettTing={slettTing}
              visFerdig={visFerdige}
            />
          ))}
      </ul>
    </main>
  );
};