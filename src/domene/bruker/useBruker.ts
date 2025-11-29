import { type Bruker } from './Bruker';
import { use, useSyncExternalStore } from 'react';
import { BrukerServiceContext } from '../Avhengigheter';
import type { BrukerMetoder } from './BrukerService.ts';

interface BrukerHook extends BrukerMetoder {
  bruker: Bruker | null;
}

export function useBruker() {
  const brukerService = use(BrukerServiceContext);
  const bruker = useSyncExternalStore(
    brukerService.subscribe,
    brukerService.getState,
  );

  return {
    bruker,
    signUp: brukerService.signUp,
    signIn: brukerService.signIn,
    signOut: brukerService.signOut,
  } as BrukerHook;
}
