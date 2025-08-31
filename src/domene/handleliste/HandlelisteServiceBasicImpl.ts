import { type HandlelisteService } from './HandlelisteService';
import { type Dispatch } from 'react';
import { type Ting } from './Ting';
import {
  type HandlelisteAction,
  leggTilTing,
  settHandleliste,
  oppdaterTing,
  slettTing,
} from './handlelisteActions';

let nextId = 1;
let tingDispatcher: Dispatch<HandlelisteAction> | null = null;

export function handlelisteServiceBasicImpl(
  initalHandleliste: Partial<Ting>[] = [],
): HandlelisteService {
  return {
    registerHandler(dispatcher) {
      tingDispatcher = dispatcher;
      dispatcher(
        settHandleliste(
          initalHandleliste.map(
            (ting) =>
              ({
                id: nextId++,
                tekst: 'default tekst',
                ferdig: false,
                ...ting,
              }) as Ting,
          ),
        ),
      );
    },

    unregisterHandler: () => (tingDispatcher = null),

    leggTilTing: (nyTing) =>
      tingDispatcher?.(
        leggTilTing({
          id: (nextId++).toString(),
          ...nyTing,
        } as Ting),
      ),

    oppdaterTing: (id, oppdatertTing) =>
      tingDispatcher?.(oppdaterTing(id, oppdatertTing)),

    slettTing: (tingId) => tingDispatcher?.(slettTing(tingId)),
  };
}
