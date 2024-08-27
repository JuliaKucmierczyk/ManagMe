import { ApiService } from "../API/ApiService";

export class TaskService {
  static getCurrentTaskId(): string | null {
    return ApiService.getData('currentTaskId');
  }

  static setCurrentTaskId(taskId: string): void {
    console.log("Current task id: "+ taskId)
    ApiService.setData('currentTaskId', taskId);
  }
}