// ============================================
// Staking Queries — Portaldot Blockchain
// Module: staking
// ============================================

import { getPortaldotApi } from '@/lib/api/client';
import { toHumanPOT } from '@/config/chain';

export interface ValidatorInfo {
  address: string;
  commission: string; // percentage
  blocked: boolean;
  totalStake: string;
  ownStake: string;
  nominatorCount: number;
}

export interface NominatorInfo {
  address: string;
  targets: string[];
  submittedIn: number;
  suppressed: boolean;
  totalStaked: string;
}

export interface StakingInfo {
  currentEra: number;
  activeEra: number;
  minNominatorBond: string;
  minValidatorBond: string;
  maxNominatorsCount: number | null;
  maxValidatorsCount: number | null;
}

/**
 * Get current staking era and global info
 */
export async function getStakingInfo(): Promise<StakingInfo> {
  const api = await getPortaldotApi();

  const [currentEra, activeEra, minNominatorBond, minValidatorBond] = await Promise.all([
    api.query.staking.currentEra(),
    api.query.staking.activeEra(),
    api.query.staking.minNominatorBond(),
    api.query.staking.minValidatorBond(),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeEraObj = (activeEra as any).isSome ? (activeEra as any).unwrap() : null;

  return {
    currentEra: (currentEra as any).isSome ? (currentEra as any).unwrap().toNumber() : 0,
    activeEra: activeEraObj ? activeEraObj.index.toNumber() : 0,
    minNominatorBond: toHumanPOT(BigInt(minNominatorBond.toString())),
    minValidatorBond: toHumanPOT(BigInt(minValidatorBond.toString())),
    maxNominatorsCount: null,
    maxValidatorsCount: null,
  };
}

/**
 * Get validators (elected set)
 */
export async function getValidators(): Promise<string[]> {
  const api = await getPortaldotApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validators = await api.query.session.validators() as any;
  return validators.map((v: any) => v.toString());
}

/**
 * Get nominator info for an address
 */
export async function getNominatorInfo(address: string): Promise<NominatorInfo | null> {
  const api = await getPortaldotApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nominators = await api.query.staking.nominators(address) as any;

  if (nominators.isNone) return null;

  const info = nominators.unwrap();
  return {
    address,
    targets: info.targets.map((t: any) => t.toString()),
    submittedIn: info.submittedIn.toNumber(),
    suppressed: info.suppressed.isTrue,
    totalStaked: '—', // would need ledger query
  };
}

/**
 * Get staking ledger for a stash account
 */
export async function getStakingLedger(controller: string) {
  const api = await getPortaldotApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ledger = await api.query.staking.ledger(controller) as any;
  if (ledger.isNone) return null;
  const l = ledger.unwrap();
  return {
    stash: l.stash.toString(),
    total: toHumanPOT(BigInt(l.total.toString())),
    active: toHumanPOT(BigInt(l.active.toString())),
    unlocking: l.unlocking.map((u: any) => ({
      value: toHumanPOT(BigInt(u.value.toString())),
      era: u.era.toNumber(),
    })),
  };
}
