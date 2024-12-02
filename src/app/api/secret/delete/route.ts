// pages/api/secret/delete.ts
import { NextRequest } from 'next/server';

import getDataFromToken from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/dbConnect';
import SecretModel from '@/model/Secret';
import UserModel from '@/model/User';

export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    const { secretId } = await request.json(); // Extract the secretId from the request body

    const user = await getDataFromToken(request); // Get user ID from the token

    const userId = user?._id;

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!secretId) {
      return Response.json({ error: 'Secret ID is required' }, { status: 400 });
    }

    const secret = await SecretModel.findById(secretId);
    const currentUser = (await UserModel.findById(userId)) as any;

    if (!secret) {
      return Response.json({ error: 'Secret not found' }, { status: 404 });
    }

    if (!currentUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Admin/moderator can delete any secret
    if (currentUser.role === 'admin' || currentUser.role === 'moderator') {
      await secret.deleteOne();
      return Response.json(
        { success: true, message: 'Secret deleted successfully' },
        { status: 200 }
      );
    }

    // User can only delete their own secrets
    if (secret.user.toString() === currentUser._id.toString()) {
      await secret.deleteOne();
      return Response.json(
        { success: true, message: 'Secret deleted successfully' },
        { status: 200 }
      );
    }

    return Response.json(
      { error: 'You are not authorized to delete this secret' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error deleting secret:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
