import { type Dispatch } from 'react';
import { type Bruker } from './Bruker';
import { type BrukerService } from './BrukerService';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const brukerServiceBasicImpl: () => BrukerService = () => {
  // @ts-expect-error FIXME Vet ikke helt hva tanken her var
  let foo: Dispatch<Bruker | null> | null = null;

  return {
    registerHandler: (dispatcher: Dispatch<Bruker | null>) => {
      foo = dispatcher;
      dispatcher({ epost: 'test@example.com' });
    },
    unregisterHandler: (_) => (foo = null),

    signUp: (_1, _2) => Promise.resolve(),
    signIn: (_1, _2) => Promise.resolve(),
    signOut: () => Promise.resolve(),
  } as BrukerService;
};
