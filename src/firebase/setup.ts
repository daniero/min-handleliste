import type { Tjenester } from '../domene/Avhengigheter.tsx';

export function setup(): Tjenester {
  const loadAuth = import('./setupAuth');

  return {
    brukerService: loadAuth.then((module) => module.brukerService),

    handlelisteService: (async () => {
      const databaseModule = await import('./FirebaseHandlelisteServiceImpl');
      const { firebaseApp, auth } = await loadAuth;

      return databaseModule.firebaseHandlelisteServiceImpl(firebaseApp, auth);
    })(),
  };
}
