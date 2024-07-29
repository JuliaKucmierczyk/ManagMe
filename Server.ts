import express from "express";
import bodyParser from "body-parser";
import {JWTService} from "./server/JWTService.ts";
import {mockUsers} from "./src/Models/User.ts";
import { dbconnection } from "./server/Database.ts";

// Najbardziej we wszystkim pomogło mi to:
// https://medium.com/@codemaniac-sahil/authentication-in-nodejs-and-mongodb-using-jwt-and-cookies-d617bd98cdea

const app = express();
const PORT = 5184;
dbconnection();

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(username + " " + password);
  console.log(req.body);
  const user = mockUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = JWTService.generateToken({ id: user.id, role: user.role });
    const refreshToken = JWTService.generateRefreshToken({ id: user.id });

    res.json({ token, refreshToken });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ error: "Refresh token is required" });
  }

  try {
    const decoded = JWTService.verifyRefreshToken(refreshToken);
    const newToken = JWTService.generateToken({
      id: decoded.id,
      role: decoded.role,
    });

    res.json({ token: newToken });
  } catch (error) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});