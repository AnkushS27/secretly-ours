// pages/api/secret/edit.ts
import { NextRequest, NextResponse } from 'next/server';

import getDataFromToken from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/dbConnect';
import SecretModel from '@/model/Secret';
import UserModel from '@/model/User';

export async function PUT(request: NextRequest) {
  await dbConnect();

  try {
    // Extract the secretId and new content from the request body
    const { secretId, content } = await request.json();

    const user = await getDataFromToken(request); // Get user data from token
    const userId = user?._id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!secretId || !content) {
      return NextResponse.json(
        { error: 'Secret ID and content are required' },
        { status: 400 }
      );
    }

    const secret = await SecretModel.findById(secretId);
    const currentUser = await UserModel.findById(userId);

    if (!secret) {
      return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
    }

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Admin and moderator can edit any secret
    if (currentUser.role === 'admin' || currentUser.role === 'moderator') {
      secret.content = content;
      await secret.save();
      return NextResponse.json(
        { success: true, message: 'Secret updated successfully' },
        { status: 200 }
      );
    }

    // User can only edit their own secrets
    if (secret.user.toString() === currentUser.id.toString()) {
      secret.content = content;
      await secret.save();
      return NextResponse.json(
        { success: true, message: 'Secret updated successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'You are not authorized to edit this secret' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error editing secret:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
