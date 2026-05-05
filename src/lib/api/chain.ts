// ============================================
// Chain / System Queries — Portaldot
// Modules: system, chain RPC, timestamp
// ============================================

import { getPortaldotApi } from '@/lib/api/client';
import { toHumanPOT } from '@/config/chain';

export interface ChainStats {
  chainName: string;
  specName: string;
  specVersion: number;
  latestBlock: number;
  finalizedBlock: number;
  peers: number;
  timestamp: number; // unix ms
}

export interface BlockInfo {
  number: number;
  hash: string;
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
  extrinsicCount: number;
  timestamp: number;
  author?: string;
}

export interface FeeInfo {
  partialFee: string;
  weight: string;
}

/**
 * Get latest chain statistics
 */
export async function getChainStats(): Promise<ChainStats> {
  const api = await getPortaldotApi();

  const [header, finalizedHash, health] = await Promise.all([
    api.rpc.chain.getHeader(),
    api.rpc.chain.getFinalizedHead(),
    api.rpc.system.health(),
  ]);

  const finalizedHeader = await api.rpc.chain.getHeader(finalizedHash);

  return {
    chainName: api.runtimeChain.toHuman() as string,
    specName: api.runtimeVersion.specName.toString(),
    specVersion: api.runtimeVersion.specVersion.toNumber(),
    latestBlock: header.number.toNumber(),
    finalizedBlock: finalizedHeader.number.toNumber(),
    peers: (health as any).peers.toNumber(),
    timestamp: Date.now(),
  };
}

/**
 * Get block info by block number or hash
 */
export async function getBlockInfo(blockHashOrNumber?: string | number): Promise<BlockInfo> {
  const api = await getPortaldotApi();

  let blockHash: string;
  if (typeof blockHashOrNumber === 'number') {
    const h = await api.rpc.chain.getBlockHash(blockHashOrNumber);
    blockHash = h.toString();
  } else if (blockHashOrNumber) {
    blockHash = blockHashOrNumber;
  } else {
    const h = await api.rpc.chain.getBlockHash();
    blockHash = h.toString();
  }

  const [signedBlock, timestamp] = await Promise.all([
    api.rpc.chain.getBlock(blockHash),
    api.query.timestamp.now.at(blockHash).catch(() => null),
  ]);

  const { block } = signedBlock;
  const { header, extrinsics } = block;

  return {
    number: header.number.toNumber(),
    hash: blockHash,
    parentHash: header.parentHash.toString(),
    stateRoot: header.stateRoot.toString(),
    extrinsicsRoot: header.extrinsicsRoot.toString(),
    extrinsicCount: extrinsics.length,
    timestamp: timestamp ? (timestamp as any).toNumber() : Date.now(),
  };
}

/**
 * Get latest N blocks
 */
export async function getRecentBlocks(count = 10): Promise<BlockInfo[]> {
  const api = await getPortaldotApi();
  const header = await api.rpc.chain.getHeader();
  const latestBlock = header.number.toNumber();

  const blockNumbers = Array.from({ length: count }, (_, i) => latestBlock - i);

  const blocks = await Promise.all(
    blockNumbers.map((n) => getBlockInfo(n).catch(() => null))
  );

  return blocks.filter(Boolean) as BlockInfo[];
}

/**
 * Get transaction fee estimate
 */
export async function getFeeEstimate(
  extrinsicHex: string
): Promise<FeeInfo> {
  const api = await getPortaldotApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const info = await (api.rpc as any).payment.queryInfo(extrinsicHex) as any;
  return {
    partialFee: toHumanPOT(BigInt(info.partialFee.toString())),
    weight: info.weight.toString(),
  };
}

/**
 * Subscribe to new block headers
 */
export async function subscribeToNewBlocks(
  callback: (blockNumber: number, hash: string) => void
): Promise<() => void> {
  const api = await getPortaldotApi();

  const unsub = await api.rpc.chain.subscribeNewHeads((header) => {
    callback(header.number.toNumber(), header.hash.toString());
  });

  return unsub;
}
