import React, { memo, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const EMAIL = 'test@example.com';
const PASSWORD = 'hunter2';

const BrukerComponent = () => {

  const [bruker, setBruker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => auth.onAuthStateChanged(user => {
    setLoading(false);
    setBruker(user);
  }), []);

  return (
    <div style={{ textAlign: 'right' }}>
      <button
        hidden={!!bruker}
        disabled={loading}
        tabIndex={-1}
        onClick={() => {
          setLoading(true);
          auth.signUp(EMAIL, PASSWORD);
        }}>
        Sign up
      </button>
      <button
        hidden={!!bruker}
        disabled={loading}
        tabIndex={-1}
        onClick={() => {
          setLoading(true);
          auth.signIn(EMAIL, PASSWORD);
        }}>
        Sign in
      </button>
      <button
        hidden={!bruker}
        disabled={loading}
        tabIndex={-1}
        onClick={() => {
          setLoading(true);
          auth.signOut();
        }}>
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