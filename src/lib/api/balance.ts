// ============================================
// Balance Queries — Portaldot Blockchain
// Module: balances
// ============================================

import { getPortaldotApi } from '@/lib/api/client';
import { toHumanPOT } from '@/config/chain';

export interface AccountBalance {
  address: string;
  free: string;
  reserved: string;
  frozen: string;
  total: string;
  freeRaw: bigint;
  reservedRaw: bigint;
  frozenRaw: bigint;
}

export interface TransferEvent {
  from: string;
  to: string;
  amount: string;
  blockNumber: number;
  extrinsicIndex: number;
}

/**
 * Get account balance from balances.account storage
 */
export async function getAccountBalance(address: string): Promise<AccountBalance> {
  const api = await getPortaldotApi();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accountInfo = await api.query.balances.account(address) as any;

  const free = BigInt(accountInfo.free.toString());
  const reserved = BigInt(accountInfo.reserved.toString());
  const frozen = BigInt(accountInfo.frozen?.toString() || accountInfo.miscFrozen?.toString() || '0');
  const total = free + reserved;

  return {
    address,
    free: toHumanPOT(free),
    reserved: toHumanPOT(reserved),
    frozen: toHumanPOT(frozen),
    total: toHumanPOT(total),
    freeRaw: free,
    reservedRaw: reserved,
    frozenRaw: frozen,
  };
}

/**
 * Get total issuance of POT token
 */
export async function getTotalIssuance(): Promise<{ raw: bigint; human: string }> {
  const api = await getPortaldotApi();
  const issuance = await api.query.balances.totalIssuance();
  const raw = BigInt(issuance.toString());
  return { raw, human: toHumanPOT(raw) };
}

/**
 * Query ED (Existential Deposit) constant
 */
export async function getExistentialDeposit(): Promise<string> {
  const api = await getPortaldotApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ed = (api.consts.balances as any).existentialDeposit;
  return toHumanPOT(BigInt(ed.toString()));
}

/**
 * Batch query balances for multiple accounts
 */
export async function getBatchBalances(addresses: string[]): Promise<AccountBalance[]> {
  const api = await getPortaldotApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = await (api.query.balances.account as any).multi(addresses) as any[];

  return results.map((accountInfo, i) => {
    const free = BigInt(accountInfo.free.toString());
    const reserved = BigInt(accountInfo.reserved.toString());
    const frozen = BigInt(accountInfo.frozen?.toString() || accountInfo.miscFrozen?.toString() || '0');
    return {
      address: addresses[i],
      free: toHumanPOT(free),
      reserved: toHumanPOT(reserved),
      frozen: toHumanPOT(frozen),
      total: toHumanPOT(free + reserved),
      freeRaw: free,
      reservedRaw: reserved,
      frozenRaw: frozen,
    };
  });
}
