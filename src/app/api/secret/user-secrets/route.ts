import { NextRequest } from 'next/server';

import getDataFromToken from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/dbConnect';
import SecretModel from '@/model/Secret';

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const user = await getDataFromToken(request); // Get user ID from the token

    const userId = user?._id;

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userSecrets = await SecretModel.find({
      user: userId,
    }).populate('user', 'username email');

    if (!userSecrets || userSecrets.length === 0) {
      return Response.json(
        { error: 'No secrets found for this user' },
        { status: 404 }
      );
    }

    return Response.json(userSecrets, { status: 200 });
  } catch (error) {
    console.error('Error fetching secrets:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
