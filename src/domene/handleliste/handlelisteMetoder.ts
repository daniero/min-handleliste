import type { Ting, TingId } from "./Ting";

export interface HandlelisteMetoder {
  slettTing: (tingId: string) => void
  leggTilTing: (nyTing: Partial<Ting>) => void
  oppdaterTing: (id: TingId, oppdatertTing: Partial<Ting>) => void
}