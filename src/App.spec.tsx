import { render } from '@testing-library/react';
import { App } from './App.tsx';
import { Wiring } from './domene/Wiring.tsx';
import { brukerServiceBasicImpl } from './domene/bruker/BrukerServiceBasicImpl.ts';
import { handlelisteServiceBasicImpl } from './domene/handleliste/HandlelisteServiceBasicImpl.ts';
import { expect, it } from 'vitest';

it('renders handleliste header', () => {
  const tree = render(
    <Wiring
      brukerService={brukerServiceBasicImpl()}
      handlelisteService={handlelisteServiceBasicImpl()}
    >
      <App />
    </Wiring>,
  );

  const overskrift = tree.getByRole('heading');

  expect(overskrift).toHaveTextContent('Handleliste');
});

// TODO test når auth er mocket/providet:
//  - at main ikke blir rendra før bruker er lastet
//  - toggle meny, vise innlogget bruker
