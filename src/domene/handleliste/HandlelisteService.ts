import type { Store } from '../../utils/store.ts';
import type { Ting, TingId } from './Ting.ts';

export type HandlelisteService = Store<Ting[]> & HandlelisteMetoder;

export interface HandlelisteMetoder {
  slettTing: (tingId: string) => void;
  leggTilTing: (nyTing: Partial<Ting>) => void;
  oppdaterTing: (id: TingId, oppdatertTing: Partial<Ting>) => void;
}
