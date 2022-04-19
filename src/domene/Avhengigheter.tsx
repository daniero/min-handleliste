import { createContext, ReactChild, useEffect, useState } from "react";
import { HandlelisteService } from "./handleliste/HandlelisteService";
import { BrukerService } from "./bruker/BrukerService";

interface Tjenester {
  brukerService: Promise<BrukerService>
  handlelisteService: Promise<HandlelisteService>
}

export const BrukerServiceContext = createContext<BrukerService | null>(null)
export const HandlelisteServiceContext = createContext<HandlelisteService | null>(null)

function usePromisedValue<T>(promise: Promise<T>) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    promise.then(setValue);
  }, [promise])

  return value;
}

export const Wiring = ({ children, ...services }: { children: ReactChild } & Tjenester) => {

  const brukerService = usePromisedValue(services.brukerService);
  const handlelisteService = usePromisedValue(services.handlelisteService);

  return (
    <BrukerServiceContext.Provider value={brukerService}>
      <HandlelisteServiceContext.Provider value={handlelisteService}>
        {children}
      </HandlelisteServiceContext.Provider>
    </BrukerServiceContext.Provider>
  );
};