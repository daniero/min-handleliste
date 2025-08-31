import { type Ting, type TingId } from './Ting';

export type HandlelisteState = Ting[];

export type HandlelisteAction =
  | NullstillHandleliste
  | LeggTilTingAction
  | SlettTingAction
  | OppdaterTingAction;

interface NullstillHandleliste {
  type: 'SETT_HANDLELISTE';
  handleliste: Ting[];
}
interface LeggTilTingAction {
  type: 'LEGG_TIL';
  nyTing: Ting;
}
interface SlettTingAction {
  type: 'SLETT';
  id: TingId;
}
interface OppdaterTingAction {
  type: 'OPPDATER';
  id: TingId;
  oppdatertTing: Partial<Ting>;
}

export const settHandleliste: (handleliste: Ting[]) => HandlelisteAction = (
  handleliste,
) => ({
  type: 'SETT_HANDLELISTE',
  handleliste,
});

export const leggTilTing: (nyTing: Ting) => HandlelisteAction = (nyTing) => ({
  type: 'LEGG_TIL',
  nyTing,
});

export const oppdaterTing: (
  id: TingId,
  oppdatertTing: Partial<Ting>,
) => HandlelisteAction = (id, oppdatertTing) => ({
  type: 'OPPDATER',
  id,
  oppdatertTing,
});

export const slettTing: (id: TingId) => HandlelisteAction = (id) => ({
  type: 'SLETT',
  id,
});
