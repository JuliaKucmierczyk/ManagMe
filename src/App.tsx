import "./App.css";
import ListOfProjects from "./Pages/ListOfProjects";
import { mockProjects } from "./Models/Project";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stories from "./Pages/Stories";
import AddStory from "./Pages/AddStory";
import AddTask from "./Pages/AddTask";
import ListOfTasks from "./Pages/ListOfTasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOfProjects projects={mockProjects} />} />
        <Route path="/stories/:projectId" element={<Stories />} />
        <Route path="/tasks/:projectId" element={<ListOfTasks />} />
        <Route path="/add-story" element={<AddStory />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
