// ============================================
// ink! Contract Interaction — Portaldot
// Module: contracts
// ============================================

import { getPortaldotApi } from '@/lib/api/client';
import { toHumanPOT } from '@/config/chain';
import type { SubmittableExtrinsic } from '@polkadot/api/types';

export interface ContractCallOptions {
  contractAddress: string;
  abi: Record<string, unknown>;
  method: string;
  args?: unknown[];
  value?: bigint; // POT to attach
  gasLimit?: bigint;
  storageDepositLimit?: bigint;
}

export interface ContractInfo {
  address: string;
  trieId: string;
  codeHash: string;
  storageBytes: number;
  storageItems: number;
  storageByteDeposit: string;
  storageItemDeposit: string;
}

/**
 * Query contract info from storage
 */
export async function getContractInfo(address: string): Promise<ContractInfo | null> {
  const api = await getPortaldotApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const info = await api.query.contracts.contractInfoOf(address) as any;

  if (info.isNone) return null;
  const c = info.unwrap();

  return {
    address,
    trieId: c.trieId.toString(),
    codeHash: c.codeHash.toHex(),
    storageBytes: c.storageBytes.toNumber(),
    storageItems: c.storageItems.toNumber(),
    storageByteDeposit: toHumanPOT(BigInt(c.storageByteDeposit?.toString() || '0')),
    storageItemDeposit: toHumanPOT(BigInt(c.storageItemDeposit?.toString() || '0')),
  };
}

/**
 * Build a contract call extrinsic (for use with wallet signing)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function buildContractCallExtrinsic(
  options: ContractCallOptions
): Promise<any> {
  const api = await getPortaldotApi();

  const { ContractPromise } = await import('@polkadot/api-contract');
  const contract = new ContractPromise(api, options.abi, options.contractAddress);

  const gasLimit = options.gasLimit ?? BigInt(10_000_000_000);

  const tx = contract.tx[options.method](
    {
      value: options.value ?? BigInt(0),
      gasLimit: api.registry.createType('WeightV2', {
        refTime: gasLimit,
        proofSize: BigInt(131_072),
      }),
      storageDepositLimit: options.storageDepositLimit ?? null,
    },
    ...(options.args ?? [])
  );

  return tx;
}

/**
 * Dry-run a contract call (read-only, no state change)
 */
export async function dryRunContractCall(options: ContractCallOptions) {
  const api = await getPortaldotApi();
  const { ContractPromise } = await import('@polkadot/api-contract');
  const contract = new ContractPromise(api, options.abi, options.contractAddress);

  const gasLimit = options.gasLimit ?? BigInt(10_000_000_000);

  const result = await contract.query[options.method](
    options.contractAddress, // origin — just use contract address for reads
    {
      value: options.value ?? BigInt(0),
      gasLimit: api.registry.createType('WeightV2', {
        refTime: gasLimit,
        proofSize: BigInt(131_072),
      }),
      storageDepositLimit: options.storageDepositLimit ?? null,
    },
    ...(options.args ?? [])
  );

  return result;
}
