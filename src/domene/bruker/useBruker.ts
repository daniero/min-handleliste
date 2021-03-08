import { Bruker } from "./Bruker";
import { Reducer, useContext, useEffect, useReducer } from "react";
import { Avhengigheter } from "../Avhengigheter";

interface BrukerHook {
  bruker?: Bruker,
  laster: boolean;
  signUp: (email: string, password: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
}

interface BrukerState {
  laster: boolean;
  bruker: Bruker | null;
}

type BrukerReducer = Reducer<BrukerState, Bruker | null>

const reducer: BrukerReducer = (state: BrukerState, bruker: Bruker | null) => ({
  laster: false,
  bruker
});

const initialState = { laster: true, bruker: null };

export const useBruker: () => BrukerHook = () => {
  const { brukerService } = useContext(Avhengigheter);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    brukerService.registerHandler(dispatch);
    return () => brukerService.unregisterHandler(dispatch);
  }, [brukerService, dispatch]);

  return {
    ...state,
    signUp: brukerService.signUp,
    signIn: brukerService.signIn,
    signOut: brukerService.signOut
  } as BrukerHook;
}