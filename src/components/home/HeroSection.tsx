'use client';

import { useConnectionStatus, useLatestBlock, useChainStats } from '@/store/blockchainStore';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const status = useConnectionStatus();
  const latestBlock = useLatestBlock();
  const chainStats = useChainStats();

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className={styles.badge}>
          <span className="live-dot" />
          <span>
            {status === 'connected'
              ? `Connected — Block #${latestBlock.toLocaleString()}`
              : status === 'connecting'
              ? 'Connecting to Portaldot…'
              : 'Offline'}
          </span>
        </div>

        <h1 className={styles.title}>
          Explore the{' '}
          <span className="gradient-text">Portaldot</span>
          <br />
          Blockchain
        </h1>

        <p className={styles.subtitle}>
          Real-time explorer for the Portaldot network — Layer-0 public chain
          with 10,000+ TPS, ZKP privacy, and AI-driven smart contracts.
          Token: <strong style={{ color: 'var(--color-primary-light)' }}>POT</strong> (14 decimals)
        </p>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {chainStats?.latestBlock?.toLocaleString() ?? '—'}
            </span>
            <span className={styles.statLabel}>Latest Block</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {chainStats?.finalizedBlock?.toLocaleString() ?? '—'}
            </span>
            <span className={styles.statLabel}>Finalized</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {chainStats?.peers ?? '—'}
            </span>
            <span className={styles.statLabel}>Peers</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue} style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
              {chainStats?.specVersion ? `v${chainStats.specVersion}` : '—'}
            </span>
            <span className={styles.statLabel}>Runtime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
