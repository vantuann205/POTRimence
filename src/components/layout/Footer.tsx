import Link from 'next/link';

const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      { href: '/explorer', label: 'Block Explorer' },
      { href: '/accounts', label: 'Accounts' },
      { href: '/staking', label: 'Staking' },
      { href: '/contracts', label: 'Contracts' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: 'https://portaldot-dev.readthedocs.io/en/latest', label: 'Developer Docs', external: true },
      { href: 'https://portaldot-dev.readthedocs.io/en/latest/chain-info.html', label: 'Chain Info', external: true },
      { href: 'https://portaldot-dev.readthedocs.io/en/latest/module-interface/index.html', label: 'Module Interface', external: true },
    ],
  },
  {
    title: 'Network',
    links: [
      { href: '/transfer', label: 'Transfer POT' },
      { href: '/treasury', label: 'Treasury' },
      { href: '/governance', label: 'Governance' },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-default)',
      background: 'var(--bg-surface)',
      padding: '3rem 0 2rem',
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>⬡</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>
                POT<span className="gradient-text">Rimence</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', maxWidth: '260px', lineHeight: 1.7 }}>
              A next-gen blockchain explorer & DApp platform for the Portaldot network — Layer-0 public chain with 10,000+ TPS.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <span className="badge badge-primary">Mainnet</span>
              <span className="badge badge-success">Live</span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                fontWeight: 600,
                marginBottom: '0.875rem',
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                    >
                      {l.label}
                      {l.external && <span style={{ marginLeft: '0.25rem', opacity: 0.5 }}>↗</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} POTRimence. Built on{' '}
            <a href="https://portaldot.io" target="_blank" rel="noopener noreferrer">
              Portaldot
            </a>
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            wss://mainnet.portaldot.io
          </p>
        </div>
      </div>
    </footer>
  );
}
