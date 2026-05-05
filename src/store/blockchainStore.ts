// ============================================
// Blockchain Store — Zustand
// Global state for chain connection & wallet
// ============================================

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface ChainStats {
  latestBlock: number;
  finalizedBlock: number;
  peers: number;
  chainName: string;
  specVersion: number;
}

interface BlockchainState {
  // ---- Connection ----
  status: ConnectionStatus;
  error: string | null;
  setStatus: (status: ConnectionStatus) => void;
  setError: (error: string | null) => void;

  // ---- Chain Stats ----
  chainStats: ChainStats | null;
  setChainStats: (stats: ChainStats) => void;

  // ---- Live Block ----
  latestBlock: number;
  setLatestBlock: (block: number) => void;

  // ---- Wallet ----
  accounts: InjectedAccountWithMeta[];
  selectedAccount: InjectedAccountWithMeta | null;
  setAccounts: (accounts: InjectedAccountWithMeta[]) => void;
  setSelectedAccount: (account: InjectedAccountWithMeta | null) => void;

  // ---- UI ----
  isWalletModalOpen: boolean;
  setWalletModalOpen: (open: boolean) => void;
}

export const useBlockchainStore = create<BlockchainState>()(
  devtools(
    subscribeWithSelector((set) => ({
      // Connection
      status: 'disconnected',
      error: null,
      setStatus: (status) => set({ status }),
      setError: (error) => set({ error }),

      // Chain Stats
      chainStats: null,
      setChainStats: (chainStats) => set({ chainStats }),

      // Live Block
      latestBlock: 0,
      setLatestBlock: (latestBlock) => set({ latestBlock }),

      // Wallet
      accounts: [],
      selectedAccount: null,
      setAccounts: (accounts) => set({ accounts }),
      setSelectedAccount: (selectedAccount) => set({ selectedAccount }),

      // UI
      isWalletModalOpen: false,
      setWalletModalOpen: (isWalletModalOpen) => set({ isWalletModalOpen }),
    })),
    { name: 'blockchain-store' }
  )
);

// Selectors
export const useConnectionStatus = () => useBlockchainStore((s) => s.status);
export const useSelectedAccount = () => useBlockchainStore((s) => s.selectedAccount);
export const useLatestBlock = () => useBlockchainStore((s) => s.latestBlock);
export const useChainStats = () => useBlockchainStore((s) => s.chainStats);
