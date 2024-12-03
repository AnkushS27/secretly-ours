import { NextRequest } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import SecretModel from '@/model/Secret';
import UserModel from '@/model/User';

export async function GET(request: NextRequest) {
  await dbConnect();
  const users = await UserModel.find(); // Fetch all users
  return Response.json(users);
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const { userId, newRole } = await request.json();
  const user = await UserModel.findById(userId);
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }
  user.role = newRole;
  await user.save();
  return Response.json({ success: true }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const { userId } = await request.json();

  // Fetch the user by ID
  const user = await UserModel.findById(userId);
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  // Delete the user's secrets before deleting the user
  await SecretModel.deleteMany({ user: userId }); // Assuming `user` is the field in the secrets model referring to the user

  // Now delete the user
  await user.deleteOne();

  return Response.json({ success: true }, { status: 200 });
}
