import React, { memo } from "react";
import { useBruker } from "../firebase/useBruker";

const EMAIL = 'test@example.com';
const PASSWORD = 'hunter2';

const BrukerComponent = () => {

  const { bruker, loading, signUp, signIn, signOut } = useBruker();

  return (
    <div style={{ textAlign: 'right' }}>
      <button
        hidden={!!bruker}
        disabled={loading}
        tabIndex={-1}
        onClick={() => signUp(EMAIL, PASSWORD)}
      >
        Sign up
      </button>
      <button
        hidden={!!bruker}
        disabled={loading}
        tabIndex={-1}
        onClick={() => signIn(EMAIL, PASSWORD)}
      >
        Sign in
      </button>
      <button
        hidden={!bruker}
        disabled={loading}
        tabIndex={-1}
        onClick={() => signOut()}
      >
        Sign out
      </button>
      {' '}
      {
        loading ?
          '...' :
          bruker ?
            `Logget inn som ${bruker.email}` :
            'Ikke logget inn'
      }
    </div>
  );
};

export const Bruker = memo(BrukerComponent);