import React from "react";
import { Project } from "../Models/Project";
import { SelectionService } from "../Services/SelectionService";
import { useNavigate } from "react-router-dom";

interface Props {
  projects: Project[];
}

const ProjectSelection: React.FC<Props> = ({ projects }) => {
  const navigate = useNavigate();

  const handleClickProject = (projectId: string) => {
    SelectionService.setCurrentProjectId(projectId);
    navigate(`/stories/${projectId}`);
  };

  return (
    <div className="container">
      <h2>Select Project</h2>
      <ul className="list-of-projects">
        {projects.map((project) => (
          <li key={project.id} onClick={() => handleClickProject(project.id)}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSelection;
