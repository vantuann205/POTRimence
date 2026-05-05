import { NextRequest, NextResponse } from 'next/server';
import { getPortaldotApi } from '@/lib/api/client';
import { toHumanPOT } from '@/config/chain';

/**
 * GET /api/balance/[address]
 * Returns POT balance for a given address
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const api = await getPortaldotApi();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accountInfo = await api.query.balances.account(params.address) as any;

    const free = BigInt(accountInfo.free.toString());
    const reserved = BigInt(accountInfo.reserved.toString());
    const frozen = BigInt(accountInfo.frozen?.toString() || accountInfo.miscFrozen?.toString() || '0');

    return NextResponse.json({
      address: params.address,
      free: toHumanPOT(free),
      reserved: toHumanPOT(reserved),
      frozen: toHumanPOT(frozen),
      total: toHumanPOT(free + reserved),
      freeRaw: free.toString(),
      reservedRaw: reserved.toString(),
      frozenRaw: frozen.toString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
