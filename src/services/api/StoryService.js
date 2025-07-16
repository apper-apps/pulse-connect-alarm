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
  }
};