export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  slug: string;
  category: string;
  subcategory?: string;
  description: string;
  materials: string[];
  designs: string[];
  badges?: string[];
  sizeOptions?: {
    size: string;
    price: string;
  }[];
  colorOptions?: string[];
  shapeOptions?: string[];
  brailleOptions?: string[];
  gallery?: string[];
  hasCustomSize?: boolean;
}

export const productsData: Record<string, Product[]> = {
  "restroom-signs": [
    {
      id: "staff-ada-sign",
      name: "Staff ADA Sign",
      price: "from $58.00",
      rating: 4.9,
      reviews: 28,
      image: "/lovable-uploads/91055f4b-ab58-45a7-8a16-66b44899231a.png",
      slug: "staff-ada-sign",
      category: "restroom-signs",
      subcategory: "ada-restroom-signs",
      description: "Professional ADA-compliant staff restroom sign with universal accessibility symbols. Features raised characters and Braille text for full compliance with accessibility standards.",
      materials: ["Premium Acrylic", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
      badges: ["ADA Compliant", "Staff", "Professional"],
      sizeOptions: [
        {
          size: "8 x 8 in",
          price: "$58.00"
        },
        {
          size: "10 x 10 in",
          price: "$65.00"
        },
        {
          size: "12 x 12 in", 
          price: "$76.00"
        }
      ],
      colorOptions: [
        "Black on White",
        "Black on Silver", 
        "Black on Gold",
        "Silver on Black",
        "Gold on Black",
        "White on Black",
        "White on Dark Blue",
        "Dark Blue on White"
      ],
      brailleOptions: ["With Braille", "Without Braille"],
      gallery: [
        "/lovable-uploads/91055f4b-ab58-45a7-8a16-66b44899231a.png",
        "/lovable-uploads/a2821ed3-1fb0-41c5-816e-6cfe71e71f5a.png"
      ],
      hasCustomSize: true
    },
    {
      id: "acrylic-all-gender-sign",
      name: "Acrylic All-Gender Sign",
      price: "from $38.00",
      rating: 4.9,
      reviews: 8,
      image: "/lovable-uploads/bb344bd6-4279-4063-971c-8980eb40b607.png",
      slug: "acrylic-all-gender-sign",
      category: "restroom-signs",
      subcategory: "all-gender-restroom-signs",
      description: "Premium acrylic all-gender restroom sign with ADA compliant design and braille. Available in multiple sizes and clear or frosted acrylic finishes.",
      materials: ["Clear Acrylic", "Frosted Acrylic"],
      designs: ["ADA Compliant"],
      badges: ["All Gender", "ADA Compliant", "Custom Sizing", "Premium"],
      sizeOptions: [
        {
          size: "9.8 x 4.7 in (250 x 120 mm)",
          price: "$38.00"
        },
        {
          size: "12 x 6 in (300 x 150 mm)",
          price: "$45.00"
        }
      ],
      colorOptions: ["Clear Acrylic", "Frosted Acrylic"],
      brailleOptions: ["With Braille", "Without Braille"],
      gallery: [
        "/lovable-uploads/bb344bd6-4279-4063-971c-8980eb40b607.png",
        "/lovable-uploads/54b498ee-7663-49ff-9ba3-62df22803645.png",
        "/lovable-uploads/fe031e77-6a52-4e48-aede-42c0fb9b37dc.png"
      ],
      hasCustomSize: true
    },
    {
      id: "all-gender-stainless-steel-sign",
      name: "All Gender Stainless Steel Sign",
      price: "from $58.00",
      rating: 4.9,
      reviews: 28,
      image: "/lovable-uploads/a1180aa1-483f-40b2-afbe-e89f615d60fe.png",
      slug: "all-gender-stainless-steel-sign",
      category: "restroom-signs",
      subcategory: "all-gender-restroom-signs",
      description: "Professional ADA-compliant all gender restroom sign with universal accessibility symbols. Features raised characters and Braille text for full compliance with accessibility standards.",
      materials: ["Stainless Steel", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
      badges: ["ADA Compliant", "All Gender", "Professional"],
      sizeOptions: [
        {
          size: "8 x 8 in",
          price: "$58.00"
        },
        {
          size: "10 x 10 in",
          price: "$65.00"
        },
        {
          size: "12 x 12 in", 
          price: "$76.00"
        }
      ],
      shapeOptions: ["Square", "Rectangle", "Circle"],
      brailleOptions: ["No", "Yes"],
      gallery: [
        "/lovable-uploads/a1180aa1-483f-40b2-afbe-e89f615d60fe.png",
        "/lovable-uploads/f13a17ac-6d43-4677-aa5f-0151203c3e1a.png"
      ],
      hasCustomSize: true
    }
  ],
  "door-number-signs": [
    {
      id: "door-number-wood-stainless-steel",
      name: "Door Number: Wood & Stainless Steel",
      price: "from $38.00",
      rating: 4.9,
      reviews: 8,
      image: "/lovable-uploads/c5345240-0a2b-489c-9170-5e6da30bd0cd.png",
      slug: "door-number-wood-stainless-steel",
      category: "door-number-signs",
      subcategory: "modern-door-numbers",
      description: "Premium wood and stainless steel door number sign with modern design. Features custom room numbers with ADA compliant design and braille options. Perfect for offices, hotels, and residential applications.",
      materials: ["Wood", "Stainless Steel", "Clear Acrylic"],
      designs: ["Modern", "ADA Compliant"],
      badges: ["Door Number", "ADA Compliant", "Custom Sizing", "Premium"],
      sizeOptions: [
        {
          size: "9.8 x 4.7 in (250 x 120 mm)",
          price: "$38.00"
        },
        {
          size: "12 x 6 in (300 x 150 mm)",
          price: "$45.00"
        }
      ],
      colorOptions: ["Wood & White", "Wood & Steel"],
      brailleOptions: ["With Braille", "Without Braille"],
      gallery: [
        "/lovable-uploads/c5345240-0a2b-489c-9170-5e6da30bd0cd.png",
        "/lovable-uploads/b59f1141-5985-4e89-b44d-31537031de9e.png"
      ],
      hasCustomSize: true
    }
  ],
  "info-signs": [
    {
      id: "acrylic-exam-room-sign",
      name: "Exam Room Sign",
      price: "from $38.00",
      rating: 4.9,
      reviews: 8,
      image: "/lovable-uploads/0b5aa5ed-ec14-47ab-8d6b-f8c178305836.png",
      slug: "acrylic-exam-room-sign",
      category: "info-signs",
      subcategory: "room-signs",
      description: "Premium acrylic exam room sign with ADA compliant design and braille. Available in multiple sizes and clear or frosted acrylic finishes.",
      materials: ["Clear Acrylic", "Frosted Acrylic"],
      designs: ["ADA Compliant"],
      badges: ["Exam Room", "ADA Compliant", "Custom Sizing", "Premium"],
      sizeOptions: [
        {
          size: "9.8 x 4.7 in (250 x 120 mm)",
          price: "$38.00"
        },
        {
          size: "12 x 6 in (300 x 150 mm)",
          price: "$45.00"
        }
      ],
      colorOptions: ["Clear Acrylic", "Frosted Acrylic"],
      brailleOptions: ["With Braille", "Without Braille"],
      gallery: [
        "/lovable-uploads/0b5aa5ed-ec14-47ab-8d6b-f8c178305836.png",
        "/lovable-uploads/9e1f7f2d-93fd-4706-9fdf-3a162a9cf873.png",
        "/lovable-uploads/a629cea7-8d9b-487c-8f52-1077092d149a.png"
      ],
      hasCustomSize: true
    },
    {
      id: "meeting-room-ada-sign",
      name: "Meeting Room ADA Sign",
      price: "from $58.00",
      rating: 4.9,
      reviews: 28,
      image: "/lovable-uploads/edab31ff-ad25-413e-af39-c0ef336d42b0.png",
      slug: "meeting-room-ada-sign",
      category: "info-signs",
      subcategory: "room-signs",
      description: "Professional ADA-compliant meeting room sign with universal accessibility symbols. Features raised characters and Braille text for full compliance with accessibility standards.",
      materials: ["Premium Acrylic", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
      badges: ["ADA Compliant", "Meeting Room", "Professional"],
      sizeOptions: [
        {
          size: "8 x 8 in",
          price: "$58.00"
        },
        {
          size: "10 x 10 in",
          price: "$65.00"
        },
        {
          size: "12 x 12 in", 
          price: "$76.00"
        }
      ],
      colorOptions: [
        "Black on White",
        "Black on Silver", 
        "Black on Gold",
        "Silver on Black",
        "Gold on Black",
        "White on Black",
        "White on Dark Blue",
        "Dark Blue on White"
      ],
      brailleOptions: ["With Braille", "Without Braille"],
      gallery: [
        "/lovable-uploads/edab31ff-ad25-413e-af39-c0ef336d42b0.png",
        "/lovable-uploads/cf5ec2e9-71b7-4db9-8ad8-2b69a7da04e3.png",
        "/lovable-uploads/3d81cbd2-417e-419f-9600-ca34f6a09c4c.png"
      ],
      hasCustomSize: true
    },
    {
      id: "reception-ada-sign",
      name: "Reception Sign",
      price: "from $58.00",
      rating: 4.9,
      reviews: 28,
      image: "/lovable-uploads/f27933ff-b3b0-4768-a1bc-abb3400d26ff.png",
      slug: "reception-ada-sign",
      category: "info-signs",
      subcategory: "room-signs",
      description: "Professional ADA-compliant reception sign with universal accessibility symbols. Features raised characters and Braille text for full compliance with accessibility standards.",
      materials: ["Premium Acrylic", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
      badges: ["ADA Compliant", "Reception", "Professional"],
      sizeOptions: [
        {
          size: "8 x 8 in",
          price: "$58.00"
        },
        {
          size: "10 x 10 in",
          price: "$65.00"
        },
        {
          size: "12 x 12 in", 
          price: "$76.00"
        }
      ],
      colorOptions: [
        "Black on White",
        "Black on Silver", 
        "Black on Gold",
        "Silver on Black",
        "Gold on Black",
        "White on Black",
        "White on Dark Blue",
        "Dark Blue on White"
      ],
      brailleOptions: ["With Braille", "Without Braille"],
      gallery: [
        "/lovable-uploads/f27933ff-b3b0-4768-a1bc-abb3400d26ff.png",
        "/lovable-uploads/e277b2db-e883-447d-9fd5-cb46dfa2ac7b.png",
        "/lovable-uploads/cd708b53-88fb-426d-9538-df1c2ea1d6f8.png"
      ],
      hasCustomSize: true
    }
  ],
  "prohibitory-signs": [
    {
      id: "no-bicycles-stainless-steel-sign",
      name: "No Bicycles Stainless Steel Sign",
      price: "from $58.00",
      rating: 4.9,
      reviews: 15,
      image: "/lovable-uploads/3621ad29-43c8-4cdd-9264-fe430c72044e.png",
      slug: "no-bicycles-stainless-steel-sign",
      category: "prohibitory-signs",
      subcategory: "no-bicycles-signs",
      description: "Professional ADA-compliant no bicycles sign with universal prohibition symbol. Features raised characters and Braille text for full compliance with accessibility standards.",
      materials: ["Stainless Steel", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
      badges: ["ADA Compliant", "No Bicycles", "Professional"],
      sizeOptions: [
        {
          size: "8 x 8 in",
          price: "$58.00"
        },
        {
          size: "10 x 10 in",
          price: "$65.00"
        },
        {
          size: "12 x 12 in", 
          price: "$76.00"
        }
      ],
      shapeOptions: ["Circle", "Square"],
      brailleOptions: ["With Braille", "Without Braille"],
      gallery: [
        "/lovable-uploads/3621ad29-43c8-4cdd-9264-fe430c72044e.png",
        "/lovable-uploads/a562b8d1-1b48-405b-9d3c-4cb0d3fa3873.png"
      ],
      hasCustomSize: true
    },
    {
      id: "no-guns-allowed-stainless-steel-sign",
      name: "No Guns Allowed Stainless Steel Sign",
      price: "from $58.00",
      rating: 4.9,
      reviews: 28,
      image: "/lovable-uploads/6e59739a-07c3-4416-8005-56773a75a34b.png",
      slug: "no-guns-allowed-stainless-steel-sign",
      category: "prohibitory-signs",
      subcategory: "no-guns-signs",
      description: "Professional ADA-compliant no guns allowed sign with universal prohibition symbol. Features raised characters and Braille text for full compliance with accessibility standards.",
      materials: ["Stainless Steel", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
      badges: ["ADA Compliant", "No Guns", "Professional"],
      sizeOptions: [
        {
          size: "8 x 8 in",
          price: "$58.00"
        },
        {
          size: "10 x 10 in",
          price: "$65.00"
        },
        {
          size: "12 x 12 in", 
          price: "$76.00"
        }
      ],
      shapeOptions: ["Circle", "Square"],
      brailleOptions: ["With Braille", "Without Braille"],
      gallery: [
        "/lovable-uploads/6e59739a-07c3-4416-8005-56773a75a34b.png",
        "/lovable-uploads/31a3ba54-4b02-427a-802c-d5a92f80eeca.png"
      ],
      hasCustomSize: true
    },
    {
      id: "no-loitering-stainless-steel-sign",
      name: "No Loitering Stainless Steel Sign",
      image: "/assets/no-loitering-sign.png",
      description: "Professional no loitering signage with premium stainless steel construction and optional braille. Perfect for commercial properties, parking areas, and retail spaces requiring clear access control messaging.",
      price: "from $75.00",
      originalPrice: "",
      rating: 4.8,
      reviews: 89,
      category: "prohibitory-signs",
      badges: ["ADA Compliant", "No Loitering", "Professional"],
      sizeOptions: [
        {
          size: "9.8 x 5.9 in",
          price: "$75.00"
        },
        {
          size: "11.7 x 8.3 in",
          price: "$110.00"
        }
      ],
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/assets/no-loitering-sign.png"
      ],
      hasCustomSize: false
    },
    {
      id: "no-food-allowed-stainless-steel-sign",
      name: "No Food Allowed Stainless Steel Sign",
      image: "/assets/no-food-allowed-sign-1.png",
      description: "Premium no food allowed signage with professional stainless steel finish and optional braille. Ideal for clean rooms, laboratories, computer areas, and facilities requiring food-free environments.",
      price: "from $40.00",
      originalPrice: "",
      rating: 4.9,
      reviews: 112,
      category: "prohibitory-signs",
      badges: ["ADA Compliant", "No Food", "Professional"],
      sizeOptions: [
        {
          size: "4.7 x 4.7 in",
          price: "$40.00"
        },
        {
          size: "6.3 x 6.3 in",
          price: "$52.00"
        }
      ],
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/assets/no-food-allowed-sign-1.png",
        "/assets/no-food-allowed-sign-2.png"
      ],
      hasCustomSize: false
    }
  ]
};

export const getCategoryProducts = (category: string): Product[] => {
  return productsData[category] || [];
};

export const getAllProducts = (): Product[] => {
  return Object.values(productsData).flat();
};

export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};

export const getCategoryTitle = (category: string): string => {
  const titles: Record<string, string> = {
    'door-number-signs': 'Door Number Signs', 
    'restroom-signs': 'Restroom Signs',
    'info-signs': 'Info Signs',
    'prohibitory-signs': 'Prohibitory Signs',
    'best-sellers': 'Best Sellers',
    'new': 'New Products'
  };
  return titles[category] || category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};