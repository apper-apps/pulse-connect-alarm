export const StatsService = {
  async getStats() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      posts: 42,
      followers: 1247,
      following: 398,
      likes: 3521
    };
  }
};