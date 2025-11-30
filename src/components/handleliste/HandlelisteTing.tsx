import { memo, useEffect, useRef, useState } from 'react';
import css from './Ting.module.css';
import type { Ting } from '../../domene/handleliste/Ting.ts';

import type { HandlelisteMetoder } from '../../domene/handleliste/HandlelisteService.ts';

interface TingProps {
  ting: Ting;
  oppdaterTing: HandlelisteMetoder['oppdaterTing'];
  slettTing: HandlelisteMetoder['slettTing'];
  visFerdig: boolean;
}

// Hvor lenge skal tingen vises etter at status endres til ferdig?
const hengetid = 1500;

const TingComponent = ({
  ting,
  oppdaterTing,
  slettTing,
  visFerdig,
}: TingProps) => {
  const [vis, setVis] = useState(() => {
    return (
      !ting.ferdig ||
      (ting.ferdigDato != null && Date.now() - ting.ferdigDato <= hengetid)
    );
  });

  const timeout = useRef<unknown>(null);

  useEffect(() => {
    if (!ting.ferdig) {
      setVis(true);
      clearTimeout(timeout.current as number);
    } else if (ting.ferdigDato != null) {
      const ferdigTid = Date.now() - ting.ferdigDato;

      if (ferdigTid <= hengetid) {
        const visningstid = hengetid - ferdigTid;

        setVis(true);
        timeout.current = setTimeout(() => {
          setVis(false);
        }, visningstid)!;
      }
    }
  }, [ting.ferdig, ting.ferdigDato]);

  if (!vis && !visFerdig) {
    return null;
  }

  const toggleTing = () => {
    oppdaterTing(ting.id, {
      ferdig: !ting.ferdig,
      ferdigDato: Date.now(),
    });
  };

  const slett = () => {
    slettTing(ting.id);
  };

  return (
    <li className={ting.ferdig ? `${css.ting} ${css.ferdig}` : css.ting}>
      <label>
        <input
          type="checkbox"
          className={css.checkbox}
          checked={ting.ferdig}
          onChange={toggleTing}
        />
        {ting.tekst}
      </label>
      <button type="button" className={css.slett} onClick={slett}>
        x
      </button>
    </li>
  );
};

export const HandlelisteTing = memo(TingComponent);
