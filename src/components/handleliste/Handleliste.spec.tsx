import { render, waitFor } from '@testing-library/react';
import { Wiring } from '../../domene/Wiring.tsx';
import { handlelisteServiceBasicImpl } from '../../domene/handleliste/HandlelisteServiceBasicImpl.ts';
import { Handleliste } from './Handleliste.tsx';
import type { Ting } from '../../domene/handleliste/Ting.ts';
import { describe, expect, it } from 'vitest';
import { brukerServiceBasicImpl } from '../../domene/bruker/BrukerServiceBasicImpl.ts';

function renderHandleliste(initalHandleliste: Partial<Ting>[]) {
  return render(
    <Wiring
      brukerService={brukerServiceBasicImpl()}
      handlelisteService={handlelisteServiceBasicImpl(initalHandleliste)}
    >
      <Handleliste />
    </Wiring>,
  );
}

describe('Handleliste', () => {
  it('renders', async () => {
    const root = renderHandleliste([{ tekst: 'Iskrem' }, { tekst: 'Kaffe' }]);

    await waitFor(() => expect(root.getByText('Iskrem')).toBeInTheDocument());

    root.getByText('Iskrem');
    root.getByText('Kaffe');
  });
});
