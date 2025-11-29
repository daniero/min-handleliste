import type {
  HandlelisteAction,
  HandlelisteState,
} from './handlelisteActions.ts';
import type { Reducer } from 'react';

export const handlelisteReducer: Reducer<
  HandlelisteState,
  HandlelisteAction
> = (handleliste, action) => {
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
