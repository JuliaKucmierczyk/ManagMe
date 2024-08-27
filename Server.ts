import express from "express";
// import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
// import {JWTService} from "./server/JWTService.ts";
import {UserModel} from "./server/models/user.model.ts"
import { dbconnection } from "./server/Database.ts";
import cors from "cors";
import { ProjectModel } from "./server/models/project.model.ts";
import { TaskModel } from "./server/models/task.model.ts";
import { StoryModel } from "./server/models/story.model.ts";

// Najbardziej we wszystkim pomogło mi to:
// https://medium.com/@codemaniac-sahil/authentication-in-nodejs-and-mongodb-using-jwt-and-cookies-d617bd98cdea
// i to https://medium.com/@kalanamalshan98/building-a-secure-mern-stack-login-and-signup-app-a-step-by-step-guide-093b87da8ad3

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 7000;
dbconnection();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// function authMiddleware(req: Request, res: Response, next: NextFunction) {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access denied" });

//   try {
//     const decoded = JWTService.verifyToken(token);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: "Invalid token" });
//   }
// }

// app.get("/protected", authMiddleware, (req, res) => {
//   res.json({ message: "You have accessed a protected route", user: req.user });
// });

// app.post("/refresh-token", (req, res) => {
//   const { refreshToken } = req.body;
//   try {
//     const decoded = JWTService.verifyRefreshToken(refreshToken);
//     const newAccessToken = JWTService.generateToken(decoded.id);
//     res.json({ accessToken: newAccessToken });
//   } catch (error) {
//     res.status(403).json({ message: "Invalid refresh token" });
//   }
// });

app.post("/login", (req, res) => {
  const {username, password} = req.body;
  UserModel.findOne({username : username})
  .then(user => {
      if(user) {
          if(user.password === password){
            // const accessToken = JWTService.generateToken(user.id);
            // const refreshToken = JWTService.generateRefreshToken(user.id);
            // res.json({ accessToken, refreshToken });
            res.json(user);
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

app.post("/add-project", (req, res) => {
  ProjectModel.create(req.body)
  .then(projects => res.json(projects))
  .catch(err => res.json(err))
})

app.post("/add-story",(req, res) => {
  StoryModel.create(req.body)
  .then(stories => res.json(stories))
  .catch(err => res.json(err))
})

app.post("/add-task",(req, res) => {
  TaskModel.create(req.body)
  .then(tasks => res.json(tasks))
  .catch(err => res.json(err))
})

app.post("/projects", (req, res) => {
  ProjectModel.find(req.body) 
  .then(projects => res.json(projects))
  .catch(err => res.json(err))
  ;});
  
app.post("/stories", (req, res) => {
  StoryModel.find(req.body) 
  .then(stories => res.json(stories))
  .catch(err => res.json(err))
  ;});
    
app.post("/tasks", (req, res) => {
    TaskModel.find(req.body) 
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
    ;});

    // czy to wyzej nie robi tego samego?
    // get all
    app.get("/tasks", (req, res) => {
      TaskModel.find(req.body) 
      .then(tasks => res.json(tasks))
      .catch(err => res.json(err))
      ;});

  app.get("/tasks/:storyId", (req, res) => {
    const storyId = req.params.storyId;
    TaskModel.countDocuments({storyId: storyId})
    .then(number => res.json(number))
    .catch(err => res.json(err))
  ;});

app.post("/edit-task/:taskId",(req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  TaskModel.findOneAndUpdate({id: taskId}, updatedTask)
   .then(task => res.json(task))
   .catch(err => res.json(err))
})

app.get("/edit-task/:taskId",(req, res) => {
  const taskId = req.params.taskId;
  TaskModel.findOne({id: taskId})
  .then(task => res.json(task))
  .catch(err => res.json(err))
})

app.delete("/edit-task/:taskId",(req, res) => {
  const taskId = req.params.taskId;
  TaskModel.deleteOne({id: taskId})
  .then(task => res.json(task))
  .catch(err => res.json(err))
})

