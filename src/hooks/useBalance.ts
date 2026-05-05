'use client';

import { useQuery } from '@tanstack/react-query';
import { getAccountBalance, getBatchBalances, getTotalIssuance } from '@/lib/api/balance';

/**
 * Hook: fetch single account balance
 */
export function useBalance(address: string | null) {
  return useQuery({
    queryKey: ['balance', address],
    queryFn: () => getAccountBalance(address!),
    enabled: !!address,
    refetchInterval: 15_000, // refresh every 15s
    staleTime: 10_000,
  });
}

/**
 * Hook: fetch total POT issuance
 */
export function useTotalIssuance() {
  return useQuery({
    queryKey: ['totalIssuance'],
    queryFn: getTotalIssuance,
    refetchInterval: 60_000, // 1min
  });
}

/**
 * Hook: batch balance queries
 */
export function useBatchBalances(addresses: string[]) {
  return useQuery({
    queryKey: ['batchBalances', addresses],
    queryFn: () => getBatchBalances(addresses),
    enabled: addresses.length > 0,
    refetchInterval: 30_000,
  });
}
