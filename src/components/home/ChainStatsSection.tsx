'use client';

import { useChainStats } from '@/hooks/useChain';
import { useStakingInfo } from '@/hooks/useStaking';
import { useTotalIssuance } from '@/hooks/useBalance';

interface StatCardProps {
  label: string;
  value: string | number | undefined;
  sub?: string;
  icon: string;
  accentColor?: string;
}

function StatCard({ label, value, sub, icon, accentColor = 'var(--color-primary)' }: StatCardProps) {
  return (
    <div className="stat-card animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span style={{
          fontSize: '1.5rem',
          background: `${accentColor}20`,
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-md)',
        }}>
          {icon}
        </span>
      </div>
      <div className="stat-value">{value ?? '—'}</div>
      <div className="stat-label">{label}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{sub}</div>}
    </div>
  );
}

export function ChainStatsSection() {
  const { data: chainStats } = useChainStats();
  const { data: stakingInfo } = useStakingInfo();
  const { data: issuance } = useTotalIssuance();

  return (
    <section className="section-sm">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Chain Overview</h2>
        <p style={{ marginTop: '0.25rem' }}>Real-time Portaldot network statistics</p>
      </div>
      <div className="grid-4 stagger">
        <StatCard
          icon="⬛"
          label="Latest Block"
          value={chainStats?.latestBlock?.toLocaleString()}
          sub={`Finalized: #${chainStats?.finalizedBlock?.toLocaleString() ?? '—'}`}
          accentColor="var(--color-primary)"
        />
        <StatCard
          icon="🌐"
          label="Network Peers"
          value={chainStats?.peers}
          sub={chainStats?.chainName}
          accentColor="var(--color-accent)"
        />
        <StatCard
          icon="🔗"
          label="Runtime Version"
          value={chainStats?.specVersion ? `v${chainStats.specVersion}` : '—'}
          sub={chainStats?.specName}
          accentColor="var(--color-success)"
        />
        <StatCard
          icon="💎"
          label="Total Issuance"
          value={issuance?.human}
          sub={`Era: ${stakingInfo?.currentEra ?? '—'}`}
          accentColor="var(--color-warning)"
        />
      </div>

      {/* Staking quick info */}
      {stakingInfo && (
        <div style={{
          marginTop: '1.5rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Current Era</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{stakingInfo.currentEra}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Min Nominator Bond</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{stakingInfo.minNominatorBond}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Min Validator Bond</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{stakingInfo.minValidatorBond}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Active Era</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{stakingInfo.activeEra}</div>
          </div>
        </div>
      )}
    </section>
  );
}
