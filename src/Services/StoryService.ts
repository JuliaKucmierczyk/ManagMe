import { ApiService } from '../API/ApiService';

export class StoryService {
      static getCurrentStoryId(): string  {
        return ApiService.getData('currentStoryId');
      }
    
      static setCurrentStoryId(storyId: string): void {
        console.log("Current story id is:"+ storyId)
        ApiService.setData('currentStoryId', storyId);
      }
}