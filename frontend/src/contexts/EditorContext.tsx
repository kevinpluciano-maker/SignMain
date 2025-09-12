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
  companyName: 'Signassist',
  companyDescription: 'Professional signage solutions for offices, hotels, and commercial spaces. Quality guaranteed with worldwide shipping.',
  phone: '+1 (323) 843-0781',
  email: 'info@signassist.com',
  businessHours: 'Business Hours: 7:00 AM - 4:00 PM CST'
};

// Enhanced localStorage functions with error handling
const getFromStorage = (key: string, defaultValue: any) => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    if (!item) {
      console.log(`No data in localStorage for [${key}], using default:`, defaultValue);
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage [${key}]:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Saved to localStorage [${key}]:`, value);
  } catch (error) {
    console.error(`Error saving to localStorage [${key}]:`, error);
  }
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

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage('editor-sections', sections);
  }, [sections]);

  useEffect(() => {
    saveToStorage('editor-product-data', productData);
  }, [productData]);

  useEffect(() => {
    saveToStorage('editor-header-data', headerData);
  }, [headerData]);

  useEffect(() => {
    saveToStorage('editor-footer-data', footerData);
  }, [footerData]);

  const editorData: EditorData = {
    sections,
    productData,
    headerData,
    footerData
  };

  const toggleEditing = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);

  const togglePreviewing = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);

  const updateSections = useCallback((newSections: EditorData['sections']) => {
    setSections(newSections);
  }, []);

  const updateProductData = useCallback((data: Record<string, any>) => {
    setProductData(prev => ({ ...prev, ...data }));
  }, []);

  const updateHeaderData = useCallback((data: Partial<EditorData['headerData']>) => {
    setHeaderData(prev => ({ ...prev, ...data }));
  }, []);

  const updateFooterData = useCallback((data: Partial<EditorData['footerData']>) => {
    setFooterData(prev => ({ ...prev, ...data }));
  }, []);

  const saveChanges = useCallback(async () => {
    try {
      // Force save to localStorage
      saveToStorage('editor-sections', sections);
      saveToStorage('editor-product-data', productData);
      saveToStorage('editor-header-data', headerData);
      saveToStorage('editor-footer-data', footerData);
      
      console.log('✅ Changes saved successfully');
      
      // Show success notification (you can implement toast notification here)
      if (typeof window !== 'undefined') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.textContent = '✅ Changes saved successfully!';
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      }
    } catch (error) {
      console.error('❌ Error saving changes:', error);
      throw error;
    }
  }, [sections, productData, headerData, footerData]);

  const publishChanges = useCallback(async () => {
    try {
      await saveChanges();
      
      // Additional publish logic can be added here
      // For now, we'll just trigger a page refresh to show published changes
      console.log('🚀 Changes published successfully');
      
      // Show publish success notification
      if (typeof window !== 'undefined') {
        const notification = document.createElement('div');
        notification.textContent = '🚀 Changes published successfully!';
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #3b82f6;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          document.body.removeChild(notification);
          // Optionally refresh the page to show published changes
          // window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Error publishing changes:', error);
      throw error;
    }
  }, [saveChanges]);

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