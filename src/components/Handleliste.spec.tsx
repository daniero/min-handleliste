import { render, waitFor } from '@testing-library/react';
import { Wiring } from "../domene/Avhengigheter";
import { handlelisteServiceBasicImpl } from "../domene/handleliste/HandlelisteServiceBasicImpl";
import { Handleliste } from "./Handleliste";
import { Ting } from "../domene/handleliste/Ting";

function renderHandleliste(initalHandleliste: Partial<Ting>[]) {
  return render(
    <Wiring
      brukerService={Promise.resolve(null!)}
      handlelisteService={Promise.resolve(handlelisteServiceBasicImpl(initalHandleliste))}
    >
      <Handleliste />
    </Wiring>
  );
}

describe("Handleliste", () => {
  it('renders', async () => {
    const root = renderHandleliste([
      { tekst: "Iskrem" },
      { tekst: "Kaffe" }
    ]);

    await waitFor(() => expect(root.getByText("Iskrem")).toBeInTheDocument())

    root.getByText("Iskrem");
    root.getByText("Kaffe");
  });
});