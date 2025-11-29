import type { Bruker } from './Bruker.ts';
import type { Store } from '../../utils/store.ts';

export type BrukerService = Store<Bruker | null> & BrukerMetoder;

export interface BrukerMetoder {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
