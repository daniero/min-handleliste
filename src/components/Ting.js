import React, {memo} from 'react';
import classnames from "classnames";
import css from "./Ting.module.css";

const TingComponent = ({
                         ting,
                         oppdaterTing,
                         slettTing
                       }) => {

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
