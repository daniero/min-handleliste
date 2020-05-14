import React, { memo } from "react";

const BrukerComponent = ({ bruker, signOut }) => {

  return (
    <div style={{ textAlign: 'right' }}>
      {`Logget inn som ${bruker?.email}`}
      {' '}
      <button
        tabIndex={-1}
        onClick={signOut}
      >
        Logg ut
      </button>
    </div>
  );
};

export const Bruker = memo(BrukerComponent);