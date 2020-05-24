import { useRef, useState } from "react";

export const useTidsbryter = (forsinkelse = 1000) => {
  const [verdi, setVerdi] = useState(false);
  const nedtelling = useRef(-1);

  const aktiver = () => {
    if (nedtelling.current === -1) {
      clearTimeout(nedtelling.current);
    }

    setVerdi(true);
    nedtelling.current = setTimeout(() => {
      setVerdi(false);
      nedtelling.current = -1;
    }, forsinkelse);
  };

  return [verdi, aktiver]
};