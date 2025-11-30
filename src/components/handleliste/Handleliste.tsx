import { memo } from 'react';
import { HandlelisteTing } from './HandlelisteTing.tsx';
import { useHandleliste } from '../../domene/handleliste/useHandleliste.ts';

interface Props {
  visFerdige?: boolean;
}

function HandlelisteComponent({ visFerdige = false }: Props) {
  const { handleliste, oppdaterTing, slettTing } = useHandleliste();

  return (
    <div className="relative order-1 flex-1 overflow-auto">
      <ul className="order-0 m-0 flex-1 list-none overflow-y-auto p-0 sm:order-3 sm:mb-0">
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
}

export const Handleliste = memo(HandlelisteComponent);
