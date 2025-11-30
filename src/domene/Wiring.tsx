import { type PropsWithChildren } from 'react';
import {
  BrukerServiceContext,
  HandlelisteServiceContext,
} from './Avhengigheter.tsx';
import type { BrukerService } from './bruker/BrukerService.ts';
import type { HandlelisteService } from './handleliste/HandlelisteService.ts';

export interface Tjenester {
  brukerService: BrukerService;
  handlelisteService: HandlelisteService;
}

export function Wiring({
  brukerService,
  handlelisteService,
  children,
}: PropsWithChildren<Tjenester>) {
  return (
    <BrukerServiceContext value={brukerService}>
      <HandlelisteServiceContext value={handlelisteService}>
        {children}
      </HandlelisteServiceContext>
    </BrukerServiceContext>
  );
}
