import React, { useState } from "react";
import css from "./Login.module.css";

export const PassordInput = ({
                               id
                             }) => {

  const [visPassord, setVisPassord] = useState(false);

  return (
    <div className={css.passord}>
      <input
        id={id}
        name={id}
        type={visPassord ? 'text' : 'password'}
        autoComplete="off"
        required
      />
      <button
        type="button"
        aria-controls={id}
        aria-expanded={visPassord}
        onClick={() => setVisPassord(vis => !vis)}
        className={visPassord ? css.skjulPassard : undefined}
      >
        {visPassord ? 'Skjul' : 'Vis'}
      </button>
    </div>
  );
};