import { NextRequest } from 'next/server';

import getDataFromToken from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/dbConnect';
import SecretModel from '@/model/Secret';
import UserModel from '@/model/User';

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { content } = await request.json();
    const user = await getDataFromToken(request); // Get user ID from the token

    const userId = user?._id;

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!content) {
      return Response.json({ error: 'Content is required' }, { status: 400 });
    }

    const currentUser = await UserModel.findById(userId);

    if (!currentUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const newSecret = new SecretModel({
      content,
      user: currentUser._id,
    });

    await newSecret.save();

    return Response.json(
      { success: true, message: 'Secret created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating secret:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
