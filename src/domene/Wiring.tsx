import { type PropsWithChildren, useEffect, useState } from 'react';
import {
  BrukerServiceContext,
  HandlelisteServiceContext,
  type Tjenester,
} from './Avhengigheter.tsx';

function usePromisedValue<T>(promise: Promise<T>) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    void promise.then(setValue);
  }, [promise]);

  return value;
}

export const Wiring = ({
  children,
  ...services
}: PropsWithChildren<Tjenester>) => {
  const brukerService = usePromisedValue(services.brukerService);
  const handlelisteService = usePromisedValue(services.handlelisteService);

  return (
    <BrukerServiceContext value={brukerService}>
      <HandlelisteServiceContext value={handlelisteService}>
        {children}
      </HandlelisteServiceContext>
    </BrukerServiceContext>
  );
};
