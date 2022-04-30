import { memo } from 'react';
import css from "./Ting.module.css";
import { useOnChange } from "../utils/useOnChange";
import { useTidsbryter } from "../utils/useTidsbryter";
import type { Ting } from "../domene/handleliste/Ting";
import type { HandlelisteMetoder } from "../domene/handleliste/handlelisteMetoder";

interface TingProps {
  ting: Ting
  oppdaterTing: HandlelisteMetoder["oppdaterTing"]
  slettTing: HandlelisteMetoder["slettTing"]
  visFerdig: boolean
}

const TingComponent = ({
                         ting,
                         oppdaterTing,
                         slettTing,
                         visFerdig
                       }: TingProps) => {

  // La tingen bli hengende igjen i et sekund før den forsvinner etter at den er krysset av
  const [visAllikevel, setVisAllikevel] = useTidsbryter();
  useOnChange(ting.ferdig, (_, next) => {
    if (next) {
      setVisAllikevel()
    }
  });

  if (ting.ferdig && !visFerdig && !visAllikevel) {
    return null;
  }

  const toggleTing = () => oppdaterTing(ting.id, {
    ferdig: !ting.ferdig
  });

  const slett = () => slettTing(ting.id);

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
      <button
        className={css.slett}
        onClick={slett}
      >
        x
      </button>
    </li>
  );
};

export const HandlelisteTing = memo(TingComponent);
