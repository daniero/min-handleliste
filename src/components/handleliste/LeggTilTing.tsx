import { memo } from 'react';
import { type FormObject, getFormData } from '../../utils/forms.ts';
import type { HandlelisteMetoder } from '../../domene/handleliste/HandlelisteService.ts';
import { PlussIkon } from '../ikoner/PlussIkon.tsx';

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
      className="flex items-start gap-1"
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
        className="mr-1 w-8 border-none bg-transparent text-white"
      >
        <PlussIkon />
      </button>
    </form>
  );
};

export const LeggTilTing = memo(LeggTilTingComponent);
