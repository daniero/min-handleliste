import { createContext } from 'react';
import { type HandlelisteService } from './handleliste/HandlelisteService';
import { type BrukerService } from './bruker/BrukerService';

export const BrukerServiceContext = createContext<BrukerService>(null!);

export const HandlelisteServiceContext = createContext<HandlelisteService>(
  null!,
);
