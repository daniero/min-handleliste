import { type HandlelisteService } from './HandlelisteService';
import { type Ting } from './Ting';
import { leggTilTing, oppdaterTing, slettTing } from './handlelisteActions';
import { createStore } from '../../utils/store.ts';
import { handlelisteReducer } from './handlelisteReducer.ts';

let nextId = 1;

export function handlelisteServiceBasicImpl(
  initialHandleliste: Partial<Ting>[] = [],
): HandlelisteService {
  const { store, update } = createStore(
    initialHandleliste.map(
      (ting) =>
        ({
          id: nextId++,
          tekst: 'default tekst',
          ferdig: false,
          ...ting,
        }) as Ting,
    ),
    handlelisteReducer,
  );

  return {
    ...store,

    leggTilTing: (nyTing) => {
      update(
        leggTilTing({
          id: (nextId++).toString(),
          ...nyTing,
        } as Ting),
      );
    },

    oppdaterTing: (id, oppdatertTing) => {
      update(oppdaterTing(id, oppdatertTing));
    },

    slettTing: (tingId) => {
      update(slettTing(tingId));
    },
  };
}
