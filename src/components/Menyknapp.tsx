import React, { useReducer } from 'react';
import { type Bruker } from '../domene/bruker/Bruker';
import { toggle } from '../utils/toggle';
import { clsx } from 'clsx/lite';
import { MenyIkon } from './ikoner/MenyIkon.tsx';

interface Headerprops {
  bruker: Bruker | null;
  signOut: () => void;
  className?: string;
}

const MenyknappComponent = ({ bruker, signOut }: Headerprops) => {
  const [visMeny, toggleVisMeny] = useReducer(toggle, false);

  return (
    <>
      <button
        type="button"
        aria-label="Vis meny"
        aria-expanded={visMeny}
        aria-haspopup="menu"
        className="flex items-center border-none bg-transparent text-3xl font-bold text-white"
        onClick={toggleVisMeny}
      >
        <MenyIkon className={clsx(visMeny && 'rotate-90 text-blue-500')} />
      </button>
      {visMeny && (
        <div className="mb-2 basis-full bg-blue-900 p-2 text-right">
          {bruker && `Logget inn som ${bruker.epost} `}
          <button type="button" onClick={signOut}>
            Logg ut
          </button>
        </div>
      )}
    </>
  );
};

export const Menyknapp = React.memo(MenyknappComponent);
