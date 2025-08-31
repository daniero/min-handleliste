import { type Dispatch } from 'react';
import { type Bruker } from './Bruker';

export interface BrukerService {
  registerHandler: (dispatcher: Dispatch<Bruker | null>) => void;
  unregisterHandler: (dispatcher: Dispatch<Bruker | null>) => void;

  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
