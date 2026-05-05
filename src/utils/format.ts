// ============================================
// Utility Functions — POTRimence
// ============================================

/**
 * Shorten an SS58 address for display
 */
export function shortenAddress(address: string, chars = 6): string {
  if (!address) return '';
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}

/**
 * Shorten a hash (e.g. block hash) for display
 */
export function shortenHash(hash: string, chars = 8): string {
  if (!hash) return '';
  return `${hash.slice(0, chars)}…${hash.slice(-chars)}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  }
}

/**
 * Format a timestamp (ms) to a relative string like "2s ago"
 */
export function timeAgo(timestampMs: number): string {
  const diff = Date.now() - timestampMs;
  if (diff < 1000) return 'just now';
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

/**
 * Format a number with thousand separators
 */
export function formatNumber(n: number | bigint): string {
  return n.toLocaleString();
}

/**
 * Check if a string looks like a valid SS58 address (basic check)
 */
export function isValidAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{47,48}$/.test(address);
}

/**
 * Check if a string looks like a hex hash
 */
export function isHexHash(s: string): boolean {
  return /^0x[0-9a-fA-F]{64}$/.test(s);
}

/**
 * Check if a string is purely numeric (block number)
 */
export function isBlockNumber(s: string): boolean {
  return /^\d+$/.test(s);
}

/**
 * Chunk an array into groups of `size`
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
