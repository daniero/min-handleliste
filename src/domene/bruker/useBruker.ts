import { Bruker } from "./Bruker";
import { Reducer, useContext, useEffect, useReducer } from "react";
import { BrukerServiceContext } from "../Avhengigheter";

interface BrukerHook {
  bruker: Bruker | null,
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

const reducer: BrukerReducer = (state, bruker) => ({
  laster: false,
  bruker
});

const initialState = { laster: true, bruker: null };

export function useBruker() {
  const brukerService = useContext(BrukerServiceContext);
  const [brukerState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    brukerService?.registerHandler(dispatch);
    return () => brukerService?.unregisterHandler(dispatch);
  }, [brukerService]);

  return {
    ...brukerState,
    signUp: brukerService?.signUp,
    signIn: brukerService?.signIn,
    signOut: brukerService?.signOut
  } as BrukerHook;
}