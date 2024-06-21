import express from "express";
// import jwt from "jsonwebtoken";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import User from "./server/models/user.model";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ManagMe");

// const tokenSecret = process.env.TOKEN_SECRET as string;
// let refreshToken: string;

app.get("/hello", (_req, res) => {
  res.send("Hello World - simple api with JWT!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) {
      return { status: 'error', error: 'Invalid login' }
    }
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

// app.post("/token", function (req, res) {
//   const expTime = req.body.exp || 60;
//   const token = generateToken(+expTime);
//   refreshToken = generateToken(60 * 60);
//   res.status(200).send({ token, refreshToken });
// });
// app.post("/refreshToken", function (req, res) {
//   const refreshTokenFromPost = req.body.refreshToken;
//   if (refreshToken !== refreshTokenFromPost) {
//     res.status(400).send("Bad refresh token!");
//   }
//   const expTime = req.headers.exp || 60;
//   const token = generateToken(+expTime);
//   refreshToken = generateToken(60 * 60);
//   setTimeout(() => {
//     res.status(200).send({ token, refreshToken });
//   }, 3000);
// });
// app.get("/protected/:id/:delay?", verifyToken, (req, res) => {
//   const id = req.params.id;
//   const delay = req.params.delay ? +req.params.delay : 1000;
//   setTimeout(() => {
//     res.status(200).send(`{"message": "protected endpoint ${id}"}`);
//   }, delay);
// });

// const users = [
//   { username: "Julia", password: "start" },
//   { username: "admin", password: "111" },
//   { username: "username", password: "password" },
// ];

// // Login endpoint
// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;

//   console.log(username);
//   console.log(password);
//   try {
//     const user = users.find((u) => u.username === username);

//     if (!user) {
//       return res.status(401).send("Invalid username!");
//     }

//     if (password !== user.password) {
//       return res.status(401).send("Invalid password");
//     }

//     const accessToken = jwt.sign({ username }, tokenSecret, {
//       expiresIn: "15m",
//     });
//     refreshToken = jwt.sign({ username }, tokenSecret, { expiresIn: "1d" });

//     res.status(200).send({ accessToken, refreshToken });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error"); // Generic error for unexpected issues
//   }
// });

// function generateToken(expirationInSeconds: number) {
//   const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
//   const token = jwt.sign({ exp, foo: "bar" }, tokenSecret, {
//     algorithm: "HS256",
//   });
//   return token;
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function verifyToken(req: any, res: any, next: any) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader?.split(" ")[1];

//   if (!token) return res.sendStatus(403);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   jwt.verify(token, tokenSecret, (err: any, user: any) => {
//     if (err) {
//       console.log(err);
//       return res.status(401).send(err.message);
//     }
//     req.user = user;
//     next();
//   });
// }
