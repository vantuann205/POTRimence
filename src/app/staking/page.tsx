import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staking — POTRimence',
  description: 'Nominate validators and stake POT on the Portaldot network.',
};

export default function StakingPage() {
  return (
    <div className="container section">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Staking</h1>
        <p style={{ marginTop: '0.5rem' }}>
          Portaldot uses LAO NPoS (Linear Attenuation Offset Nominated Proof of Stake) consensus.
          Stake your POT to nominate validators and earn rewards.
        </p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏦</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Nominate</h3>
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
            Choose up to 16 validators to nominate and stake your POT.
          </p>
          <button className="btn btn-primary btn-sm" disabled>
            Connect Wallet to Nominate
          </button>
        </div>
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚡</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Validators</h3>
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
            Browse the current set of active validators on Portaldot.
          </p>
          <a href="/staking/validators" className="btn btn-outline btn-sm">
            View Validators
          </a>
        </div>
      </div>
    </div>
  );
}
