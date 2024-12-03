import { NextRequest } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import SecretModel from '@/model/Secret';

export async function GET(request: NextRequest) {
  await dbConnect();
  const secrets = await SecretModel.find(); // Fetch all secrets
  return Response.json(secrets);
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const { secretId } = await request.json();
  const secret = await SecretModel.findById(secretId);
  if (!secret) {
    return Response.json({ error: 'Secret not found' }, { status: 404 });
  }
  await secret.deleteOne();
  return Response.json({ success: true }, { status: 200 });
}
