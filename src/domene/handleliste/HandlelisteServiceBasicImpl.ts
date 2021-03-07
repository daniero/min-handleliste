import { HandlelisteService } from "./HandlelisteService";
import { Dispatch } from "react";
import { Ting } from "./Ting";
import { HandlelisteAction, leggTilTing, settHandleliste, oppdaterTing, slettTing } from "./handlelisteActions";

let nextId = 1
let tingDispatcher: Dispatch<HandlelisteAction> | null = null;

export function handlelisteServiceBasicImpl(
  initalHandleliste: Partial<Ting>[] = []
): HandlelisteService {
  return {
    registerHandler(dispatcher) {
      tingDispatcher = dispatcher;
      dispatcher(settHandleliste(initalHandleliste.map(ting => ({
        id: nextId++,
        tekst: "default tekst",
        ferdig: false,
        ...ting
      } as Ting))))
    },

    unregisterHandler: _ => tingDispatcher = null,

    leggTilTing: nyTing => tingDispatcher?.(leggTilTing({
      id: ('' + nextId++),
      ...nyTing
    } as Ting)),

    oppdaterTing: (id, oppdatertTing) => tingDispatcher?.(oppdaterTing(id, oppdatertTing)),

    slettTing: tingId => tingDispatcher?.(slettTing(tingId))
  };
}
