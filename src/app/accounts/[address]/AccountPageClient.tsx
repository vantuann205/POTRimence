'use client';

import { useBalance } from '@/hooks/useBalance';
import { PORTALDOT_CONFIG } from '@/config/chain';

interface Props {
  address: string;
}

export function AccountPageClient({ address }: Props) {
  const { data: balance, isLoading, error } = useBalance(address);

  const shortAddr = `${address.slice(0, 8)}…${address.slice(-8)}`;

  return (
    <div className="container section">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>👤</span>
          <h1 style={{ fontSize: '1.5rem' }}>Account</h1>
        </div>
        <code style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: 'var(--color-primary-light)',
          wordBreak: 'break-all',
        }}>
          {address}
        </code>
        <div style={{ marginTop: '0.5rem' }}>
          <span className="badge badge-primary">SS58 Format: {PORTALDOT_CONFIG.SS58_FORMAT}</span>
        </div>
      </div>

      {isLoading && (
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="spinner" />
          <span style={{ color: 'var(--text-muted)' }}>Fetching balance…</span>
        </div>
      )}

      {error && (
        <div className="card" style={{ borderColor: 'var(--color-danger)' }}>
          <p style={{ color: 'var(--color-danger)' }}>Failed to load account: {error.message}</p>
        </div>
      )}

      {balance && (
        <div className="grid-3 stagger animate-fade-in">
          <div className="stat-card">
            <div className="stat-label">Free Balance</div>
            <div className="stat-value" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{balance.free}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Reserved</div>
            <div className="stat-value" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{balance.reserved}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Balance</div>
            <div className="stat-value" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{balance.total}</div>
          </div>
        </div>
      )}
    </div>
  );
}
