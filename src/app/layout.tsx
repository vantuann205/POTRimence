import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'POTRimence — Portaldot Blockchain Explorer',
    template: '%s | POTRimence',
  },
  description:
    'POTRimence is a next-generation blockchain explorer and DApp platform for the Portaldot network — Layer-0 public chain with 10,000+ TPS.',
  keywords: ['Portaldot', 'POT', 'blockchain', 'explorer', 'DeFi', 'Web3', 'substrate'],
  authors: [{ name: 'POTRimence Team' }],
  openGraph: {
    title: 'POTRimence — Portaldot Blockchain Explorer',
    description: 'Explore the Portaldot blockchain — balances, staking, contracts and more.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
