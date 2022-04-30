import React, { memo } from "react";
import classnames from "classnames";
import css from './LeggTilTing.module.css';
import { getFormData } from "../utils/forms";
import { HandlelisteMetoder } from "../domene/handleliste/handlelisteMetoder";

interface LeggTilTingProps {
  leggTilTing: HandlelisteMetoder["leggTilTing"]
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
      className="flex"
      autoComplete="off"
      onSubmit={(e) => {
        submit(getFormData(e));
        e.currentTarget.reset();
        e.preventDefault();
      }}
    >
      <input
        name="tekst"
        className={`${css.size} ${css.input}`}
      />
      <button
        type="submit"
        className={`${css.size} ${css.button}`}
      >
        +
      </button>
    </form>
  );
};

export const LeggTilTing = memo(LeggTilTingComponent);