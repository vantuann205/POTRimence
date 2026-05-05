'use client';

import { useEffect } from 'react';
import { useBlockchainStore } from '@/store/blockchainStore';
import { getChainStats, subscribeToNewBlocks } from '@/lib/api/chain';

/**
 * BlockchainProvider — initializes WebSocket connection
 * and subscribes to new block headers on mount.
 */
export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const { setStatus, setError, setChainStats, setLatestBlock } = useBlockchainStore();

  useEffect(() => {
    let unsub: (() => void) | null = null;

    async function init() {
      setStatus('connecting');
      try {
        const stats = await getChainStats();
        setChainStats({
          latestBlock: stats.latestBlock,
          finalizedBlock: stats.finalizedBlock,
          peers: stats.peers,
          chainName: stats.chainName,
          specVersion: stats.specVersion,
        });
        setLatestBlock(stats.latestBlock);
        setStatus('connected');

        // Subscribe to new blocks
        unsub = await subscribeToNewBlocks((blockNumber) => {
          setLatestBlock(blockNumber);
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Connection failed';
        setError(msg);
        setStatus('error');
        console.error('[BlockchainProvider]', msg);
      }
    }

    init();

    return () => {
      if (unsub) unsub();
    };
  }, [setStatus, setError, setChainStats, setLatestBlock]);

  return <>{children}</>;
}
