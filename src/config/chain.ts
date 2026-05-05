// ============================================
// Portaldot Blockchain Configuration
// Chain: Portaldot (Substrate-based Layer-0)
// Docs: https://portaldot-dev.readthedocs.io
// ============================================

export const PORTALDOT_CONFIG = {
  // Network connection
  WS_ENDPOINT: process.env.NEXT_PUBLIC_PORTALDOT_WS || 'wss://mainnet.portaldot.io',

  // Chain info
  SS58_FORMAT: Number(process.env.NEXT_PUBLIC_PORTALDOT_SS58_FORMAT) || 42,
  CHAIN_NAME: process.env.NEXT_PUBLIC_PORTALDOT_CHAIN_NAME || 'Portaldot',
  NETWORK: (process.env.NEXT_PUBLIC_NETWORK as 'mainnet' | 'testnet') || 'mainnet',

  // Token info (POT)
  TOKEN: {
    NAME: process.env.NEXT_PUBLIC_PORTALDOT_TOKEN_NAME || 'POT',
    SYMBOL: 'POT',
    DECIMALS: Number(process.env.NEXT_PUBLIC_PORTALDOT_TOKEN_DECIMALS) || 14,
  },

  // Module constants
  MODULES: {
    BALANCES: 'balances',
    STAKING: 'staking',
    SYSTEM: 'system',
    CONTRACTS: 'contracts',
    ASSETS: 'assets',
    IDENTITY: 'identity',
    MULTISIG: 'multisig',
    PROXY: 'proxy',
    BOUNTIES: 'bounties',
    TREASURY: 'treasury',
    VESTING: 'vesting',
    LOTTERY: 'lottery',
    INDICES: 'indices',
    SESSION: 'session',
  },

  // Explorer links
  SUBSCAN_URL: 'https://portaldot.subscan.io',
} as const;

// Network websocket endpoints
export const NETWORK_ENDPOINTS = {
  mainnet: 'wss://mainnet.portaldot.io',
  testnet: 'ws://127.0.0.1:9944', // local dev node
} as const;

// Re-export current endpoint
export const WS_ENDPOINT = NETWORK_ENDPOINTS[PORTALDOT_CONFIG.NETWORK];

// POT token helpers
export const TOKEN_DECIMALS = PORTALDOT_CONFIG.TOKEN.DECIMALS;
export const TOKEN_SYMBOL = PORTALDOT_CONFIG.TOKEN.SYMBOL;

/**
 * Convert raw chain value (planck) to human-readable POT
 */
export function toHumanPOT(raw: bigint | string | number): string {
  const value = BigInt(raw.toString());
  const divisor = BigInt(10 ** TOKEN_DECIMALS);
  const whole = value / divisor;
  const fraction = value % divisor;
  const fractionStr = fraction.toString().padStart(TOKEN_DECIMALS, '0').slice(0, 4);
  return `${whole.toLocaleString()}.${fractionStr} ${TOKEN_SYMBOL}`;
}

/**
 * Convert POT amount to raw planck
 */
export function toPlanck(pot: number | string): bigint {
  const [whole, fraction = ''] = pot.toString().split('.');
  const fractionPadded = fraction.padEnd(TOKEN_DECIMALS, '0').slice(0, TOKEN_DECIMALS);
  return BigInt(whole) * BigInt(10 ** TOKEN_DECIMALS) + BigInt(fractionPadded);
}
