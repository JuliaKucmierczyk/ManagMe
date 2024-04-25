import "./App.css";
import ListOfProjects from "./Pages/ListOfProjects";
import { mockProjects } from "./Models/Project";
import { mockStories } from "./Models/Story";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stories from "./Pages/Stories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOfProjects projects={mockProjects} />} />
        <Route
          path="/stories/:projectId"
          element={<Stories stories={mockStories} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
