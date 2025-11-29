import type { Ting } from './Ting';
import { use, useSyncExternalStore } from 'react';
import { HandlelisteServiceContext } from '../Avhengigheter';
import type { HandlelisteMetoder } from './HandlelisteService.ts';

export function useHandleliste(): HandlelisteMetoder & { handleliste: Ting[] } {
  const handlelisteService = use(HandlelisteServiceContext);

  const handleliste = useSyncExternalStore(
    handlelisteService.subscribe,
    handlelisteService.getState,
  );

  return {
    handleliste,
    ...handlelisteService,
  };
}
