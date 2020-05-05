import React, {memo} from "react";
import classnames from "classnames";
import css from './LeggTilTing.module.css';
import {getFormData} from "../utils/forms";

const LeggTilTingComponent = ({leggTilTing}) => {
  function submit(data) {
    const trimmed = data.tekst.trim();
    if (trimmed.length > 0) {
      leggTilTing({
        ...data,
        tekst: trimmed,
        ferdig: false
      });
    }
  }

  return (
    <form
      className={css.container}
      autoComplete="off"
      onSubmit={(e) => {
        submit(getFormData(e));
        e.target.reset();
        e.preventDefault();
      }}
    >
      <input
        type="text"
        name="tekst"
        className={classnames(css.size, css.input)}
      />
      <button
        type="submit"
        className={classnames(css.size, css.button)}
      >
        +
      </button>
    </form>
  );
};

export const LeggTilTing = memo(LeggTilTingComponent);