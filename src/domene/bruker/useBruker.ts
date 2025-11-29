import { type Bruker } from './Bruker';
import { use, useSyncExternalStore } from 'react';
import { BrukerServiceContext } from '../Avhengigheter';

interface BrukerHook {
  bruker: Bruker | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
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
