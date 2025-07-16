import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { UserService } from "@/services/api/UserService";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

const ChatModal = ({ 
  isOpen, 
  onClose, 
  selectedUser,
  currentUser,
  className,
  ...props 
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && selectedUser) {
      loadChatHistory();
    }
  }, [isOpen, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      const chatHistory = await UserService.getChatHistory(selectedUser.Id);
      setMessages(chatHistory);
    } catch (error) {
      console.error("Failed to load chat history:", error);
      toast.error("Failed to load chat history");
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    const messageText = newMessage.trim();
    setNewMessage("");
    setSending(true);

    // Declare optimisticMessage in function scope so it's accessible in both try and catch
    const optimisticMessage = {
      Id: Date.now(),
      senderId: currentUser.Id,
      receiverId: selectedUser.Id,
      message: messageText,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    try {
      // Optimistically add message to UI
      setMessages(prev => [...prev, optimisticMessage]);

      // Send to server
      await UserService.sendMessage(selectedUser.Id, messageText);
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.Id !== optimisticMessage.Id));
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={cn(
              "bg-white rounded-xl shadow-xl w-full max-w-md h-[600px] flex flex-col",
              "sm:max-w-lg md:max-w-xl lg:max-w-2xl",
              className
            )}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Avatar 
                  src={selectedUser?.avatar} 
                  alt={selectedUser?.displayName} 
                  size="sm"
                  isOnline={selectedUser?.isOnline}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedUser?.displayName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedUser?.isOnline ? "Active now" : 
                     selectedUser?.lastSeen ? 
                     formatDistanceToNow(new Date(selectedUser.lastSeen), { addSuffix: true }) : 
                     "Offline"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <ApperIcon name="MessageCircle" size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No messages yet</p>
                    <p className="text-sm">Start a conversation with {selectedUser?.displayName}</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.Id}
                    className={cn(
                      "flex",
                      message.senderId === currentUser.Id ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                        message.senderId === currentUser.Id
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-900"
                      )}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        message.senderId === currentUser.Id ? "text-primary-200" : "text-gray-500"
                      )}>
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message ${selectedUser?.displayName}...`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={1}
                    style={{ maxHeight: '100px' }}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <ApperIcon name="Send" size={16} />
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;