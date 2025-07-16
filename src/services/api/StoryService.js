import storyData from "@/services/mockData/stories.json";
import userData from "@/services/mockData/users.json";

export const StoryService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Attach user data to stories
    const storiesWithUsers = storyData.map(story => ({
      ...story,
      user: userData.find(user => user.Id === story.userId)
    }));
    
    // Sort by timestamp (newest first)
    return storiesWithUsers.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const story = storyData.find(story => story.Id === id);
    if (story) {
      return {
        ...story,
        user: userData.find(user => user.Id === story.userId)
      };
    }
    return null;
  },

  async markAsViewed(storyId, userId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const story = storyData.find(s => s.Id === storyId);
    if (story && !story.viewers.includes(userId)) {
      story.viewers.push(userId);
    }
return { success: true };
  },

  async getStorySequence(storyId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const allStories = await this.getAll();
    const currentIndex = allStories.findIndex(story => story.Id === storyId);
    
    if (currentIndex === -1) return null;
    
    return {
      current: allStories[currentIndex],
      previous: currentIndex > 0 ? allStories[currentIndex - 1] : null,
      next: currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null,
      allStories
    };
},

  async create(storyData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newStory = {
      Id: Math.max(...storyData.map(s => s.Id)) + 1,
      ...storyData,
      timestamp: new Date().toISOString(),
      viewers: [],
      isActive: true
    };
    
    storyData.unshift(newStory);
    
    // Attach user data
    const storyWithUser = {
      ...newStory,
      user: userData.find(user => user.Id === newStory.userId)
    };
    
    return storyWithUser;
  }
};