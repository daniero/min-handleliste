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
    <div className="fixed inset-0 flex flex-col sm:py-5 sm:px-8">
      <header className="flex-0 flex px-2 flex-wrap items-center">
        <h1 className="text-3xl sm:my-3 my-1 font-bold flex-1">Handleliste</h1>
      </header>
    </div>
  );
}
