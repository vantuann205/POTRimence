import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contracts — POTRimence',
  description: 'Interact with ink! smart contracts on the Portaldot blockchain.',
};

export default function ContractsPage() {
  return (
    <div className="container section">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Smart Contracts</h1>
        <p style={{ marginTop: '0.5rem' }}>
          Portaldot supports ink! smart contracts. Deploy, query, and interact with contracts on-chain.
        </p>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <h3 style={{ marginBottom: '1rem' }}>Query Contract Info</h3>
        <form>
          <input
            className="input"
            type="text"
            placeholder="Contract address (SS58 format)…"
            style={{ marginBottom: '0.75rem' }}
          />
          <button type="submit" className="btn btn-primary">
            Lookup Contract
          </button>
        </form>
      </div>
    </div>
  );
}
