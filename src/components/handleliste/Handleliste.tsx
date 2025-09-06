import { memo, useReducer } from 'react';
import { LeggTilTing } from './LeggTilTing.tsx';
import { HandlelisteTing } from './HandlelisteTing.tsx';
import { useHandleliste } from '../../domene/handleliste/useHandleliste.ts';
import { toggle } from '../../utils/toggle.ts';

const HandlelisteComponent = ({ hidden = false }) => {
  const { handleliste, leggTilTing, oppdaterTing, slettTing } =
    useHandleliste();

  const [visFerdige, toggleVisFerdige] = useReducer(toggle, false);

  return (
    <div
      hidden={hidden}
      className={(hidden ? 'hidden ' : '') + 'flex-1 flex flex-col flex-nowrap'}
    >
      <LeggTilTing leggTilTing={leggTilTing} />

      <ul className="p-0 list-none flex-1 overflow-y-auto">
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

      <div className={'flex-0'}>
        <label htmlFor="vis-ferdige">Vis ferdige</label>
        <input
          id="vis-ferdige"
          className="ml-2 bg-white"
          type="checkbox"
          checked={visFerdige}
          onChange={toggleVisFerdige}
        />
      </div>
    </div>
  );
};

export const Handleliste = memo(HandlelisteComponent);
