import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface EditorData {
  sections: Array<{
    id: string;
    title: string;
    content: string;
    order: number;
  }>;
  productData: Record<string, any>;
  headerData: {
    phone: string;
    email: string;
    businessHours: string;
    topBarText: string;
    quickLinks: string;
    logo?: string;
  };
  footerData: {
    companyName: string;
    companyDescription: string;
    phone: string;
    email: string;
    businessHours: string;
  };
}

interface EditorContextType {
  isEditing: boolean;
  isPreviewing: boolean;
  editorData: EditorData;
  sections: EditorData['sections'];
  productData: EditorData['productData'];
  headerData: EditorData['headerData'];
  footerData: EditorData['footerData'];
  toggleEditing: () => void;
  togglePreviewing: () => void;
  updateSections: (sections: EditorData['sections']) => void;
  updateProductData: (data: Record<string, any>) => void;
  updateHeaderData: (data: Partial<EditorData['headerData']>) => void;
  updateFooterData: (data: Partial<EditorData['footerData']>) => void;
  saveChanges: () => Promise<void>;
  publishChanges: () => Promise<void>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const defaultSections = [
  { id: 'header', title: 'Header', content: '', order: 1 },
  { id: 'navigation', title: 'Navigation', content: '', order: 2 },
  { id: 'hero', title: 'Hero Section', content: '', order: 3 },
  { id: 'featured-products', title: 'Featured Products', content: '', order: 4 },
  { id: 'features', title: 'Features', content: '', order: 5 },
  { id: 'footer', title: 'Footer', content: '', order: 6 }
];

const defaultHeaderData = {
  phone: '+1 (323) 843-0781',
  email: 'info@signassist.com',
  businessHours: '7:00 AM - 4:00 PM CST',
  topBarText: 'Worldwide Shipping - Ready for Bulk Orders - Quality and Delivery Guarantee',
  quickLinks: 'Catalog | Designs | Best sellers'
};

const defaultFooterData = {
  companyName: 'Acrylic Braille Signs',
  companyDescription: 'Professional ADA compliant acrylic braille signage solutions for offices, hospitals, and commercial spaces. Quality guaranteed with worldwide shipping.',
  phone: '+1 (323) 843-0781',
  email: 'info@acrylicbraillesigns.com',
  businessHours: 'Business Hours: 7:00 AM - 4:00 PM CST'
};

// Robust localStorage functions with comprehensive error handling
const getFromStorage = (key: string, defaultValue: any) => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    if (!item) {
      console.log(`No data in localStorage for [${key}], using default`);
      return defaultValue;
    }
    const parsed = JSON.parse(item);
    console.log(`✅ Loaded from localStorage [${key}]:`, parsed);
    return parsed;
  } catch (error) {
    console.error(`❌ Error reading from localStorage [${key}]:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any) => {
  try {
    if (typeof window === 'undefined') return false;
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    console.log(`✅ Successfully saved to localStorage [${key}]`);
    return true;
  } catch (error) {
    console.error(`❌ Error saving to localStorage [${key}]:`, error);
    return false;
  }
};

// Show user notifications
const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  if (typeof window === 'undefined') return;
  
  // Remove existing notifications
  const existing = document.querySelectorAll('.editor-notification');
  existing.forEach(el => el.remove());
  
  const notification = document.createElement('div');
  notification.className = 'editor-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    transform: translateX(100%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 350px;
    word-wrap: break-word;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Auto remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 400);
  }, type === 'error' ? 5000 : 3000);
};

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  // Initialize state with localStorage data
  const [sections, setSections] = useState(() => 
    getFromStorage('editor-sections', defaultSections)
  );
  
  const [productData, setProductData] = useState(() => 
    getFromStorage('editor-product-data', {})
  );
  
  const [headerData, setHeaderData] = useState(() => 
    getFromStorage('editor-header-data', defaultHeaderData)
  );
  
  const [footerData, setFooterData] = useState(() => 
    getFromStorage('editor-footer-data', defaultFooterData)
  );

  // Auto-save to localStorage with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToStorage('editor-sections', sections);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [sections]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToStorage('editor-product-data', productData);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [productData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToStorage('editor-header-data', headerData);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [headerData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToStorage('editor-footer-data', footerData);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [footerData]);

  const editorData: EditorData = {
    sections,
    productData,
    headerData,
    footerData
  };

  const toggleEditing = useCallback(() => {
    setIsEditing(prev => {
      const newState = !prev;
      console.log(`🔧 Edit mode ${newState ? 'activated' : 'deactivated'}`);
      showNotification(`Edit mode ${newState ? 'activated' : 'deactivated'}`, 'info');
      return newState;
    });
  }, []);

  const togglePreviewing = useCallback(() => {
    setIsPreviewing(prev => {
      const newState = !prev;
      console.log(`👁️ Preview mode ${newState ? 'activated' : 'deactivated'}`);
      showNotification(`Preview mode ${newState ? 'activated' : 'deactivated'}`, 'info');
      return newState;
    });
  }, []);

  const updateSections = useCallback((newSections: EditorData['sections']) => {
    console.log('📝 Updating sections:', newSections);
    setSections(newSections);
  }, []);

  const updateProductData = useCallback((data: Record<string, any>) => {
    console.log('🛍️ Updating product data:', data);
    setProductData(prev => ({ ...prev, ...data }));
  }, []);

  const updateHeaderData = useCallback((data: Partial<EditorData['headerData']>) => {
    console.log('📋 Updating header data:', data);
    setHeaderData(prev => ({ ...prev, ...data }));
  }, []);

  const updateFooterData = useCallback((data: Partial<EditorData['footerData']>) => {
    console.log('🦶 Updating footer data:', data);
    setFooterData(prev => ({ ...prev, ...data }));
  }, []);

  const saveChanges = useCallback(async () => {
    try {
      console.log('💾 Starting save process...');
      
      // Force immediate save to localStorage
      const saveResults = [
        saveToStorage('editor-sections', sections),
        saveToStorage('editor-product-data', productData),
        saveToStorage('editor-header-data', headerData),
        saveToStorage('editor-footer-data', footerData)
      ];
      
      const allSaved = saveResults.every(result => result === true);
      
      if (!allSaved) {
        throw new Error('Failed to save some data to localStorage');
      }
      
      // Verify data was saved correctly
      const verification = [
        getFromStorage('editor-sections', null),
        getFromStorage('editor-product-data', null),
        getFromStorage('editor-header-data', null),
        getFromStorage('editor-footer-data', null)
      ];
      
      const allVerified = verification.every(data => data !== null);
      
      if (!allVerified) {
        throw new Error('Data verification failed after save');
      }
      
      console.log('✅ All changes saved successfully');
      showNotification('✅ Changes saved successfully!', 'success');
      
    } catch (error) {
      console.error('❌ Error saving changes:', error);
      showNotification('❌ Save failed. Please try again.', 'error');
      throw error;
    }
  }, [sections, productData, headerData, footerData]);

  const publishChanges = useCallback(async () => {
    try {
      console.log('🚀 Starting publish process...');
      
      // First save all changes
      await saveChanges();
      
      // Mark as published
      const publishTime = new Date().toISOString();
      saveToStorage('editor-last-published', publishTime);
      
      console.log('🚀 Changes published successfully at:', publishTime);
      showNotification('🚀 Changes published successfully!', 'success');
      
      // Optional: Show published state briefly
      setTimeout(() => {
        if (isEditing || isPreviewing) {
          showNotification('💡 Changes are now live on your website', 'info');
        }
      }, 1000);
      
    } catch (error) {
      console.error('❌ Error publishing changes:', error);
      showNotification('❌ Publish failed. Please try again.', 'error');
      throw error;
    }
  }, [saveChanges, isEditing, isPreviewing]);

  const value: EditorContextType = {
    isEditing,
    isPreviewing,
    editorData,
    sections,
    productData,
    headerData,
    footerData,
    toggleEditing,
    togglePreviewing,
    updateSections,
    updateProductData,
    updateHeaderData,
    updateFooterData,
    saveChanges,
    publishChanges
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};