export type TingId = string;

export interface Ting {
  id: TingId;
  ferdig: boolean;
  ferdigDato?: number;
  tekst: string;
  sortering?: number;
}
