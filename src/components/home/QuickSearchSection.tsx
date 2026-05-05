'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function QuickSearchSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    // Route based on input type
    if (/^\d+$/.test(q)) {
      router.push(`/explorer/block/${q}`);
    } else if (q.startsWith('0x') && q.length === 66) {
      router.push(`/explorer/block/hash/${q}`);
    } else if (q.startsWith('0x') && q.length > 32) {
      router.push(`/explorer/extrinsic/${q}`);
    } else {
      // Try as address
      router.push(`/accounts/${q}`);
    }
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', maxWidth: 700 }}>
        <input
          className="input"
          type="text"
          placeholder="Search by block number, hash, or account address…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1 }}
          id="search-input"
        />
        <button type="submit" className="btn btn-primary" id="search-btn">
          Search
        </button>
      </form>
      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        Enter a block number, block hash (0x…), transaction hash, or SS58 account address
      </p>
    </div>
  );
}
