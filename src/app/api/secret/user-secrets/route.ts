import { NextRequest, NextResponse } from 'next/server';

import getDataFromToken from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/dbConnect';
import SecretModel from '@/model/Secret';

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const user = await getDataFromToken(request); // Get user ID from the token

    const userId = user?._id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find all secrets for the user, can also add a limit or pagination if needed
    const userSecrets = await SecretModel.find({ user: userId });

    return NextResponse.json(userSecrets, { status: 200 });
  } catch (error) {
    console.error('Error fetching secrets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
