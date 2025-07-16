import userData from "@/services/mockData/users.json";

export const UserService = {
  async getCurrentUser() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return userData.find(user => user.Id === 1);
  },

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...userData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return userData.find(user => user.Id === id);
  },

  async getSuggested() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return userData.filter(user => user.Id !== 1).slice(0, 3);
  },

  async getActive() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return userData.filter(user => user.isOnline).slice(0, 5);
  },

  async follow(userId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  },

async unfollow(userId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  },

  async sendMessage(userId, message) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { 
      success: true, 
      messageId: Date.now(),
      timestamp: new Date().toISOString()
    };
  },

  async getChatMessages(userId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [
      {
        Id: 1,
        senderId: userId,
        receiverId: 1,
        message: "Hey! How are you doing?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        isRead: true
      },
      {
        Id: 2,
        senderId: 1,
        receiverId: userId,
        message: "I'm doing great! Thanks for asking. How about you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        isRead: true
      }
    ];
  },

  async getChatHistory(userId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return [
      {
        Id: 1,
        senderId: userId,
        receiverId: 1,
        message: "Hey! How are you doing?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        isRead: true
      },
      {
        Id: 2,
        senderId: 1,
        receiverId: userId,
        message: "I'm doing great! Thanks for asking. How about you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        isRead: true
      },
      {
        Id: 3,
        senderId: userId,
        receiverId: 1,
        message: "I'm doing well too! Working on some exciting projects.",
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        isRead: true
      }
    ];
  }
};