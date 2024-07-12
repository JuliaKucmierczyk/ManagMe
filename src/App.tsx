import "./App.css";
import ListOfProjects from "./Pages/ListOfProjects";
import { mockProjects } from "./Models/Project";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stories from "./Pages/Stories";
import AddStory from "./Pages/AddStory";
import AddTask from "./Pages/AddTask";
import ListOfTasks from "./Pages/ListOfTasks";
import EditTask from "./Pages/EditTask";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOfProjects projects={mockProjects} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stories/:projectId" element={<Stories />} />
        <Route path="/tasks/:storyId" element={<ListOfTasks />} />
        <Route path="/add-story" element={<AddStory />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:taskId" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// To run the server
// node --loader ts-node/esm Server.ts
