import type { Metadata } from 'next';
import { AccountPageClient } from './AccountPageClient';

interface Props {
  params: { address: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export function generateMetadata({ params }: Props): Metadata {
  const address = params?.address || 'Account';
  return {
    title: `Account ${address.slice(0, 8)}… — POTRimence`,
    description: `View balance, extrinsics and staking info for Portaldot account ${address}`,
  };
}

export default function AccountPage({ params }: Props) {
  return <AccountPageClient address={params.address} />;
}
