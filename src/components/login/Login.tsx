import { useCallback, useState } from 'react';
import css from './Login.module.css';
import { getFormData } from '../../utils/forms';
import { PassordInput } from './Passord';
import type { BrukerService } from '../../domene/bruker/BrukerService.ts';

export const Login = ({
  signIn,
  signUp,
}: {
  signIn: BrukerService['signIn'];
  signUp: BrukerService['signUp'];
}) => {
  const [handling, setHandling] = useState('logginn');
  const [loading, setLoading] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const loggInn = useCallback(
    ({ epost, passord }: { epost: string; passord: string }) => {
      setFeil(null);
      setLoading(true);

      signIn(epost, passord).catch((error: unknown) => {
        if (error instanceof Error) {
          setFeil(error.message);
        } else {
          setFeil('Det oppstod en ukjent feil');
        }
        setLoading(false);
      });
    },
    [signIn],
  );

  const opprettKonto = useCallback(
    ({ epost, passord }: { epost: string; passord: string }) => {
      setFeil(null);
      setLoading(true);

      signUp(epost, passord).catch((error: unknown) => {
        if (error instanceof Error) {
          setFeil(error.message);
        } else {
          setFeil('Det oppstod en ukjent feil');
        }
        setLoading(false);
      });
    },
    [signUp],
  );

  return (
    <div className={css.container}>
      <div className={css.fanelinje} role="tablist">
        <input
          type="radio"
          role="tab"
          name="handling"
          id="logginn"
          value="logginn"
          checked={handling === 'logginn'}
          onChange={() => {
            setHandling('logginn');
            setFeil(null);
          }}
        />
        <label htmlFor="logginn">Logg inn</label>

        <input
          type="radio"
          role="tab"
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
          onSubmit={(e) => {
            // @ts-expect-error jada jada todo TODO
            loggInn(getFormData(e));
            e.preventDefault();
          }}
        >
          {feil != null && (
            <div role="alert" className={css.feilmelding}>
              {feil}
            </div>
          )}

          <label htmlFor="epost">E-post</label>
          <input id="epost" name="epost" type="email" required />

          <label htmlFor="passord">Passord</label>
          <PassordInput id="passord" />

          <button type="submit" disabled={loading}>
            Logg inn
          </button>
        </form>
      )}

      {handling === 'opprett' && (
        <form
          className={css.form}
          onSubmit={(e) => {
            // @ts-expect-error jada jada todo TODO
            opprettKonto(getFormData(e));
            e.preventDefault();
          }}
        >
          {feil != null && (
            <div role="alert" className={css.feilmelding}>
              {feil}
            </div>
          )}

          <label htmlFor="epost">E-post</label>
          <input id="epost" name="epost" type="email" required />

          <label htmlFor="passord">Passord</label>
          <PassordInput id="passord" />

          <button type="submit" disabled={loading}>
            Opprett konto
          </button>
        </form>
      )}
    </div>
  );
};
