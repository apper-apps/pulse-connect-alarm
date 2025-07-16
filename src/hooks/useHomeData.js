import { useState, useEffect } from "react";
import { UserService } from "@/services/api/UserService";
import { TrendService } from "@/services/api/TrendService";
import { StoryService } from "@/services/api/StoryService";
import { StatsService } from "@/services/api/StatsService";

export const useHomeData = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({});
  const [trends, setTrends] = useState([]);
  const [stories, setStories] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        currentUserData,
        statsData,
        trendsData,
        storiesData,
        suggestedUsersData,
        activeUsersData
      ] = await Promise.all([
        UserService.getCurrentUser(),
        StatsService.getStats(),
        TrendService.getAll(),
        StoryService.getAll(),
        UserService.getSuggested(),
        UserService.getActive()
      ]);

      setCurrentUser(currentUserData);
      setStats(statsData);
      setTrends(trendsData);
      setStories(storiesData);
      setSuggestedUsers(suggestedUsersData);
      setActiveUsers(activeUsersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    currentUser,
    stats,
    trends,
    stories,
    suggestedUsers,
    activeUsers,
    loading,
    error,
    refetch: loadData
  };
};