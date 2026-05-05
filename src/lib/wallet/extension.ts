// ============================================
// Polkadot Extension Wallet Integration
// Docs: https://portaldot-dev.readthedocs.io
// ============================================

import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { PORTALDOT_CONFIG } from '@/config/chain';

export type { InjectedAccountWithMeta };

/**
 * Check if Polkadot{.js} extension is installed
 */
export function isExtensionInstalled(): boolean {
  return typeof window !== 'undefined' && !!(window as Window & { injectedWeb3?: Record<string, unknown> }).injectedWeb3?.['polkadot-js'];
}

/**
 * Enable the Polkadot extension and get accounts
 * Returns list of accounts in ss58 format for Portaldot
 */
export async function connectWallet(
  appName = PORTALDOT_CONFIG.CHAIN_NAME
): Promise<InjectedAccountWithMeta[]> {
  const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');

  const extensions = await web3Enable(appName);
  if (extensions.length === 0) {
    throw new Error(
      'No Polkadot extension found. Please install the Polkadot{.js} extension.'
    );
  }

  const accounts = await web3Accounts({
    ss58Format: PORTALDOT_CONFIG.SS58_FORMAT,
  });

  if (accounts.length === 0) {
    throw new Error(
      'No accounts found in Polkadot extension. Please create or import an account.'
    );
  }

  return accounts;
}

/**
 * Sign and submit an extrinsic using extension wallet
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signAndSend(
  extrinsic: any,
  senderAddress: string,
  statusCallback: (status: { type: string; hash?: string }) => void
): Promise<string> {
  const { web3FromAddress } = await import('@polkadot/extension-dapp');
  const injected = await web3FromAddress(senderAddress);

  return new Promise((resolve, reject) => {
    (extrinsic as any)
      .signAndSend(
        senderAddress,
        { signer: injected.signer },
        ({ status, txHash, dispatchError }: any) => {
          statusCallback({ type: status.type, hash: txHash?.toString() });

          if (status.isFinalized) {
            if (dispatchError) {
              reject(new Error(`Transaction failed: ${dispatchError.toString()}`));
            } else {
              resolve(txHash.toString());
            }
          }
        }
      )
      .catch(reject);
  });
}
