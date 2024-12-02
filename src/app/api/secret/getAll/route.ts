import dbConnect from '@/lib/dbConnect';
import SecretModel from '@/model/Secret';

export async function GET(request: Request) {
  await dbConnect();

  try {
    // Fetch all secrets from the database
    const allSecrets = await SecretModel.find({}).populate(
      'user',
      'username email'
    );

    if (!allSecrets || allSecrets.length === 0) {
      return Response.json({ error: 'No secrets found' }, { status: 404 });
    }

    return Response.json(allSecrets, { status: 200 });
  } catch (error) {
    console.error('Error fetching secrets:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
