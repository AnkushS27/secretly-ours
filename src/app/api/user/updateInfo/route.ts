import { NextRequest } from 'next/server';

import getDataFromToken from '@/helpers/getDataFromToken';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { username, email } = await request.json();
    const user = await getDataFromToken(request); // Get user ID from the token

    const userId = user?._id;

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!username && !email) {
      return Response.json({ error: 'No fields to update' }, { status: 400 });
    }

    const currentUser = await UserModel.findById(userId);

    if (!currentUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Update only the fields that were passed in the request
    currentUser.username = username || currentUser.username;
    currentUser.email = email || currentUser.email;

    await currentUser.save();

    return Response.json(
      { success: true, message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
