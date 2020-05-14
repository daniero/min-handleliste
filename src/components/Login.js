import React, { useState } from 'react';
import css from './Login.module.css';
import { getFormData } from "../utils/forms";

export const Login = ({
                        signIn
                      }) => {

  const [loading, setLoading] = useState(false);
  const [feil, setFeil] = useState(null);

  const loggInn = ({ epost, passord }) => {
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
  };

  return (
    <div className={css.container}>
      {feil && (
        <div role="alert" className={css.feilmelding}>{feil}</div>
      )}
      <form onSubmit={e => {
        loggInn(getFormData(e));
        e.preventDefault();
      }}
      >
        <label htmlFor="epost">E-post</label>
        <input
          id="epost"
          name="epost"
          type="text"
          required
        />
        <label htmlFor="passord">Passord</label>
        <input
          id="passord"
          name="passord"
          type="password"
          required
        />
        <button
          type="submit"
          disabled={loading}
        >
          Logg inn
        </button>
      </form>
    </div>
  );
};
