import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import { NotificationService } from '@/services/api/NotificationService';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';

const NotificationDropdown = ({ className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const filters = [
    { id: 'all', label: 'All', icon: 'Bell' },
    { id: 'like', label: 'Likes', icon: 'Heart' },
    { id: 'comment', label: 'Comments', icon: 'MessageCircle' },
    { id: 'mention', label: 'Mentions', icon: 'AtSign' }
  ];

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await NotificationService.getAll();
      setNotifications(data);
      const unread = data.filter(n => !n.isRead);
      setUnreadCount(unread.length);
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await NotificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(notification => 
          notification.Id === id ? { ...notification, isRead: true } : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all notifications as read');
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    return notification.type === activeFilter;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return 'Heart';
      case 'comment': return 'MessageCircle';
      case 'mention': return 'AtSign';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'like': return 'text-red-500';
      case 'comment': return 'text-blue-500';
      case 'mention': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef} {...props}>
      <motion.button
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
      >
        <ApperIcon name="Bell" className="h-5 w-5 text-gray-600" />
        {unreadCount > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 min-w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white text-xs font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
              </div>
              
              {/* Filters */}
              <div className="flex gap-1 mt-3">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1",
                      activeFilter === filter.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    <ApperIcon name={filter.icon} className="h-3 w-3" />
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <ApperIcon name="Loader2" className="h-6 w-6 animate-spin mx-auto mb-2" />
                  Loading notifications...
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <ApperIcon name="Bell" className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.Id}
                      className={cn(
                        "p-4 hover:bg-gray-50 transition-colors cursor-pointer",
                        !notification.isRead && "bg-blue-50"
                      )}
                      onClick={() => handleMarkAsRead(notification.Id)}
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                    >
                      <div className="flex gap-3">
                        <Avatar
                          src={notification.avatar}
                          alt={notification.username}
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            <ApperIcon
                              name={getNotificationIcon(notification.type)}
                              className={cn("h-4 w-4 mt-0.5", getNotificationColor(notification.type))}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;