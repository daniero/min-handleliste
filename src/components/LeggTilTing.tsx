import React, { memo } from "react";
import classnames from "classnames";
import css from './LeggTilTing.module.css';
import { getFormData } from "../utils/forms";
import { Ting } from "../domene/Ting";

interface LeggTilTingProps {
  leggTilTing: (nyTing: Partial<Ting>) => void
}

const LeggTilTingComponent = ({ leggTilTing }: LeggTilTingProps) => {

  function submit(data: Record<string, string | File>) {
    const trimmed = (data.tekst as string)?.trim();

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
        e.currentTarget.reset();
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