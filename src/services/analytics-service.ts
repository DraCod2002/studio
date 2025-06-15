
'use client';

const PAGE_VIEWS_KEY = 'xstrees_analytics_pageViews';
const EVENT_COUNTS_KEY_PREFIX = 'xstrees_analytics_event_';
const ADMIN_LOGGED_IN_KEY = 'xstrees_isAdminLoggedIn';

export const incrementPageView = (): void => {
  if (typeof window !== 'undefined') {
    try {
      const currentViews = parseInt(localStorage.getItem(PAGE_VIEWS_KEY) || '0', 10);
      localStorage.setItem(PAGE_VIEWS_KEY, (currentViews + 1).toString());
    } catch (error) {
      console.error('Error incrementing page view:', error);
    }
  }
};

export const getPageViewCount = (): number => {
  if (typeof window !== 'undefined') {
    try {
      return parseInt(localStorage.getItem(PAGE_VIEWS_KEY) || '0', 10);
    } catch (error) {
      console.error('Error getting page view count:', error);
      return 0;
    }
  }
  return 0;
};

export const incrementEventCount = (eventName: string): void => {
  if (typeof window !== 'undefined' && eventName) {
    try {
      const key = `${EVENT_COUNTS_KEY_PREFIX}${eventName}`;
      const currentCount = parseInt(localStorage.getItem(key) || '0', 10);
      localStorage.setItem(key, (currentCount + 1).toString());
    } catch (error) {
      console.error(`Error incrementing event count for ${eventName}:`, error);
    }
  }
};

export const getEventCount = (eventName: string): number => {
  if (typeof window !== 'undefined' && eventName) {
    try {
      const key = `${EVENT_COUNTS_KEY_PREFIX}${eventName}`;
      return parseInt(localStorage.getItem(key) || '0', 10);
    } catch (error) {
      console.error(`Error getting event count for ${eventName}:`, error);
      return 0;
    }
  }
  return 0;
};

export const getAllEventCounts = (): Record<string, number> => {
  const eventCounts: Record<string, number> = {};
  if (typeof window !== 'undefined') {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(EVENT_COUNTS_KEY_PREFIX)) {
          const eventName = key.substring(EVENT_COUNTS_KEY_PREFIX.length);
          eventCounts[eventName] = parseInt(localStorage.getItem(key) || '0', 10);
        }
      });
    } catch (error) {
      console.error('Error getting all event counts:', error);
    }
  }
  return eventCounts;
};

export const resetAnalytics = (): void => {
    if (typeof window !== 'undefined') {
        try {
            Object.keys(localStorage).forEach((key) => {
                if (key.startsWith('xstrees_analytics_')) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('Error resetting analytics:', error);
        }
    }
};

export const setAdminLoggedIn = (isLoggedIn: boolean): void => {
  if (typeof window !== 'undefined') {
    try {
      if (isLoggedIn) {
        localStorage.setItem(ADMIN_LOGGED_IN_KEY, 'true');
      } else {
        localStorage.removeItem(ADMIN_LOGGED_IN_KEY);
      }
    } catch (error) {
      console.error('Error setting admin login state:', error);
    }
  }
};

export const isAdminLoggedIn = (): boolean => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(ADMIN_LOGGED_IN_KEY) === 'true';
    } catch (error) {
      console.error('Error checking admin login state:', error);
      return false;
    }
  }
  return false;
};
