import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/productsData";

interface Section {
  id: string;
  type: string;
  component: string;
  visible: boolean;
  order: number;
  props?: any;
}

interface HeaderData {
  phone: string;
  email: string;
  businessHours: string;
  topBarText: string;
  quickLinks: string;
  logo: string;
}

interface FooterData {
  companyName: string;
  companyDescription: string;
  phone: string;
  email: string;
  businessHours: string;
  newsletter: {
    title: string;
    description: string;
  };
  copyright: string;
}

interface EditorContextType {
  isEditing: boolean;
  isPreviewing: boolean;
  sections: Section[];
  productData: Record<string, Partial<Product>>;
  headerData: HeaderData;
  footerData: FooterData;
  setIsEditing: (editing: boolean) => void;
  setIsPreviewing: (previewing: boolean) => void;
  updateSectionOrder: (sections: Section[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  updateProductData: (productId: string, data: Partial<Product>) => void;
  updateHeaderData: (data: Partial<HeaderData>) => void;
  updateFooterData: (data: Partial<FooterData>) => void;
  publishChanges: () => void;
  discardChanges: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const defaultSections: Section[] = [
  { id: "header", type: "header", component: "Header", visible: true, order: 0 },
  { id: "navigation", type: "navigation", component: "Navigation", visible: true, order: 1 },
  { id: "hero", type: "hero", component: "HeroSection", visible: true, order: 2 },
  { id: "featured-products", type: "products", component: "FeaturedProducts", visible: true, order: 3 },
  { id: "features", type: "content", component: "Features", visible: true, order: 4 },
  { id: "footer", type: "footer", component: "Footer", visible: true, order: 5 },
];

const defaultHeaderData: HeaderData = {
  phone: "+1 (323) 843-0781",
  email: "info@signassist.com",
  businessHours: "7:00 AM - 4:00 PM CST",
  topBarText: "Worldwide Shipping - Ready for Bulk Orders - Quality and Delivery Guarantee",
  quickLinks: "Catalog | Designs | Best sellers",
  logo: "/src/assets/signassist-logo.png"
};

const defaultFooterData: FooterData = {
  companyName: "Signassist",
  companyDescription: "Professional signage solutions for offices, hotels, restaurants, and more. Quality guaranteed with worldwide shipping.",
  phone: "+1 (323) 843-0781",
  email: "info@signassist.com",
  businessHours: "Business Hours: 7:00 AM - 4:00 PM CST",
  newsletter: {
    title: "Stay Updated",
    description: "Get the latest updates on new products and exclusive offers"
  },
  copyright: "© 2024 Signassist. All rights reserved."
};

// Helper functions for localStorage persistence
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log(`Loaded from localStorage [${key}]:`, parsed);
      return parsed;
    }
    console.log(`No data in localStorage for [${key}], using default:`, defaultValue);
    return defaultValue;
  } catch (error) {
    console.warn(`Failed to load from localStorage [${key}]:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    console.log(`Saved to localStorage [${key}]:`, value);
    // Verify the save worked
    const verification = localStorage.getItem(key);
    if (!verification) {
      console.error(`Failed to verify save to localStorage [${key}]`);
    }
  } catch (error) {
    console.error(`Failed to save to localStorage [${key}]:`, error);
  }
};

export function EditorProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [sections, setSections] = useState<Section[]>(() => 
    loadFromStorage('editor-sections', defaultSections)
  );
  const [productData, setProductData] = useState<Record<string, Partial<Product>>>(() =>
    loadFromStorage('editor-product-data', {})
  );
  const [headerData, setHeaderData] = useState<HeaderData>(() =>
    loadFromStorage('editor-header-data', defaultHeaderData)
  );
  const [footerData, setFooterData] = useState<FooterData>(() =>
    loadFromStorage('editor-footer-data', defaultFooterData)
  );
  const [originalSections, setOriginalSections] = useState<Section[]>(() =>
    loadFromStorage('editor-sections', defaultSections)
  );
  const [originalProductData, setOriginalProductData] = useState<Record<string, Partial<Product>>>(() =>
    loadFromStorage('editor-product-data', {})
  );
  const [originalHeaderData, setOriginalHeaderData] = useState<HeaderData>(() =>
    loadFromStorage('editor-header-data', defaultHeaderData)
  );
  const [originalFooterData, setOriginalFooterData] = useState<FooterData>(() =>
    loadFromStorage('editor-footer-data', defaultFooterData)
  );

  const updateSectionOrder = (newSections: Section[]) => {
    setSections(newSections);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible }
        : section
    ));
  };

  const updateProductData = (productId: string, data: Partial<Product>) => {
    setProductData(prev => ({
      ...prev,
      [productId]: { ...prev[productId], ...data }
    }));
  };

  const updateHeaderData = (data: Partial<HeaderData>) => {
    setHeaderData(prev => ({ ...prev, ...data }));
  };

  const updateFooterData = (data: Partial<FooterData>) => {
    setFooterData(prev => ({ ...prev, ...data }));
  };

  const publishChanges = () => {
    // Save to localStorage for persistence
    saveToStorage('editor-sections', sections);
    saveToStorage('editor-product-data', productData);
    saveToStorage('editor-header-data', headerData);
    saveToStorage('editor-footer-data', footerData);
    
    // Update original states
    setOriginalSections([...sections]);
    setOriginalProductData({ ...productData });
    setOriginalHeaderData({ ...headerData });
    setOriginalFooterData({ ...footerData });
    setIsEditing(false);
    setIsPreviewing(false);
    
    console.log('Changes published and saved to localStorage');
  };

  const discardChanges = () => {
    setSections([...originalSections]);
    setProductData({ ...originalProductData });
    setHeaderData({ ...originalHeaderData });
    setFooterData({ ...originalFooterData });
    setIsEditing(false);
    setIsPreviewing(false);
  };

  return (
    <EditorContext.Provider value={{
      isEditing,
      isPreviewing,
      sections,
      productData,
      headerData,
      footerData,
      setIsEditing,
      setIsPreviewing,
      updateSectionOrder,
      toggleSectionVisibility,
      updateProductData,
      updateHeaderData,
      updateFooterData,
      publishChanges,
      discardChanges,
    }}>
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};