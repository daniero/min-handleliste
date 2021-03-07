import { render } from '@testing-library/react';
import { App } from './App';
import { HandlelisteProvider } from '../domene/handleliste/HandlelisteProvider';
import { handlelisteServiceBasicImpl } from '../domene/handleliste/HandlelisteServiceBasicImpl';

it('renders handleliste header', () => {
  // TODO mock/provide auth/useBruker/useEffect
  // TODO fiks act-warnings
  let tree = render(
    <HandlelisteProvider handlelisteService={handlelisteServiceBasicImpl()}>
      <App/>
    </HandlelisteProvider>
  );

  const overskrift = tree.getByRole('heading');

  expect(overskrift).toHaveTextContent("Handleliste")
});

// TODO test når auth er mocket/providet:
//  - at main ikke blir rendra før bruker er lastet
//  - toggle meny, vise innlogget bruker
