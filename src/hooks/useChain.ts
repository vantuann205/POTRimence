'use client';

import { useQuery } from '@tanstack/react-query';
import { getChainStats } from '@/lib/api/chain';

/**
 * Hook: fetch chain stats (block number, peers, etc.)
 */
export function useChainStats() {
  return useQuery({
    queryKey: ['chainStats'],
    queryFn: getChainStats,
    refetchInterval: 6_000, // ~1 block time
    staleTime: 5_000,
  });
}
