import { Dispatch } from "react";
import { Bruker } from "./Bruker";
import { BrukerService } from "./BrukerService";

export const brukerServiceBasicImpl: () => BrukerService = () => {
  let foo: Dispatch<Bruker | null> | null = null;

  return {
    registerHandler: (dispatcher: Dispatch<Bruker | null>) => {
      foo = dispatcher;
      dispatcher(({ epost: 'test@example.com' }));
    },
    unregisterHandler: (_) => foo = null,

    signUp: (_1, _2) => Promise.resolve(),
    signIn: (_1, _2) => Promise.resolve(),
    signOut: () => Promise.resolve()
  } as BrukerService;
};