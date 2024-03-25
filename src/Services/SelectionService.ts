import { ApiService } from "../API/ApiService";

export class SelectionService { 
    static getCurrentProjectId(): string | null {
    return ApiService.getData('currentProjectId');
  }

  static setCurrentProjectId(projectId: string): void {
    ApiService.setData('currentProjectId', projectId);
  }
  }