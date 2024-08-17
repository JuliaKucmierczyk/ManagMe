import React, { useEffect, useState } from "react";
import { SelectionService } from "../Services/SelectionService";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Btn, Nav } from "../Styles/StyledComponents";
// import { ProjectService } from "../Services/ProjectService";
import axios from "axios";
import { Project } from "../Models/Project";
import { UserService } from "../Services/UserService";

const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem;
`;

const ProjectsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
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

const ProjectSelection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const handleClickProject = (projectId: string) => {
    SelectionService.setCurrentProjectId(projectId);
    navigate(`/stories/${projectId}`);
  };

  const addProject = () => {
    navigate(`/add-project`);
  };

  const currentId = UserService.getLoggedInUser();
  console.log("current id " + currentId.id);
  useEffect(() => {
    const fetchProjects = async () => {
      await axios
        .post("http://localhost:7000/projects", { userId: currentId.id })
        .then((response) => {
          console.log(response.data);
          setProjects(response.data);
        })
        .catch((err) => console.log(err));
    };

    fetchProjects();
  }, [currentId.id]);

  return (
    <Container>
      <Nav>
        <h2>Select Project</h2>
        <Btn onClick={addProject}>Add Project</Btn>
      </Nav>
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
