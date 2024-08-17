import { ApiService } from '../API/ApiService';
import { Story } from '../Models/Story';

export class StoryService {
  
      static getAllStories(): Story[] {
        return ApiService.getData('stories') || [];
      }

      static getCurrentStoryId(): string  {
        return ApiService.getData('currentStoryId');
      }
    
      static setCurrentStoryId(storyId: string): void {
        console.log("Current story id is:"+ storyId)
        ApiService.setData('currentStoryId', storyId);
      }

      static createStory(newStory: Story): void {
        const stories = this.getAllStories();
        stories.push(newStory);
        ApiService.setData('stories', stories);
      }

      static updateStory(updatedStory: Story): void {
        const stories = this.getAllStories();
        const index = stories.findIndex(story => story.id === updatedStory.id);
        if (index !== -1) {
          stories[index] = updatedStory;
          ApiService.setData('stories', stories);
        }
      }

      static deleteStory(id: number): void {
        const stories = this.getAllStories();
        const filteredStories = stories.filter(story => story.id !== id);
        ApiService.setData('stories', filteredStories);
      }

      // static isStoryInProgress(storyId: string): boolean {
      //   const tasks = TaskService.getTasksByStoryId(storyId);
      //   return tasks.some(task => task.state === 'doing');
      // }
    
      // static isStoryCompleted(storyId: string): boolean {
      //   const tasks = TaskService.getTasksByStoryId(storyId);
      //   return tasks.every(task => task.state === 'done');
      // }

      static getAllStoriesByProjectId(projectId: string): Story[] {
        const allStories = this.getAllStories();
        return allStories.filter(story => story.projectId === projectId);
      }
}