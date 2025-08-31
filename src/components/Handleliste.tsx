import { memo } from 'react';
import { LeggTilTing } from './LeggTilTing';
import { HandlelisteTing } from './HandlelisteTing';
import { useHandleliste } from '../domene/handleliste/useHandleliste';

const HandlelisteComponent = ({ hidden = false, visFerdige = false }) => {
  const { handleliste, leggTilTing, oppdaterTing, slettTing } =
    useHandleliste();

  return (
    <div hidden={hidden}>
      <LeggTilTing leggTilTing={leggTilTing} />

      <ul className="p-0 list-none">
        {handleliste.map((ting) => (
          <HandlelisteTing
            key={ting.id}
            ting={ting}
            oppdaterTing={oppdaterTing}
            slettTing={slettTing}
            visFerdig={visFerdige}
          />
        ))}
      </ul>
    </div>
  );
};

export const Handleliste = memo(HandlelisteComponent);
