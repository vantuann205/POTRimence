import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { ChainStatsSection } from '@/components/home/ChainStatsSection';
import { RecentBlocksSection } from '@/components/home/RecentBlocksSection';
import { QuickSearchSection } from '@/components/home/QuickSearchSection';

export const metadata: Metadata = {
  title: 'POTRimence — Portaldot Blockchain Dashboard',
  description: 'Real-time dashboard for the Portaldot blockchain — explore blocks, accounts, staking and more.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="container">
        <QuickSearchSection />
        <ChainStatsSection />
        <RecentBlocksSection />
      </div>
    </>
  );
}
