import { NextRequest, NextResponse } from 'next/server';
import { getStakingInfo } from '@/lib/api/staking';

/**
 * GET /api/staking/info
 * Returns staking info (era, bonds, etc.)
 */
export async function GET() {
  try {
    const info = await getStakingInfo();
    return NextResponse.json(info);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
