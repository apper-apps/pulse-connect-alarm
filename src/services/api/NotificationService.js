import mockData from '@/services/mockData/notifications.json';

let data = [...mockData];
let lastId = Math.max(...data.map(item => item.Id), 0);

const generateId = () => ++lastId;

export const NotificationService = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...data]);
      }, 200);
    });
  },

  getUnread: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const unread = data.filter(notification => !notification.isRead);
        resolve([...unread]);
      }, 200);
    });
  },

  getById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const notification = data.find(item => item.Id === parseInt(id));
        resolve(notification ? { ...notification } : null);
      }, 200);
    });
  },

  markAsRead: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = data.findIndex(item => item.Id === parseInt(id));
        if (index !== -1) {
          data[index] = { ...data[index], isRead: true };
          resolve({ ...data[index] });
        } else {
          resolve(null);
        }
      }, 200);
    });
  },

  markAllAsRead: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        data = data.map(notification => ({ ...notification, isRead: true }));
        resolve([...data]);
      }, 200);
    });
  },

  create: (notification) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newNotification = {
          ...notification,
          Id: generateId(),
          isRead: false,
          createdAt: new Date().toISOString()
        };
        data.push(newNotification);
        resolve({ ...newNotification });
      }, 200);
    });
  },

  delete: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = data.findIndex(item => item.Id === parseInt(id));
        if (index !== -1) {
          const deleted = data.splice(index, 1)[0];
          resolve({ ...deleted });
        } else {
          resolve(null);
        }
      }, 200);
    });
  }
};

export default NotificationService;