import bcrypt from 'bcryptjs';

import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password, role } = await request.json();

    // validation
    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // check if user already exists
    const user = await UserModel.findOne({ email });

    if (user) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    return Response.json(
      {
        success: true,
        message: 'User registered successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}
