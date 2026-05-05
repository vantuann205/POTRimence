'use client';

import { useQuery } from '@tanstack/react-query';
import { getStakingInfo, getValidators } from '@/lib/api/staking';

export function useStakingInfo() {
  return useQuery({
    queryKey: ['stakingInfo'],
    queryFn: getStakingInfo,
    refetchInterval: 60_000,
  });
}

export function useValidators() {
  return useQuery({
    queryKey: ['validators'],
    queryFn: getValidators,
    refetchInterval: 60_000,
  });
}
