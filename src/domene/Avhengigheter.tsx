import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { type HandlelisteService } from './handleliste/HandlelisteService';
import { type BrukerService } from './bruker/BrukerService';

interface Tjenester {
  brukerService: Promise<BrukerService>;
  handlelisteService: Promise<HandlelisteService>;
}

// TODO
// eslint-disable-next-line react-refresh/only-export-components
export const BrukerServiceContext = createContext<BrukerService | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const HandlelisteServiceContext =
  createContext<HandlelisteService | null>(null);

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
