export type TingId = string

export interface Ting {
  id: TingId,
  ferdig: boolean,
  tekst: string,
  sortering?: number
}