import type { Ting } from './Ting';
import { type Reducer, use, useEffect, useMemo, useReducer } from 'react';
import { HandlelisteServiceContext } from '../Avhengigheter';
import type { HandlelisteMetoder } from './handlelisteMetoder';
import type { HandlelisteAction, HandlelisteState } from './handlelisteActions';

const initialHandleliste: HandlelisteState = [] as const;

const reducer: Reducer<HandlelisteState, HandlelisteAction> = (
  handleliste,
  action,
) => {
  console.log(action);
  switch (action.type) {
    case 'LEGG_TIL': {
      return [...handleliste, action.nyTing];
    }
    case 'SLETT': {
      return handleliste.filter((ting) => ting.id !== action.id);
    }
    case 'OPPDATER': {
      return handleliste.map((ting) =>
        ting.id === action.id
          ? {
              ...ting,
              ...action.oppdatertTing,
            }
          : ting,
      );
    }
    case 'SETT_HANDLELISTE': {
      return action.handleliste;
    }
    default: {
      return handleliste;
    }
  }
};

export function useHandleliste(): HandlelisteMetoder & { handleliste: Ting[] } {
  const handlelisteService = use(HandlelisteServiceContext);

  const [handleliste, dispatch] = useReducer(reducer, initialHandleliste);

  useEffect(() => {
    handlelisteService?.registerHandler(dispatch);
    return () => handlelisteService?.unregisterHandler(dispatch);
  }, [handlelisteService]);

  const metoder: HandlelisteMetoder = useMemo(
    () => ({
      leggTilTing: (ting) => handlelisteService?.leggTilTing(ting),
      slettTing: (id) => handlelisteService?.slettTing(id),
      oppdaterTing: (id, ting) => handlelisteService?.oppdaterTing(id, ting),
    }),
    [handlelisteService],
  );

  return {
    handleliste,
    ...metoder,
  };
}
