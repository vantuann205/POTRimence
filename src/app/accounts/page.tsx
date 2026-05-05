import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accounts — POTRimence',
  description: 'Search and explore accounts on the Portaldot blockchain.',
};

export default function AccountsPage() {
  return (
    <div className="container section">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Accounts</h1>
        <p style={{ marginTop: '0.5rem' }}>
          Search any Portaldot account by its SS58 address to view balances and activity.
        </p>
      </div>
      <div className="card" style={{ maxWidth: 600 }}>
        <h3 style={{ marginBottom: '1rem' }}>Look up an Account</h3>
        <form action="/accounts/[address]">
          <input
            name="address"
            className="input"
            type="text"
            placeholder="5F… SS58 address"
            style={{ marginBottom: '0.75rem' }}
            required
          />
          <button type="submit" className="btn btn-primary">
            Search Account
          </button>
        </form>
      </div>
    </div>
  );
}
