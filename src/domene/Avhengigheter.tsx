import { createContext } from 'react';
import { type HandlelisteService } from './handleliste/HandlelisteService';
import { type BrukerService } from './bruker/BrukerService';

export interface Tjenester {
  brukerService: Promise<BrukerService>;
  handlelisteService: Promise<HandlelisteService>;
}

export const BrukerServiceContext = createContext<BrukerService | null>(null);

export const HandlelisteServiceContext =
  createContext<HandlelisteService | null>(null);
