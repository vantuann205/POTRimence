import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Block Explorer — POTRimence',
  description: 'Browse blocks, extrinsics, and events on the Portaldot blockchain.',
};

export default function ExplorerPage() {
  return (
    <div className="container section">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Block Explorer</h1>
        <p style={{ marginTop: '0.5rem' }}>Browse the Portaldot blockchain</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <Link href="/explorer/blocks" className="card" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⬛</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Blocks</h3>
          <p style={{ fontSize: '0.875rem' }}>Browse all blocks and their extrinsics</p>
        </Link>
        <Link href="/explorer/extrinsics" className="card" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📋</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Extrinsics</h3>
          <p style={{ fontSize: '0.875rem' }}>All signed transactions and calls</p>
        </Link>
      </div>
    </div>
  );
}
