// Automatic Category Assignment System

export interface CategoryRule {
  keywords: string[];
  category: string;
  subcategory?: string;
  priority: number; // Higher priority takes precedence
}

export const categoryRules: CategoryRule[] = [
  // Restroom Signs
  {
    keywords: ['restroom', 'bathroom', 'toilet', 'washroom', 'lavatory', 'men', 'women', 'unisex', 'all-gender'],
    category: 'restroom-signs',
    subcategory: 'general-restroom-signs',
    priority: 10
  },
  {
    keywords: ['ada', 'accessible', 'disability', 'braille', 'compliant'],
    category: 'restroom-signs',
    subcategory: 'ada-restroom-signs',
    priority: 15
  },
  {
    keywords: ['staff', 'employee', 'private'],
    category: 'restroom-signs',
    subcategory: 'staff-restroom-signs',
    priority: 12
  },

  // Door Number Signs
  {
    keywords: ['door number', 'room number', 'suite', 'apartment', 'unit', 'office number'],
    category: 'door-number-signs',
    subcategory: 'office-door-numbers',
    priority: 10
  },
  {
    keywords: ['hotel', 'room', 'guest'],
    category: 'door-number-signs',
    subcategory: 'hotel-door-numbers',
    priority: 12
  },
  {
    keywords: ['apartment', 'residential', 'condo'],
    category: 'door-number-signs',
    subcategory: 'residential-door-numbers',
    priority: 11
  },

  // Door Signs
  {
    keywords: ['entrance', 'exit', 'entry', 'door', 'pull', 'push'],
    category: 'door-signs',
    subcategory: 'entrance-exit-signs',
    priority: 8
  },
  {
    keywords: ['office', 'conference', 'meeting', 'boardroom'],
    category: 'door-signs',
    subcategory: 'office-door-signs',
    priority: 10
  },
  {
    keywords: ['emergency', 'fire', 'safety'],
    category: 'door-signs',
    subcategory: 'safety-door-signs',
    priority: 15
  },

  // Custom Door Plates
  {
    keywords: ['custom', 'personalized', 'engraved', 'nameplate', 'plate'],
    category: 'custom-door-plates',
    subcategory: 'engraved-plates',
    priority: 10
  },
  {
    keywords: ['professional', 'business', 'corporate'],
    category: 'custom-door-plates',
    subcategory: 'professional-plates',
    priority: 12
  }
];

/**
 * Automatically assigns category and subcategory based on product name and description
 */
export const assignCategory = (productName: string, description?: string): { category: string; subcategory?: string } => {
  const text = `${productName} ${description || ''}`.toLowerCase();
  
  let bestMatch: CategoryRule | null = null;
  let highestScore = 0;

  for (const rule of categoryRules) {
    let score = 0;
    let keywordMatches = 0;

    for (const keyword of rule.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        keywordMatches++;
        score += rule.priority;
      }
    }

    // Bonus for multiple keyword matches
    if (keywordMatches > 1) {
      score += keywordMatches * 2;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = rule;
    }
  }

  if (bestMatch) {
    return {
      category: bestMatch.category,
      subcategory: bestMatch.subcategory
    };
  }

  // Default fallback
  return {
    category: 'door-signs',
    subcategory: 'general-door-signs'
  };
};

/**
 * Updates all products with automatic category assignment
 */
export const updateProductsWithCategories = (products: any[]): any[] => {
  return products.map(product => {
    const assignedCategory = assignCategory(product.name, product.description);
    
    return {
      ...product,
      category: assignedCategory.category,
      subcategory: assignedCategory.subcategory,
      // Add category metadata for analytics
      categoryAssigned: true,
      categoryAssignedAt: new Date().toISOString()
    };
  });
};

/**
 * Category display names and metadata
 */
export const categoryMetadata = {
  'restroom-signs': {
    title: 'Restroom Signs',
    description: 'ADA compliant restroom and bathroom signage',
    icon: '🚻',
    color: '#3B82F6'
  },
  'door-number-signs': {
    title: 'Door Number Signs',
    description: 'Professional door numbering for offices and hotels',
    icon: '🔢',
    color: '#10B981'
  },
  'door-signs': {
    title: 'Door Signs',
    description: 'General door signage and directional signs',
    icon: '🚪',
    color: '#F59E0B'
  },
  'custom-door-plates': {
    title: 'Custom Door Plates',
    description: 'Personalized engraved door plates and nameplates',
    icon: '✨',
    color: '#8B5CF6'
  }
};

/**
 * Get category display information
 */
export const getCategoryInfo = (categoryKey: string) => {
  return categoryMetadata[categoryKey as keyof typeof categoryMetadata] || {
    title: categoryKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: 'Professional signage solutions',
    icon: '📋',
    color: '#6B7280'
  };
};

/**
 * Get all available categories
 */
export const getAllCategories = () => {
  return Object.keys(categoryMetadata);
};

/**
 * Filter products by category
 */
export const filterProductsByCategory = (products: any[], category: string) => {
  return products.filter(product => product.category === category);
};

/**
 * Get category statistics
 */
export const getCategoryStats = (products: any[]) => {
  const stats: Record<string, number> = {};
  
  products.forEach(product => {
    const category = product.category || 'uncategorized';
    stats[category] = (stats[category] || 0) + 1;
  });
  
  return stats;
};