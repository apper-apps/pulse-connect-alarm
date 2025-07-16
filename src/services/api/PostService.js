import userData from "@/services/mockData/users.json";
import postData from "@/services/mockData/posts.json";

let posts = [...postData];

export const PostService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Attach user data to posts
    const postsWithUsers = posts.map(post => ({
      ...post,
      user: userData.find(user => user.Id === post.userId)
    }));
    
    // Sort by timestamp (newest first)
    return postsWithUsers.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const post = posts.find(post => post.Id === id);
    if (post) {
      return {
        ...post,
        user: userData.find(user => user.Id === post.userId)
      };
    }
    return null;
  },

  async create(postData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newPost = {
      Id: Math.max(...posts.map(p => p.Id)) + 1,
      ...postData,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString()
    };
    
    posts.unshift(newPost);
    return newPost;
  },

  async like(postId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const post = posts.find(p => p.Id === postId);
    if (post) {
      post.likes += 1;
    }
    return { success: true };
  },

async share(postId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const post = posts.find(p => p.Id === postId);
    if (post) {
      post.shares += 1;
    }
    return { success: true };
  },

  async addComment(postId, content) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const post = posts.find(p => p.Id === postId);
    if (!post) throw new Error('Post not found');
    
    // Initialize comments array if it doesn't exist
    if (!post.commentsList) {
      post.commentsList = [];
    }
    
    const newComment = {
      Id: Date.now(), // Simple ID generation for mock
      postId,
      content,
      userId: 1, // Mock current user ID
      timestamp: new Date().toISOString()
    };
    
    post.commentsList.unshift(newComment);
    post.comments += 1;
    
    // Attach user data to comment
    const commentWithUser = {
      ...newComment,
      user: userData.find(user => user.Id === newComment.userId)
    };
    
    return commentWithUser;
  },

  async getComments(postId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const post = posts.find(p => p.Id === postId);
    if (!post) return [];
    
    const comments = post.commentsList || [];
    
    // Attach user data to comments
    return comments.map(comment => ({
      ...comment,
user: userData.find(user => user.Id === comment.userId)
    }));
  },

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.trim() === "") {
      return [];
    }
    
    const lowercaseQuery = query.toLowerCase();
    
    // Filter posts by content, hashtags, or user
    const filteredPosts = posts.filter(post => {
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
  }
};