// pages/api/secret/[id].ts
import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import SecretModel from '@/model/Secret';

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const secretId = request.nextUrl.searchParams.get('id');

    if (!secretId) {
      return NextResponse.json(
        { error: 'Secret ID is required' },
        { status: 400 }
      );
    }

    const secret = await SecretModel.findById(secretId);

    if (!secret) {
      return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
    }

    return NextResponse.json(secret, { status: 200 });
  } catch (error) {
    console.error('Error fetching secret:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
