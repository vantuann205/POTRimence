// ============================================
// Global TypeScript Types — POTRimence
// Portaldot Blockchain Platform
// ============================================

// ---- Chain Types ----
export interface ChainInfo {
  name: string;
  specName: string;
  specVersion: number;
  ss58Format: number;
  tokenSymbol: string;
  tokenDecimals: number;
  wsEndpoint: string;
}

export interface BlockHeader {
  number: number;
  hash: string;
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
}

export interface Block extends BlockHeader {
  extrinsicCount: number;
  timestamp: number;
  author?: string;
  extrinsics?: Extrinsic[];
}

// ---- Extrinsic ----
export interface Extrinsic {
  hash: string;
  blockNumber: number;
  blockHash: string;
  index: number;
  method: string;   // e.g. "balances.transferKeepAlive"
  section: string;
  isSigned: boolean;
  signer?: string;
  success: boolean;
  fee?: string;
  args?: Record<string, unknown>;
}

// ---- Account ----
export interface Account {
  address: string;
  balance: AccountBalance;
  identity?: AccountIdentity;
  nonce: number;
}

export interface AccountBalance {
  free: string;
  reserved: string;
  frozen: string;
  total: string;
  freeRaw: string;
  reservedRaw: string;
  frozenRaw: string;
}

export interface AccountIdentity {
  display?: string;
  legal?: string;
  web?: string;
  email?: string;
  twitter?: string;
  riot?: string;
  verified: boolean;
}

// ---- Staking ----
export interface ValidatorPrefs {
  commission: number; // percentage (e.g. 5 = 5%)
  blocked: boolean;
}

export interface Validator {
  address: string;
  prefs: ValidatorPrefs;
  totalStake: string;
  ownStake: string;
  nominatorCount: number;
  active: boolean;
}

export interface Nominator {
  address: string;
  targets: string[];
  submittedIn: number;
  suppressed: boolean;
}

export interface EraInfo {
  currentEra: number;
  activeEra: number;
  eraStartTimestamp?: number;
}

// ---- Events ----
export interface ChainEvent {
  blockNumber: number;
  eventIndex: number;
  section: string;  // e.g. "balances"
  method: string;   // e.g. "Transfer"
  data: unknown[];
  phase?: string;
}

// ---- Contract ----
export interface Contract {
  address: string;
  codeHash: string;
  storageBytes: number;
  storageItems: number;
  trieId: string;
}

// ---- API Response Wrappers ----
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  timestamp: number;
}

// ---- Wallet ----
export type NetworkStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface WalletAccount {
  address: string;
  name?: string;
  source: string; // extension name
  genesisHash?: string;
}
