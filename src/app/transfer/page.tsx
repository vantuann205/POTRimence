import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transfer POT — POTRimence',
  description: 'Transfer POT tokens on the Portaldot blockchain.',
};

export default function TransferPage() {
  return (
    <div className="container section">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Transfer POT</h1>
        <p style={{ marginTop: '0.5rem' }}>
          Send POT tokens to any Portaldot address. Requires the Polkadot&#123;.js&#125; browser extension.
        </p>
      </div>

      <div className="card" style={{ maxWidth: 580 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Recipient Address
            </label>
            <input className="input" type="text" placeholder="5F… (SS58 format)" />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Amount (POT)
            </label>
            <input className="input" type="number" placeholder="0.0000" step="0.0001" />
          </div>
          <button className="btn btn-primary" disabled>
            Connect Wallet to Transfer
          </button>
          <p style={{ fontSize: '0.75rem' }}>
            This will call <code style={{ fontFamily: 'var(--font-mono)' }}>balances.transferKeepAlive</code> extrinsic on the Portaldot network.
          </p>
        </div>
      </div>
    </div>
  );
}
