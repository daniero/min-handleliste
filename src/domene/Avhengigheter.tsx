import { createContext, ReactChild } from "react";
import { HandlelisteService } from "./handleliste/HandlelisteService";
import { BrukerService } from "./bruker/BrukerService";

interface Tjenester {
  brukerService: BrukerService
  handlelisteService: HandlelisteService
}

export const Avhengigheter = createContext<Tjenester>(null!);

export const Wiring = ({ children, ...services }: { children: ReactChild } & Tjenester) => {
  return (
    <Avhengigheter.Provider value={services}>
      {children}
    </Avhengigheter.Provider>
  );
};