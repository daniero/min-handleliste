import { Ting, TingId } from "./Ting";
import { Reducer, useContext, useEffect, useReducer } from "react";
import { HandlelisteServiceContext } from "../Avhengigheter";
import type { HandlelisteAction, HandlelisteState } from "./handlelisteActions";

const initialHandleliste: HandlelisteState = [];

const reducer: Reducer<HandlelisteState, HandlelisteAction> = (handleliste, action) => {
  console.log(action)
  switch (action.type) {
    case "LEGG_TIL": {
      return [
        ...handleliste,
        action.nyTing
      ]
    }
    case "SLETT": {
      return handleliste.filter(ting => ting.id !== action.id)
    }
    case "OPPDATER": {
      return handleliste.map(ting => ting.id === action.id ? {
          ...ting,
          ...action.oppdatertTing
        } : ting
      );
    }
    case "SETT_HANDLELISTE": {
      return action.handleliste;
    }
    default: {
      return handleliste
    }
  }
};

interface HandlelisteHook {
  handleliste: Ting[]

  leggTilTing: (nyTing: Partial<Ting>) => void
  oppdaterTing: (id: TingId, oppdatertTing: Partial<Ting>) => void
  slettTing: (tingId: string) => void
}

export function useHandleliste(): HandlelisteHook {
  const handlelisteService = useContext(HandlelisteServiceContext);

  const [handleliste, dispatch] = useReducer(reducer, initialHandleliste);

  useEffect(() => {
    handlelisteService?.registerHandler(dispatch);
    return () => handlelisteService?.unregisterHandler(dispatch);
  }, [handlelisteService]);

  return {
    handleliste,
    leggTilTing: (ting) => handlelisteService?.leggTilTing(ting),
    slettTing: (id) => handlelisteService?.slettTing(id),
    oppdaterTing: (id, ting) => handlelisteService?.oppdaterTing(id, ting)
  };
}