import { NextResponse } from 'next/server';
import { getChainStats } from '@/lib/api/chain';

/**
 * GET /api/chain/stats
 * Returns current chain statistics
 */
export async function GET() {
  try {
    const stats = await getChainStats();
    return NextResponse.json(stats);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
