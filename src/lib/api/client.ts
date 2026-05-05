// ============================================
// Portaldot API Client
// WebSocket connection to Portaldot node
// Docs: https://portaldot-dev.readthedocs.io
// ============================================

import { ApiPromise, WsProvider } from '@polkadot/api';
import { PORTALDOT_CONFIG, WS_ENDPOINT } from '@/config/chain';

let _api: ApiPromise | null = null;
let _connecting = false;
let _connectCallbacks: Array<(api: ApiPromise) => void> = [];

/**
 * Get or create the Portaldot API instance (singleton)
 * Connects via WebSocket to wss://mainnet.portaldot.io
 */
export async function getPortaldotApi(): Promise<ApiPromise> {
  if (_api && _api.isConnected) return _api;

  if (_connecting) {
    // Wait for existing connection
    return new Promise((resolve) => {
      _connectCallbacks.push(resolve);
    });
  }

  _connecting = true;

  try {
    const provider = new WsProvider(WS_ENDPOINT, 2500, {}, 30_000);

    _api = await ApiPromise.create({
      provider,
      ss58Format: PORTALDOT_CONFIG.SS58_FORMAT,
      throwOnConnect: false,
    });

    await _api.isReady;

    // Notify waiting callers
    _connectCallbacks.forEach((cb) => cb(_api!));
    _connectCallbacks = [];
    _connecting = false;

    console.log(
      `[Portaldot] Connected to ${WS_ENDPOINT} — Chain: ${_api.runtimeChain.toHuman()} v${_api.runtimeVersion.specVersion.toNumber()}`
    );

    return _api;
  } catch (error) {
    _connecting = false;
    _connectCallbacks = [];
    throw error;
  }
}

/**
 * Disconnect from the node (call on cleanup)
 */
export async function disconnectApi(): Promise<void> {
  if (_api) {
    await _api.disconnect();
    _api = null;
    console.log('[Portaldot] Disconnected');
  }
}
