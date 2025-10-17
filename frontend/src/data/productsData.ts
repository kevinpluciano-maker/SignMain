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
  hasCustomNumberField?: boolean;
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/lovable-uploads/91055f4b-ab58-45a7-8a16-66b44899231a.png",
        "/lovable-uploads/a2821ed3-1fb0-41c5-816e-6cfe71e71f5a.png"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
    },
    {
      id: "men-restroom-sign",
      name: "Men Restroom Sign",
      price: "from $58.00",
      rating: 4.9,
      reviews: 28,
      image: "https://customer-assets.emergentagent.com/job_code-explorer-82/artifacts/w7peoy4d_e9d178e6.jpg",
      slug: "men-restroom-sign",
      category: "restroom-signs",
      subcategory: "mens-restroom-signs",
      description: "Professional ADA-compliant men's restroom sign with universal accessibility symbols. Features raised characters and Braille text for full compliance with accessibility standards.",
      materials: ["Premium Acrylic", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
      badges: ["ADA Compliant", "Men's", "Professional"],
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "https://customer-assets.emergentagent.com/job_code-explorer-82/artifacts/w7peoy4d_e9d178e6.jpg",
        "https://customer-assets.emergentagent.com/job_code-explorer-82/artifacts/wqwzwsoc_39f76176.jpg"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
    },
    {
      id: "women-restroom-sign",
      name: "Women Restroom Sign",
      price: "from $58.00",
      rating: 4.9,
      reviews: 28,
      image: "https://customer-assets.emergentagent.com/job_code-explorer-82/artifacts/ky0tjfnj_f0785328%20%281%29.jpg",
      slug: "women-restroom-sign",
      category: "restroom-signs",
      subcategory: "womens-restroom-signs",
      description: "Professional ADA-compliant women's restroom sign with universal accessibility symbols. Features raised characters and Braille text for full compliance with accessibility standards.",
      materials: ["Premium Acrylic", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
      badges: ["ADA Compliant", "Women's", "Professional"],
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "https://customer-assets.emergentagent.com/job_code-explorer-82/artifacts/ky0tjfnj_f0785328%20%281%29.jpg",
        "https://customer-assets.emergentagent.com/job_code-explorer-82/artifacts/f0jlsyqj_773c23c9.jpg"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/lovable-uploads/bb344bd6-4279-4063-971c-8980eb40b607.png",
        "/lovable-uploads/54b498ee-7663-49ff-9ba3-62df22803645.png",
        "/lovable-uploads/fe031e77-6a52-4e48-aede-42c0fb9b37dc.png"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
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
      hasCustomSize: true,
      hasCustomNumberField: true
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/lovable-uploads/c5345240-0a2b-489c-9170-5e6da30bd0cd.png",
        "/lovable-uploads/b59f1141-5985-4e89-b44d-31537031de9e.png"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/lovable-uploads/0b5aa5ed-ec14-47ab-8d6b-f8c178305836.png",
        "/lovable-uploads/9e1f7f2d-93fd-4706-9fdf-3a162a9cf873.png",
        "/lovable-uploads/a629cea7-8d9b-487c-8f52-1077092d149a.png"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/lovable-uploads/edab31ff-ad25-413e-af39-c0ef336d42b0.png",
        "/lovable-uploads/cf5ec2e9-71b7-4db9-8ad8-2b69a7da04e3.png",
        "/lovable-uploads/3d81cbd2-417e-419f-9600-ca34f6a09c4c.png"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/lovable-uploads/f27933ff-b3b0-4768-a1bc-abb3400d26ff.png",
        "/lovable-uploads/e277b2db-e883-447d-9fd5-cb46dfa2ac7b.png",
        "/lovable-uploads/cd708b53-88fb-426d-9538-df1c2ea1d6f8.png"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
    },
    {
      id: "roof-access-stainless-steel-sign",
      name: "Roof Access — Stainless Steel",
      image: "https://customer-assets.emergentagent.com/job_coderecon/artifacts/c21i1mwb_b7b8bb37%20%281%29.jpg",
      slug: "roof-access-stainless-steel-sign",
      description: "Professional roof access signage with ladder pictogram and premium stainless steel construction. Features clear directional indication with optional braille. Essential for commercial buildings, offices, and industrial facilities requiring clear roof access identification.",
      price: "from $27.00",
      originalPrice: "",
      rating: 4.8,
      reviews: 67,
      category: "info-signs",
      subcategory: "access-signs",
      materials: ["Stainless Steel", "Raised Characters", "Braille Dots"],
      designs: ["Modern", "ADA Compliant"],
      badges: ["Roof Access", "ADA Compliant", "Professional"],
      sizeOptions: [
        {
          size: "3.9 x 3.9 in",
          price: "$27.00"
        },
        {
          size: "5.9 x 5.9 in",
          price: "$40.00"
        }
      ],
      brailleOptions: ["Yes", "No"],
      gallery: [
        "https://customer-assets.emergentagent.com/job_coderecon/artifacts/c21i1mwb_b7b8bb37%20%281%29.jpg"
      ],
      hasCustomSize: false
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/lovable-uploads/3621ad29-43c8-4cdd-9264-fe430c72044e.png",
        "/lovable-uploads/a562b8d1-1b48-405b-9d3c-4cb0d3fa3873.png"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
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
      brailleOptions: ["Yes", "No"],
      gallery: [
        "/lovable-uploads/6e59739a-07c3-4416-8005-56773a75a34b.png",
        "/lovable-uploads/31a3ba54-4b02-427a-802c-d5a92f80eeca.png"
      ],
      hasCustomSize: true,
      hasCustomNumberField: true
    },
    {
      id: "no-loitering-stainless-steel-sign",
      name: "No Loitering Stainless Steel Sign",
      image: "https://customer-assets.emergentagent.com/job_coderecon/artifacts/hsllkut0_d6b662cb.jpg",
      slug: "no-loitering-stainless-steel-sign",
      description: "Professional no loitering signage with premium stainless steel construction and optional braille. Perfect for commercial properties, parking areas, and retail spaces requiring clear access control messaging.",
      price: "from $75.00",
      originalPrice: "",
      rating: 4.8,
      reviews: 89,
      category: "prohibitory-signs",
      subcategory: "no-loitering-signs",
      materials: ["Stainless Steel", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
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
        "https://customer-assets.emergentagent.com/job_coderecon/artifacts/hsllkut0_d6b662cb.jpg"
      ],
      hasCustomSize: false
    },
    {
      id: "no-food-allowed-stainless-steel-sign",
      name: "No Food Allowed Stainless Steel Sign",
      image: "https://customer-assets.emergentagent.com/job_coderecon/artifacts/xtddtk3x_0548605f.jpg",
      slug: "no-food-allowed-stainless-steel-sign",
      description: "Premium no food allowed signage with professional stainless steel finish and optional braille. Ideal for clean rooms, laboratories, computer areas, and facilities requiring food-free environments.",
      price: "from $40.00",
      originalPrice: "",
      rating: 4.9,
      reviews: 112,
      category: "prohibitory-signs",
      subcategory: "no-food-signs",
      materials: ["Stainless Steel", "Raised Characters", "Braille Dots"],
      designs: ["ADA Compliant"],
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
        "https://customer-assets.emergentagent.com/job_coderecon/artifacts/xtddtk3x_0548605f.jpg",
        "https://customer-assets.emergentagent.com/job_coderecon/artifacts/7dsczgo3_7b01a990.jpg"
      ],
      hasCustomSize: false
    },
    {
      id: "pull-door-stainless-steel-sign",
      name: "Pull Door Sign — Stainless Steel",
      image: "https://customer-assets.emergentagent.com/job_coderecon/artifacts/gevm1ol8_d99fd894.jpg",
      slug: "pull-door-stainless-steel-sign",
      description: "Professional pull door signage with clear pictogram and premium stainless steel construction. Features clear directional indication with optional braille. Perfect for office buildings, retail spaces, and commercial facilities.",
      price: "from $27.00",
      originalPrice: "",
      rating: 4.7,
      reviews: 45,
      category: "info-signs",
      subcategory: "door-operation-signs",
      materials: ["Stainless Steel", "Raised Characters", "Braille Dots"],
      designs: ["Modern", "Clear Pictogram"],
      badges: ["Pull Door", "Professional", "Clear Direction"],
      sizeOptions: [
        {
          size: "3.9 x 3.9 in",
          price: "$27.00"
        },
        {
          size: "5.9 x 5.9 in",
          price: "$40.00"
        }
      ],
      brailleOptions: ["Yes", "No"],
      gallery: [
        "https://customer-assets.emergentagent.com/job_coderecon/artifacts/gevm1ol8_d99fd894.jpg",
        "https://customer-assets.emergentagent.com/job_coderecon/artifacts/hkao4lc1_4bda01e1.jpg"
      ],
      hasCustomSize: false
    }
  ],
  "di-noc": [
    {
      id: "wood-grain-architectural-film",
      name: "Wood Grain Architectural Film",
      image: "https://customer-assets.emergentagent.com/job_coderecon/artifacts/qly5lu5i_202509191706%20%281%29%20%281%29.mp4",
      slug: "wood-grain-architectural-film",
      description: "Premium architectural film with realistic wood grain texture. Self-adhesive and easy to install on flat and curved surfaces. Perfect for doors, furniture, walls, and interior design applications.",
      price: "from $45.00",
      originalPrice: "$65.00",
      rating: 4.9,
      reviews: 124,
      category: "di-noc",
      subcategory: "wood-finishes",
      materials: ["Architectural Film", "Self-Adhesive", "Fire Resistant"],
      designs: ["Wood Grain", "Natural Texture", "Modern"],
      badges: ["Eco-Friendly", "Fire Resistant", "10+ Year Durability"],
      sizeOptions: [
        {
          size: "24 x 48 in",
          price: "$45.00"
        },
        {
          size: "36 x 60 in", 
          price: "$75.00"
        },
        {
          size: "48 x 96 in",
          price: "$125.00"
        }
      ],
      colorOptions: ["Natural Oak", "Dark Walnut", "Cherry Wood", "Maple", "Teak"],
      gallery: [
        "https://customer-assets.emergentagent.com/job_coderecon/artifacts/qly5lu5i_202509191706%20%281%29%20%281%29.mp4"
      ],
      hasCustomSize: true
    },
    {
      id: "stone-texture-architectural-film",
      name: "Stone Texture Architectural Film",
      image: "https://customer-assets.emergentagent.com/job_coderecon/artifacts/qly5lu5i_202509191706%20%281%29%20%281%29.mp4",
      slug: "stone-texture-architectural-film",
      description: "High-quality architectural film replicating natural stone textures. Antimicrobial properties and low VOC emissions for healthy indoor environments. Ideal for wall panels, furniture, and commercial applications.",
      price: "from $52.00",
      originalPrice: "",
      rating: 4.8,
      reviews: 89,
      category: "di-noc",
      subcategory: "stone-finishes",
      materials: ["Architectural Film", "Antimicrobial", "Low VOC"],
      designs: ["Stone Texture", "Natural Pattern", "Contemporary"],
      badges: ["Antimicrobial", "Eco-Friendly", "Commercial Grade"],
      sizeOptions: [
        {
          size: "24 x 48 in",
          price: "$52.00"
        },
        {
          size: "36 x 60 in",
          price: "$85.00"
        },
        {
          size: "48 x 96 in",
          price: "$140.00"
        }
      ],
      colorOptions: ["Marble White", "Granite Gray", "Slate Black", "Sandstone Beige"],
      gallery: [
        "https://customer-assets.emergentagent.com/job_coderecon/artifacts/qly5lu5i_202509191706%20%281%29%20%281%29.mp4"
      ],
      hasCustomSize: true
    },
    {
      id: "brushed-metal-architectural-film",
      name: "Brushed Metal Architectural Film",
      image: "https://customer-assets.emergentagent.com/job_coderecon/artifacts/qly5lu5i_202509191706%20%281%29%20%281%29.mp4",
      slug: "brushed-metal-architectural-film",
      description: "Professional brushed metal architectural film with realistic metallic finish. Class A fire safety rating and superior durability. Perfect for elevator panels, door frames, and modern interior accents.",
      price: "from $48.00",
      originalPrice: "",
      rating: 4.7,
      reviews: 76,
      category: "di-noc",
      subcategory: "metal-finishes",
      materials: ["Architectural Film", "Fire Resistant", "Scratch Resistant"],
      designs: ["Brushed Metal", "Industrial", "Modern"],
      badges: ["Fire Resistant", "Scratch Resistant", "Professional Grade"],
      sizeOptions: [
        {
          size: "24 x 48 in",
          price: "$48.00"
        },
        {
          size: "36 x 60 in",
          price: "$78.00"
        },
        {
          size: "48 x 96 in",
          price: "$135.00"
        }
      ],
      colorOptions: ["Brushed Aluminum", "Stainless Steel", "Bronze", "Copper"],
      gallery: [
        "https://customer-assets.emergentagent.com/job_coderecon/artifacts/qly5lu5i_202509191706%20%281%29%20%281%29.mp4"
      ],
      hasCustomSize: true
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

// Enhanced smart category assignment based on product names and keywords
export const assignCategoryByName = (productName: string): string => {
  const name = productName.toLowerCase();
  
  // Door number signs - comprehensive matching
  if (name.includes('door number') || name.includes('room number') || name.includes('suite number') || 
      name.includes('office number') || name.includes('apartment number') || name.includes('hotel number') ||
      name.includes('wood & stainless steel') || name.includes('door numbers')) {
    return 'door-number-signs';
  }
  
  // Restroom signs - comprehensive matching
  if (name.includes('restroom') || name.includes('bathroom') || name.includes('staff') || 
      name.includes('all-gender') || name.includes('unisex') || name.includes('washroom') ||
      name.includes('men') || name.includes('women') || name.includes('toilet')) {
    return 'restroom-signs';
  }
  
  // Info signs - comprehensive matching
  if (name.includes('exam room') || name.includes('meeting room') || name.includes('conference') || 
      name.includes('reception') || name.includes('office') || name.includes('roof access') ||
      name.includes('emergency') || name.includes('exit') || name.includes('entrance') ||
      name.includes('information') || name.includes('directory')) {
    return 'info-signs';
  }
  
  // Prohibitory signs - comprehensive matching
  if (name.includes('no ') || name.includes('prohibited') || name.includes('not allowed') || 
      name.includes('pull door') || name.includes('push door') || name.includes('do not') ||
      name.includes('forbidden') || name.includes('restricted') || name.includes('ban') ||
      name.includes('loitering') || name.includes('smoking') || name.includes('food') ||
      name.includes('bicycles') || name.includes('guns')) {
    return 'prohibitory-signs';
  }
  
  // Default fallback
  return 'info-signs';
};

// Function to automatically categorize all products
export const autoCategorizAllProducts = (): void => {
  const allProducts = getAllProducts();
  let categorizedCount = 0;
  
  allProducts.forEach(product => {
    const suggestedCategory = assignCategoryByName(product.name);
    if (product.category !== suggestedCategory) {
      // In a real app, this would update the database
      console.log(`Product "${product.name}" should be moved from "${product.category}" to "${suggestedCategory}"`);
      categorizedCount++;
    }
  });
  
  console.log(`Auto-categorization complete. ${categorizedCount} products need category updates.`);
};

// Function to validate product placement
export const validateProductCategories = (): Array<{product: string, current: string, suggested: string}> => {
  const allProducts = getAllProducts();
  const mismatches = [];
  
  allProducts.forEach(product => {
    const suggestedCategory = assignCategoryByName(product.name);
    if (product.category !== suggestedCategory) {
      mismatches.push({
        product: product.name,
        current: product.category,
        suggested: suggestedCategory
      });
    }
  });
  
  return mismatches;
};

// Enhanced category products retrieval with smart fallback
export const getCategoryProductsSmart = (category: string): Product[] => {
  // Try direct category match first
  let products = productsData[category] || [];
  
  // If no products found, try to find products by auto-assignment
  if (products.length === 0) {
    const allProducts = getAllProducts();
    products = allProducts.filter(product => {
      const assignedCategory = assignCategoryByName(product.name);
      return assignedCategory === category;
    });
  }
  
  return products;
};

export const getCategoryTitle = (category: string): string => {
  const titles: Record<string, string> = {
    'door-number-signs': 'Door Number Signs', 
    'restroom-signs': 'Restroom Signs',
    'info-signs': 'Info Signs',
    'prohibitory-signs': 'Prohibitory Signs',
    'di-noc': 'Di-Noc Architectural Film',
    'best-sellers': 'Best Sellers',
    'new': 'New Products'
  };
  return titles[category] || category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};