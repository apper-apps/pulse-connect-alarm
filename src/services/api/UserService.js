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
  }
};