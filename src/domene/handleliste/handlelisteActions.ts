import { Ting, TingId } from "./Ting";

export type HandlelisteState = Ting[]

export type HandlelisteAction =
  NullstillHandleliste |
  LeggTilTingAction |
  SlettTingAction |
  OppdaterTingAction;

type NullstillHandleliste = {
  type: "SETT_HANDLELISTE",
  handleliste: Ting[]
}
type LeggTilTingAction = {
  type: "LEGG_TIL"
  nyTing: Ting
}
type SlettTingAction = {
  type: "SLETT"
  id: TingId
}
type OppdaterTingAction = {
  type: "OPPDATER",
  id: TingId,
  oppdatertTing: Partial<Ting>
}

export const settHandleliste: (handleliste: Ting[]) => HandlelisteAction = handleliste => ({
  type: "SETT_HANDLELISTE",
  handleliste
});

export const leggTilTing: (nyTing: Ting) => HandlelisteAction = nyTing => ({
  type: "LEGG_TIL",
  nyTing
});

export const oppdaterTing: (id: TingId, oppdatertTing: Partial<Ting>) => HandlelisteAction = (id, oppdatertTing) => ({
  type: "OPPDATER",
  id,
  oppdatertTing
});

export const slettTing: (id: TingId) => HandlelisteAction = id => ({
  type: 'SLETT',
  id
});