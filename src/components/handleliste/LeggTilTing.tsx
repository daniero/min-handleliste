import { memo } from 'react';
import { type FormObject, getFormData } from '../../utils/forms.ts';
import type { HandlelisteMetoder } from '../../domene/handleliste/HandlelisteService.ts';

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
      className="flex gap-2"
      autoComplete="off"
      onSubmit={(e) => {
        submit(getFormData(e));
        e.currentTarget.reset();
        e.preventDefault();
      }}
    >
      <input
        name="tekst"
        placeholder="Legg til ting ..."
        className="box-border h-8 w-full flex-1 px-1 text-2xl placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="w-10 rounded-none border-none bg-slate-300"
      >
        +
      </button>
    </form>
  );
};

export const LeggTilTing = memo(LeggTilTingComponent);
