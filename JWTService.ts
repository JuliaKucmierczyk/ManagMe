import jwt from "jsonwebtoken";

const SECRET_KEY = "your_jwt_secret_key";
const REFRESH_SECRET_KEY = "your_refresh_jwt_secret_key";

interface JwtPayload {
  id: string;
  role: "Admin" | "Devops" | "Developer";
}

export class JWTService {
  static generateToken(user: { id: string; role: string }) {
    return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
  }

  static generateRefreshToken(user: { id: string }) {
    return jwt.sign({ id: user.id }, REFRESH_SECRET_KEY, { expiresIn: "7d" });
  }

  static verifyToken(token: string): JwtPayload {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  }

  static verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, REFRESH_SECRET_KEY) as JwtPayload;
  }
}