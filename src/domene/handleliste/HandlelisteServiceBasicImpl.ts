import { type HandlelisteService } from './HandlelisteService';
import { type Ting } from './Ting';
import { leggTilTing, oppdaterTing, slettTing } from './handlelisteActions';
import { createStore } from '../../utils/store.ts';
import { handlelisteReducer } from './handlelisteReducer.ts';

let nextId = 1;

export function handlelisteServiceBasicImpl(
  initalHandleliste: Partial<Ting>[] = [],
): HandlelisteService {
  const { store, update: updateStore } = createStore<Ting[]>(
    initalHandleliste.map(
      (ting) =>
        ({
          id: nextId++,
          tekst: 'default tekst',
          ferdig: false,
          ...ting,
        }) as Ting,
    ),
  );

  return {
    ...store,

    leggTilTing: (nyTing) => {
      updateStore((oldState) =>
        handlelisteReducer(
          oldState,
          leggTilTing({
            id: (nextId++).toString(),
            ...nyTing,
          } as Ting),
        ),
      );
    },

    oppdaterTing: (id, oppdatertTing) => {
      updateStore((oldState) =>
        handlelisteReducer(oldState, oppdaterTing(id, oppdatertTing)),
      );
    },

    slettTing: (tingId) => {
      updateStore((oldState) =>
        handlelisteReducer(oldState, slettTing(tingId)),
      );
    },
  };
}
