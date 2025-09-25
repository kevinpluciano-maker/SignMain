// Cross-device synchronization service
interface SyncData {
  cart: any[];
  currency: string;
  userPreferences: {
    theme: string;
    language: string;
  };
  sessionData: {
    lastVisited: string;
    viewedProducts: string[];
  };
  timestamp: number;
}

class CrossDeviceSync {
  private readonly STORAGE_KEY = 'acrylic_braille_sync';
  private readonly SYNC_INTERVAL = 30000; // 30 seconds
  private syncTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.startSync();
    this.handleVisibilityChange();
  }

  // Start automatic sync
  startSync() {
    this.syncTimer = setInterval(() => {
      this.syncToCloud();
    }, this.SYNC_INTERVAL);
  }

  // Stop sync
  stopSync() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  // Sync data to cloud (localStorage simulation)
  async syncToCloud() {
    try {
      const syncData: SyncData = {
        cart: this.getCartData(),
        currency: this.getCurrencyData(),
        userPreferences: this.getUserPreferences(),
        sessionData: this.getSessionData(),
        timestamp: Date.now()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(syncData));
      
      // In a real app, this would sync to a backend service
      console.log('✅ Cross-device sync completed', new Date().toISOString());
    } catch (error) {
      console.error('❌ Sync failed:', error);
    }
  }

  // Restore data from cloud
  async syncFromCloud(): Promise<SyncData | null> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const syncData: SyncData = JSON.parse(stored);
        
        // Check if data is not too old (24 hours)
        const isDataFresh = Date.now() - syncData.timestamp < 24 * 60 * 60 * 1000;
        
        if (isDataFresh) {
          console.log('✅ Data restored from cross-device sync');
          return syncData;
        }
      }
      return null;
    } catch (error) {
      console.error('❌ Sync restore failed:', error);
      return null;
    }
  }

  // Get cart data from localStorage
  private getCartData() {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  }

  // Get currency preference
  private getCurrencyData() {
    return localStorage.getItem('selectedCurrency') || 'CAD';
  }

  // Get user preferences
  private getUserPreferences() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      language: localStorage.getItem('language') || 'en'
    };
  }

  // Get session data
  private getSessionData() {
    const viewedProducts = localStorage.getItem('viewedProducts');
    return {
      lastVisited: localStorage.getItem('lastVisited') || '',
      viewedProducts: viewedProducts ? JSON.parse(viewedProducts) : []
    };
  }

  // Handle page visibility changes (sync when page becomes visible)
  private handleVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.syncFromCloud();
      } else {
        this.syncToCloud();
      }
    });
  }

  // Force sync now
  forcSync() {
    this.syncToCloud();
  }
}

// Export singleton instance
export const crossDeviceSync = new CrossDeviceSync();

// Hook for React components
export const useCrossDeviceSync = () => {
  const restoreFromSync = async () => {
    return await crossDeviceSync.syncFromCloud();
  };

  const forceSync = () => {
    crossDeviceSync.forcSync();
  };

  return { restoreFromSync, forceSync };
};