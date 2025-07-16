import userData from "@/services/mockData/users.json";
import postData from "@/services/mockData/posts.json";
import { UserService } from "@/services/api/UserService";
import { PostService } from "@/services/api/PostService";

export const SearchService = {
  async getAll(query) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.trim() === "") {
      return {
        posts: [],
        users: [],
        totalResults: 0
      };
    }
    
    const [posts, users] = await Promise.all([
      this.searchPosts(query),
      this.searchUsers(query)
    ]);
    
    return {
      posts,
      users,
      totalResults: posts.length + users.length
    };
  },

  async searchPosts(query) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.trim() === "") {
      return [];
    }
    
    const lowercaseQuery = query.toLowerCase();
    
    // Filter posts by content, hashtags, or user
    const filteredPosts = postData.filter(post => {
      const user = userData.find(user => user.Id === post.userId);
      const content = post.content?.toLowerCase() || "";
      const hashtags = post.hashtags?.join(" ").toLowerCase() || "";
      const userName = user ? `${user.displayName} ${user.username}`.toLowerCase() : "";
      
      return content.includes(lowercaseQuery) || 
             hashtags.includes(lowercaseQuery) || 
             userName.includes(lowercaseQuery);
    });
    
    // Attach user data and sort by timestamp
    const postsWithUsers = filteredPosts.map(post => ({
      ...post,
      user: userData.find(user => user.Id === post.userId)
    }));
    
    return postsWithUsers.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async searchUsers(query) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.trim() === "") {
      return [];
    }
    
    const lowercaseQuery = query.toLowerCase();
    
    return userData.filter(user => {
      const displayName = user.displayName?.toLowerCase() || "";
      const username = user.username?.toLowerCase() || "";
      const bio = user.bio?.toLowerCase() || "";
      
      return displayName.includes(lowercaseQuery) || 
             username.includes(lowercaseQuery) || 
             bio.includes(lowercaseQuery);
    });
  }
};