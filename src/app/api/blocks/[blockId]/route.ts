import { NextRequest, NextResponse } from 'next/server';
import { getBlockInfo } from '@/lib/api/chain';

/**
 * GET /api/blocks/[blockId]
 * blockId can be a block number (integer) or hash (0x...)
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { blockId: string } }
) {
  try {
    const { blockId } = params;
    const blockHashOrNumber = /^\d+$/.test(blockId) ? parseInt(blockId) : blockId;
    const block = await getBlockInfo(blockHashOrNumber);
    return NextResponse.json(block);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
