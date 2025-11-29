import { Wiring } from '../domene/Wiring.tsx';
import type { PropsWithChildren } from 'react';
import { firebaseBrukerServiceImpl } from './FirebaseBrukerServiceImpl.ts';
import { firebaseHandlelisteServiceImpl } from './FirebaseHandlelisteServiceImpl.ts';

export function FirebaseWiring({ children }: PropsWithChildren) {
  return (
    <Wiring
      brukerService={firebaseBrukerServiceImpl}
      handlelisteService={firebaseHandlelisteServiceImpl}
    >
      {children}
    </Wiring>
  );
}
