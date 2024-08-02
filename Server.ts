import express from "express";
import bodyParser from "body-parser";
import {JWTService} from "./server/JWTService.ts";
import {UserModel} from "./server/models/user.model.ts"
import { dbconnection } from "./server/Database.ts";
import cors from "cors";

// Najbardziej we wszystkim pomogło mi to:
// https://medium.com/@codemaniac-sahil/authentication-in-nodejs-and-mongodb-using-jwt-and-cookies-d617bd98cdea

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 7000;
dbconnection();

app.use(bodyParser.json());


app.post("/login", (req, res) => {
  const {username, password} = req.body;
  UserModel.findOne({username : username})
  .then(user => {
      if(user) {
          if(user.password === password){
              res.json("Success")
          }else{
              res.json("The password is incorrect")
          }
      }else{
          res.json("No record existed")
      }
  })
})

app.post("/register", (req, res) => {
  UserModel.create(req.body)
  .then(users => res.json(users))
  .catch(err => res.json(err))
})


app.listen(3001, () => {
  console.log("server is running")
})

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
