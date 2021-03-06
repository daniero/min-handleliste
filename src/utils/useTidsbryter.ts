import { useRef, useState } from "react";

enum Tilstand {
  Stopp = -1
}

type Nedtelling = Tilstand | ReturnType<typeof setTimeout>

/**
 * Returnerer en boolsk verdi, initielt `false`,
 * og en aktiveringsfunksjon som endrer verdien til `true` i  `forsinkelse` millisekunder.
 * @param forsinkelse i millisekunder
 */
export const useTidsbryter: (forsinkelse?: number) => [boolean, () => void] = (forsinkelse = 1000) => {
  const [aktivert, setAktivert] = useState(false);
  const nedtelling = useRef<Nedtelling>(Tilstand.Stopp);

  const aktiver = () => {
    if (nedtelling.current !== Tilstand.Stopp) {
      clearTimeout(nedtelling.current);
    }

    setAktivert(true);
    nedtelling.current = setTimeout(() => {
      setAktivert(false);
      nedtelling.current = Tilstand.Stopp
    }, forsinkelse);
  };

  return [aktivert, aktiver]
};