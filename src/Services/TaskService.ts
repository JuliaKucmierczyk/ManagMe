import { ApiService } from "../API/ApiService";
import { Task } from "../Models/Task";
import { User } from "../Models/User";

export class TaskService {
  private static readonly STORAGE_KEY = 'tasks';


  static getCurrentTaskId(): string | null {
    return ApiService.getData('currentTaskId');
  }

  static setCurrentTaskId(taskId: string): void {
    console.log("Current task id: "+ taskId)
    ApiService.setData('currentTaskId', taskId);
  }

  static getAllTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  static getTaskById(taskId: string): Task | null {
    const tasks = TaskService.getAllTasks();
    return tasks.find(task => task.id === taskId) || null;
  }

  static getTasksByStoryId(storyId: string): Task[] {
    const tasks = TaskService.getAllTasks();
    return tasks.filter(task => task.storyId === storyId);
  }

  static createTask(task: Task): void {
    const tasks = TaskService.getAllTasks();
    tasks.push(task);
    TaskService.setTasks(tasks);
  }

  static updateTask(taskId: string, updatedTask: Task): void {
    const tasks = TaskService.getAllTasks();
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasks[index] = updatedTask;
      TaskService.setTasks(tasks);
    }
  }

  static deleteTask(taskId: string): void {
    const tasks = TaskService.getAllTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    TaskService.setTasks(filteredTasks);
  }

  static assignUserToTask(taskId: string, user: User): void {
    const task = TaskService.getTaskById(taskId);
    if (task) {
      task.user = user;
      task.state = 'doing';
      task.startDate = new Date().toUTCString();
      TaskService.updateTask(taskId, task);
    }
  }

  static markTaskAsDone(taskId: string): void {
    const task = TaskService.getTaskById(taskId);
    if (task) {
      task.state = 'done';
      task.endDate = new Date().toUTCString();
      TaskService.updateTask(taskId, task);
    }
  }

  static getNumberOfTasksInStory(storyId: string): number {
    const tasks = TaskService.getAllTasks();
    return tasks.filter(task => task.storyId === storyId).length;
  }

  private static setTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }
}