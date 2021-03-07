import { createContext, ReactChild } from "react";
import { HandlelisteService } from "./HandlelisteService";

export const HandlelisteContext = createContext<HandlelisteService>(null!);

interface HandlelisteProviderProps {
  handlelisteService: HandlelisteService,
  children: ReactChild
}

export const HandlelisteProvider = ({ handlelisteService, children }: HandlelisteProviderProps) => {
  return (
    <HandlelisteContext.Provider value={handlelisteService}>
      {children}
    </HandlelisteContext.Provider>
  );
};