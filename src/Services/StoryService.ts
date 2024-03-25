import { ApiService } from '../API/ApiService';
import { Story } from '../Models/Story';

export class StoryService {
    static getAllStories(): Story[] {
        return ApiService.getData('stories') || [];
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

      static deleteStory(id: string): void {
        const stories = this.getAllStories();
        const filteredStories = stories.filter(story => story.id !== id);
        ApiService.setData('stories', filteredStories);
      }
}