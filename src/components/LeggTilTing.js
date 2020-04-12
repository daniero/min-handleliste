import React, { memo } from "react";
import { getFormData } from "../utils/forms";

const LeggTilTingComponent = ({ leggTilTing }) => {
  function submit(data) {
    if (data.tekst && data.tekst.length > 0) {
      leggTilTing({
        ferdig: false,
        ...data
      });
    }
  }

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        submit(getFormData(e));
        e.target.reset();
        e.preventDefault();
      }}
    >
      <input type="text" name="tekst"/>
      <button type="submit">+</button>
    </form>
  );
};

export const LeggTilTing = memo(LeggTilTingComponent);