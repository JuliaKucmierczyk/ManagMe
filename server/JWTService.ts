import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export class JWTService {
  static generateToken(user: { id: string} ) {
    return jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: "1h",
    });
  }

  static generateRefreshToken(user: { id: string }) {
    return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET_KEY as string, { expiresIn: "7d" });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.SECRET_KEY as string);
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.REFRESH_SECRET_KEY as string);
  }
}