import React, { memo } from 'react';
import classnames from "classnames";
import css from "./Ting.module.css";
import { useOnChange } from "../utils/useOnChange";
import { useTidsbryter } from "../utils/useTidsbryter";

const TingComponent = ({
                         ting,
                         oppdaterTing,
                         slettTing,
                         visFerdig
                       }) => {

  const [visAllikevel, setVisAllikevel] = useTidsbryter();
  useOnChange(ting.ferdig, (_, next) => {
    if (next) {
      setVisAllikevel()
    }
  });

  if (ting.ferdig && !visFerdig && !visAllikevel) {
    return null;
  }

  const toggleTing = () => oppdaterTing(ting.id, oldTing => ({
    ...oldTing,
    ferdig: !oldTing.ferdig
  }));

  const slett = () => slettTing(ting.id);

  return (
    <li className={classnames(css.ting, ting.ferdig && css.ferdig)}>
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

export const Ting = memo(TingComponent);
