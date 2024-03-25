import { ApiService } from '../API/ApiService';
import { Project } from '../Models/Project';

export class ProjectService {
  
  static getAllProjects(): Project[] {
    return ApiService.getData('projects') || [];
  }

  static getProjectById(id: string): Project | null {
    const projects = this.getAllProjects();
    return projects.find(project => project.id === id) || null;
  }

  static createProject(newProject: Project): void {
    const projects = this.getAllProjects();
    projects.push(newProject);
    ApiService.setData('projects', projects);
  }

  static updateProject(updatedProject: Project): void {
    const projects = this.getAllProjects();
    const index = projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = updatedProject;
      ApiService.setData('projects', projects);
    }
  }

  static deleteProject(id: string): void {
    const projects = this.getAllProjects();
    const filteredProjects = projects.filter(project => project.id !== id);
    ApiService.setData('projects', filteredProjects);
  }
}
