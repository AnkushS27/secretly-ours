// import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    });

    // const decodedToken: any = jwt.verify(token, process.env.NEXT_PUBLIC_NEXTAUTH_SECRET);
    return token ? token : null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getDataFromToken;
