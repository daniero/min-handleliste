import { render } from '@testing-library/react';
import { App } from './App';
import { Wiring } from '../domene/Wiring.tsx';
import { brukerServiceBasicImpl } from '../domene/bruker/BrukerServiceBasicImpl';
import { handlelisteServiceBasicImpl } from '../domene/handleliste/HandlelisteServiceBasicImpl';
import { expect, it } from 'vitest';

it('renders handleliste header', () => {
  // TODO mock/provide auth/useBruker/useEffect
  // TODO fiks act-warnings
  const tree = render(
    <Wiring
      brukerService={Promise.resolve(brukerServiceBasicImpl())}
      handlelisteService={Promise.resolve(handlelisteServiceBasicImpl())}
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
