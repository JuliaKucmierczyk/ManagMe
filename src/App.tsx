import "./App.css";
import ListOfProjects from "./Pages/ListOfProjects";
import { mockProjects } from "./Models/Project";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stories from "./Pages/Stories";
import AddStory from "./Pages/AddStory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOfProjects projects={mockProjects} />} />
        <Route path="/stories/:projectId" element={<Stories />} />
        <Route path="/add-story" element={<AddStory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
