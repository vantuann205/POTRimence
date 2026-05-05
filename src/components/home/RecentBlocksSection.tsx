'use client';

import Link from 'next/link';
import { useRecentBlocks } from '@/hooks/useBlocks';

export function RecentBlocksSection() {
  const { data: blocks, isLoading } = useRecentBlocks(8);

  return (
    <section className="section-sm">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem' }}>Recent Blocks</h2>
          <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>Latest blocks on Portaldot mainnet</p>
        </div>
        <Link href="/explorer" className="btn btn-outline btn-sm">
          View All →
        </Link>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div style={{ padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div className="spinner" />
            <span style={{ color: 'var(--text-muted)' }}>Loading blocks…</span>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Block</th>
                <th>Hash</th>
                <th>Extrinsics</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {(blocks ?? []).map((block) => (
                <tr key={block.hash}>
                  <td>
                    <Link
                      href={`/explorer/block/${block.number}`}
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary-light)', fontWeight: 600 }}
                    >
                      #{block.number.toLocaleString()}
                    </Link>
                  </td>
                  <td>
                    <span className="hash" title={block.hash}>
                      {block.hash.slice(0, 10)}…{block.hash.slice(-6)}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-primary">{block.extrinsicCount} txns</span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(block.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
