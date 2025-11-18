import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "@/models/User";
export type userType = {
  _id: string;
  profile:string
  name: string ;
  email:string;
  role:string

  
  
};
export type DecodedToken = {
  userId: string;
  email: string;
  name?: string;
  iat: number;
  exp: number;
} & JwtPayload;
const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpires = process.env.JWT_EXPIRES;
export const signToken = async (user: IUser) => {
  if (jwtSecret && jwtExpires)
    return jwt.sign({ userId: user._id, role:user.role  }, jwtSecret, {
      // expiresIn: Number(jwtExpires)*60*60*24,
      expiresIn: '30d',
    });
  else {
    throw new Error("JWT_EXPIRES is not defined in environment variables");
  }
};




export async function getTokenFromRequest(req: NextRequest): Promise<DecodedToken | null> {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

