'use client';

import { useQuery } from '@tanstack/react-query';
import { getRecentBlocks, getBlockInfo } from '@/lib/api/chain';

export function useRecentBlocks(count = 10) {
  return useQuery({
    queryKey: ['recentBlocks', count],
    queryFn: () => getRecentBlocks(count),
    refetchInterval: 6_000,
  });
}

export function useBlockInfo(blockHashOrNumber?: string | number) {
  return useQuery({
    queryKey: ['block', blockHashOrNumber],
    queryFn: () => getBlockInfo(blockHashOrNumber),
    enabled: blockHashOrNumber !== undefined,
    staleTime: 60_000, // blocks don't change
  });
}
