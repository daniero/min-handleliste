import { memo } from 'react';
import css from './LeggTilTing.module.css';
import { type FormObject, getFormData } from '../utils/forms';
import { type HandlelisteMetoder } from '../domene/handleliste/handlelisteMetoder';

interface LeggTilTingProps {
  leggTilTing: HandlelisteMetoder['leggTilTing'];
}

const LeggTilTingComponent = ({ leggTilTing }: LeggTilTingProps) => {
  function submit(data: FormObject) {
    const trimmed = (data.tekst as string | undefined)?.trim() ?? '';

    if (trimmed.length > 0) {
      leggTilTing({
        ...data,
        tekst: trimmed,
        ferdig: false,
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
      <input name="tekst" className={`${css.size} ${css.input}`} />
      <button type="submit" className={`${css.size} ${css.button}`}>
        +
      </button>
    </form>
  );
};

export const LeggTilTing = memo(LeggTilTingComponent);
