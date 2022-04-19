import { render } from '@testing-library/react';
import { Wiring } from "../domene/Avhengigheter";
import { handlelisteServiceBasicImpl } from "../domene/handleliste/HandlelisteServiceBasicImpl";
import { Handleliste } from "./Handleliste";

describe("Handleliste", () => {
  it('renders', () => {
    render(
      <Wiring
        brukerService={Promise.resolve(null!)}
        handlelisteService={Promise.resolve(handlelisteServiceBasicImpl())}
      >
        <Handleliste/>
      </Wiring>
    );
  });

});