import React, { memo } from 'react';
import classnames from "classnames";
import css from "./Ting.module.css";

const TingComponent = ({
                         ting,
                         oppdaterTing
                       }) => {

  const toggleTing = () => oppdaterTing(ting.id, oldTing => ({
    ...oldTing,
    ferdig: !oldTing.ferdig
  }));

  return (
    <li className={classnames(css.ting, ting.ferdig && css.ferdig)}>
      <label>
        <input
          type="checkbox"
          checked={ting.ferdig}
          onChange={toggleTing}
        />
        {ting.tekst}
      </label>
    </li>
  );
};

export const Ting = memo(TingComponent);
