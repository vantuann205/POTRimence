import type { Metadata } from 'next';
import { AccountPageClient } from './AccountPageClient';

interface Props {
  params: { address: string };
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Account ${params.address.slice(0, 8)}… — POTRimence`,
    description: `View balance, extrinsics and staking info for Portaldot account ${params.address}`,
  };
}

export default function AccountPage({ params }: Props) {
  return <AccountPageClient address={params.address} />;
}
