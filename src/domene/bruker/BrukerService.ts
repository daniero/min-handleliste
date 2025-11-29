import { type Bruker } from './Bruker';
import type { Store } from '../../utils/store.ts';

export interface BrukerService extends Store<Bruker | null> {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
