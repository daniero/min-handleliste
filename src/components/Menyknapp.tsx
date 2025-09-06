import React, { useReducer } from 'react';
import { type Bruker } from '../domene/bruker/Bruker';
import { toggle } from '../utils/toggle';

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
        className="bg-transparent border-none text-white text-3xl font-bold"
        onClick={toggleVisMeny}
      >
        <span
          role="presentation"
          className={`block ${visMeny ? ' rotate-270 mr-3' : ''}`}
        >
          ...
        </span>
      </button>
      {visMeny && (
        <div className="basis-full p-2 mb-5 text-right bg-blue-900">
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
