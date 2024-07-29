import React from "react";
import { Project } from "../Models/Project";
import { SelectionService } from "../Services/SelectionService";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem;
`;

const ProjectsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  display: inline-block;
  font-size: 1.1rem;
  color: #454545;
  transition: color 0.2s ease-in-out;
`;

const ProjectElement = styled.div`
  color: #111111;
  width: 20rem;
  margin-top: 20px;
  margin: 1.1rem;

  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

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
    <Container>
      <h2>Select Project</h2>
      <ProjectsList>
        {projects.map((project) => (
          <Li key={project.id} onClick={() => handleClickProject(project.id)}>
            <ProjectElement>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </ProjectElement>
          </Li>
        ))}
      </ProjectsList>
    </Container>
  );
};

export default ProjectSelection;
