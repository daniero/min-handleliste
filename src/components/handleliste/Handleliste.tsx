import { memo } from 'react';
import { HandlelisteTing } from './HandlelisteTing.tsx';
import { useHandleliste } from '../../domene/handleliste/useHandleliste.ts';

interface Props {
  visFerdige?: boolean;
}

function HandlelisteComponent({ visFerdige = false }: Props) {
  const { handleliste, oppdaterTing, slettTing } = useHandleliste();

  return (
    <div className="flex-1 overflow-auto relative order-1">
      <ul className="p-0 m-0 list-none flex-1 overflow-y-auto order-0 sm:order-3 sm:mb-0">
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
