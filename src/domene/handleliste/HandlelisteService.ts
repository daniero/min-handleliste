import { Dispatch } from "react";
import { Ting, TingId } from "./Ting";
import { HandlelisteAction } from "./handlelisteActions";


export interface HandlelisteService {
  registerHandler: (dispatcher: Dispatch<HandlelisteAction>) => void
  unregisterHandler: (dispatcher: Dispatch<HandlelisteAction>) => void

  leggTilTing: (nyTing: Partial<Ting>) => void
  oppdaterTing: (id: TingId, oppdatertTing: Partial<Ting>) => void
  slettTing: (id: TingId) => void
}

