import { lazy, type PropsWithChildren, Suspense, use } from 'react';
import { Wiring } from '../domene/Wiring.tsx';

export function Setup({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<Empty />}>
      <LazyWiring>{children}</LazyWiring>
    </Suspense>
  );
}

const LazyWiring = lazy(() =>
  Promise.all([
    import('./FirebaseBrukerServiceImpl'),
    import('./FirebaseHandlelisteServiceImpl'),
  ]).then(([brukerModul, listeModul]) => {
    return {
      default: function FirebaseWiring({ children }: PropsWithChildren) {
        use(brukerModul.ready);

        return (
          <Wiring
            brukerService={brukerModul.firebaseBrukerServiceImpl}
            handlelisteService={listeModul.firebaseHandlelisteServiceImpl}
          >
            {children}
          </Wiring>
        );
      },
    };
  }),
);

function Empty() {
  return (
    <div className="container">
      <header className="main-header">
        <h1>Handleliste</h1>
      </header>
    </div>
  );
}
