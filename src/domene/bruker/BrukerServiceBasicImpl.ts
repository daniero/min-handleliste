import { type Dispatch } from 'react';
import { type Bruker } from './Bruker';
import { type BrukerService } from './BrukerService';

export const brukerServiceBasicImpl: () => BrukerService = () => {
  let _dispatcher: Dispatch<Bruker | null> | null = null;

  return {
    registerHandler: (dispatcher: Dispatch<Bruker | null>) => {
      _dispatcher = dispatcher;
      _dispatcher({ epost: 'test@example.com' });
    },
    unregisterHandler: () => (_dispatcher = null),

    signUp: () => Promise.resolve(),
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
  } as BrukerService;
};
