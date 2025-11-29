import { type BrukerService } from './BrukerService';
import { createStore } from '../../utils/store.ts';
import type { Bruker } from './Bruker.ts';

export function brukerServiceBasicImpl(): BrukerService {
  const { store } = createStore<Bruker>({
    epost: 'test@example.com',
  });

  return {
    ...store,
    signUp: () => Promise.resolve(),
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
  };
}
