import { ApiService } from "../API/ApiService";

export class SelectionService { 
    static getCurrentProjectId(): string  {
    return ApiService.getData('currentProjectId');
  }

  static setCurrentProjectId(projectId: string): void {
    console.log("Current project id is:"+ projectId)
    ApiService.setData('currentProjectId', projectId);
  }
}