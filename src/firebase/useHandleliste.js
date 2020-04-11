import { useCallback, useState } from "react";

export const useHandleliste = () => {
  const [handleliste, setHandleliste] = useState([]);

  const leggTilTing = useCallback((nyTing) => setHandleliste(liste => [nyTing, ...liste]), [setHandleliste]);

  const oppdaterTing = useCallback((tingId, callback) => {
    setHandleliste(oldState => oldState.map(oldTing =>
      oldTing.id === tingId ? callback(oldTing) : oldTing));
  }, [setHandleliste]);

  return { handleliste, leggTilTing, oppdaterTing };
};
