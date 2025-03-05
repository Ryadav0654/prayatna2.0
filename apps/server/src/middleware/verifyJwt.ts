import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req: any, res: any, next: any) => {
    try {
      const token = req.cookies?.accessToken;
  
      if (!token) {
        return res.status(401).json({ message: "Unauthorized request" });
      }
  
      const decodedToken :any= jwt.decode(token)
      const user = await prismaClient.user.findUnique({
        where: { id: decodedToken.id },
        select: { id: true, name: true, email: true, role: true }, // Exclude password & refreshToken
      });
      console.log(user);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid Access Token" });
      }
  
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid access token" });
    }
  };