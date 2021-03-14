import { useCallback, useState } from 'react';
import css from './Login.module.css';
import { getFormData } from "../../utils/forms";
import { PassordInput } from "./Passord";

export const Login = ({
                        signIn,
                        signUp
                      }) => {

  const [handling, setHandling] = useState('logginn');
  const [loading, setLoading] = useState(false);
  const [feil, setFeil] = useState(null);

  const loggInn = useCallback(({ epost, passord }) => {
    setFeil(null);
    setLoading(true);
    signIn(epost, passord)
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          setFeil('Ukjent epost eller ukorrekt passord');
        } else {
          setFeil(error.message);
        }
        setLoading(false);
      });
  }, [signIn]);

  const opprettKonto = useCallback(({ epost, passord }) => {
    setFeil(null);
    setLoading(true);
    signUp(epost, passord)
      .catch(error => {
        setFeil(error.message);
        setLoading(false);
      });
  }, [signUp]);

  return (
    <div className={css.container}>

      <div
        className={css.fanelinje}
        role="tablist"
      >
        <input
          type="radio"
          role="tab"
          name="handling"
          id="logginn"
          value="logginn"
          checked={handling === 'logginn'}
          onChange={() => {
            setHandling('logginn');
            setFeil(null)
          }}
        />
        <label htmlFor="logginn">Logg inn</label>

        <input
          type="radio"
          name="handling"
          id="opprett"
          value="opprett"
          checked={handling === 'opprett'}
          onChange={() => {
            setHandling('opprett');
            setFeil(null);
          }}
        />
        <label htmlFor="opprett">Opprett konto</label>
      </div>

      {handling === 'logginn' && (
        <form
          className={css.form}
          onSubmit={e => {
            loggInn(getFormData(e));
            e.preventDefault();
          }}
        >
          {feil && (
            <div role="alert" className={css.feilmelding}>{feil}</div>
          )}

          <label htmlFor="epost">E-post</label>
          <input
            id="epost"
            name="epost"
            type="text"
            required
          />

          <label htmlFor="passord">Passord</label>
          <PassordInput id="passord"/>

          <button
            type="submit"
            disabled={loading}
          >
            Logg inn
          </button>
        </form>
      )}

      {handling === 'opprett' && (
        <form
          className={css.form}
          onSubmit={e => {
            opprettKonto(getFormData(e));
            e.preventDefault();
          }}
        >
          {feil && (
            <div role="alert" className={css.feilmelding}>{feil}</div>
          )}

          <label htmlFor="epost">E-post</label>
          <input
            id="epost"
            name="epost"
            type="text"
            required
          />

          <label htmlFor="passord">Passord</label>
          <PassordInput id="passord"/>

          <button
            type="submit"
            disabled={loading}
          >
            Opprett konto
          </button>
        </form>
      )}

    </div>
  );
};
