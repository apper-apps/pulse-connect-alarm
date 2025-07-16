import trendData from "@/services/mockData/trends.json";

export const TrendService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...trendData].sort((a, b) => b.postCount - a.postCount);
  },

  async getByHashtag(hashtag) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return trendData.find(trend => trend.hashtag === hashtag);
  }
};