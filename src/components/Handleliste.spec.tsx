import { render } from '@testing-library/react';
import { HandlelisteProvider } from "../domene/handleliste/HandlelisteProvider";
import { handlelisteServiceBasicImpl } from "../domene/handleliste/HandlelisteServiceBasicImpl";
import { Handleliste } from "./Handleliste";

describe("Handleliste", () => {
  it('renders', () => {
    render(
      <HandlelisteProvider
        handlelisteService={handlelisteServiceBasicImpl()}
      >
        <Handleliste/>
      </HandlelisteProvider>
    );
  });

});