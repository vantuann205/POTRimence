'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useBlockchainStore, useConnectionStatus, useLatestBlock } from '@/store/blockchainStore';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Dashboard' },
  { href: '/explorer', label: 'Explorer' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/staking', label: 'Staking' },
  { href: '/contracts', label: 'Contracts' },
  { href: '/transfer', label: 'Transfer' },
];

export function Navbar() {
  const status = useConnectionStatus();
  const latestBlock = useLatestBlock();
  const { selectedAccount, setWalletModalOpen } = useBlockchainStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const statusColor =
    status === 'connected' ? '#10b981' : status === 'connecting' ? '#f59e0b' : '#ef4444';

  const shortAddr = selectedAccount
    ? `${selectedAccount.address.slice(0, 6)}…${selectedAccount.address.slice(-4)}`
    : null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <span>POT<span className={styles.logoAccent}>Rimence</span></span>
        </Link>

        {/* Desktop nav */}
        <div className={styles.navLinks}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className={styles.right}>
          {/* Chain status */}
          <div className={styles.chainStatus}>
            <span
              className={styles.statusDot}
              style={{ background: statusColor }}
            />
            <span className={styles.chainName}>Portaldot</span>
            {latestBlock > 0 && (
              <span className={styles.blockNum}>#{latestBlock.toLocaleString()}</span>
            )}
          </div>

          {/* Wallet button */}
          <button
            className={`btn btn-primary btn-sm ${styles.walletBtn}`}
            onClick={() => setWalletModalOpen(true)}
          >
            {shortAddr || 'Connect Wallet'}
          </button>

          {/* Mobile toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
