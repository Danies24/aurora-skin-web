export interface ProductVariant {
  size: string;
  price: number;
  weight: string;
}

export interface Product {
  id: string;
  name: string;
  target: string;
  benefit: string;
  description: string;
  ingredients: string;
  usage: string;
  images: string[];
  color: string;
  features?: string[];
  variants: ProductVariant[];
  shelfLife?: string;
  storage?: string;
  warnings?: string;
  rank: number;
  category: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: "bathing-powder-men",
    name: "Bathing Powder for Him",
    target: "For Men",
    benefit: "Natural cleansing and refreshing bath powder for men",
    description:
      "Our specially formulated bathing powder for men combines natural ingredients to provide a refreshing and cleansing experience. Made with authentic Tamil herbs, this powder helps maintain healthy skin while providing a refreshing bathing experience.",
    ingredients:
      "Turmeric, Sandalwood, Multani Mitti, Neem, and other natural herbs",
    usage:
      "Mix with water to form a paste. Apply evenly on body while bathing. Leave for 2-3 minutes and wash off with water.",
    images: [
      "/images/products/forHim1.jpg",
      "/images/products/forHim2.jpg",
      "/images/products/forHim3.jpg",
      "/images/products/forHim4.jpg",
    ],
    color: "herb-turmeric",
    features: [
      "Natural cleansing",
      "Refreshing fragrance",
      "Suitable for daily use",
      "No harmful chemicals",
    ],
    variants: [
      {
        size: "100g",
        price: 169,
        weight: "100 grams",
      },
      {
        size: "250g",
        price: 300,
        weight: "250 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight",
    warnings: "For external use only. Do a patch test before use.",
    rank: 1,
    category: "Bath Powder",
    rating: 4.5,
  },
  {
    id: "bathing-powder-women",
    name: "Bathing Powder for Her",
    target: "For Women",
    benefit: "Gentle and nourishing bath powder for women",
    description:
      "Our specially formulated bathing powder for women combines gentle natural ingredients to provide a nourishing and refreshing bathing experience. Made with authentic Tamil herbs, this powder helps maintain soft, healthy skin while providing a luxurious bathing experience.",
    ingredients:
      "Turmeric, Sandalwood, Multani Mitti, Rose Petals, and other natural herbs",
    usage:
      "Mix with water to form a paste. Apply evenly on body while bathing. Leave for 2-3 minutes and wash off with water.",
    images: [
      "/images/products/forHer1.jpg",
      "/images/products/forHer2.jpg",
      "/images/products/forHer3.jpg",
      "/images/products/forHer4.jpg",
    ],
    color: "herb-rose",
    features: [
      "Gentle cleansing",
      "Nourishing formula",
      "Suitable for daily use",
      "No harmful chemicals",
    ],
    variants: [
      {
        size: "100g",
        price: 169,
        weight: "100 grams",
      },
      {
        size: "250g",
        price: 300,
        weight: "250 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight",
    warnings: "For external use only. Do a patch test before use.",
    rank: 1,
    category: "Bath Powder",
    rating: 4.5,
  },
  {
    id: "bathing-powder-baby-boy",
    name: "Bathing Powder for Baby Boy",
    target: "For Kids",
    benefit: "Gentle and safe bathing powder for baby boys",
    description:
      "Our specially formulated bathing powder for baby boys is made with extra gentle ingredients to ensure a safe and comfortable bathing experience. Made with natural herbs, this powder helps maintain soft, healthy skin while being completely safe for your little one.",
    ingredients:
      "Chickpea Flour, Sandalwood, Multani Mitti, and other gentle natural herbs",
    usage:
      "Mix with water to form a gentle paste. Apply evenly on baby's skin while bathing. Leave for 1-2 minutes and wash off with water.",
    images: [
      "/images/products/babyBoy1.jpg",
      "/images/products/babyBoy2.jpg",
      "/images/products/babyBoy3.jpg",
      "/images/products/babyBoy4.jpg",
    ],
    color: "herb-green-light",
    features: [
      "Extra gentle formula",
      "Safe for baby skin",
      "Natural ingredients",
      "No harmful chemicals",
    ],
    variants: [
      {
        size: "100g",
        price: 179,
        weight: "100 grams",
      },
      {
        size: "250g",
        price: 319,
        weight: "250 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight",
    warnings: "For external use only. Do a patch test before use.",
    rank: 1,
    category: "Baby Bath Powder",
    rating: 4.5,
  },
  {
    id: "bathing-powder-baby-girl",
    name: "Bathing Powder for Baby Girl",
    target: "For Kids",
    benefit: "Gentle and safe bathing powder for baby girls",
    description:
      "Our specially formulated bathing powder for baby girls is made with extra gentle ingredients to ensure a safe and comfortable bathing experience. Made with natural herbs, this powder helps maintain soft, healthy skin while being completely safe for your little one.",
    ingredients:
      "Chickpea Flour, Sandalwood, Multani Mitti, and other gentle natural herbs",
    usage:
      "Mix with water to form a gentle paste. Apply evenly on baby's skin while bathing. Leave for 1-2 minutes and wash off with water.",
    images: [
      "/images/products/babyGirl1.jpg",
      "/images/products/babyGirl2.jpg",
      "/images/products/babyGirl3.jpg",
      "/images/products/babyGirl4.jpg",
    ],
    color: "herb-pink",
    features: [
      "Extra gentle formula",
      "Safe for baby skin",
      "Natural ingredients",
      "No harmful chemicals",
    ],
    variants: [
      {
        size: "100g",
        price: 179,
        weight: "100 grams",
      },
      {
        size: "250g",
        price: 319,
        weight: "250 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight",
    warnings: "For external use only. Do a patch test before use.",
    rank: 1,
    category: "Baby Bath Powder",
    rating: 4.5,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByTarget = (target: string): Product[] => {
  return products.filter((product) => product.target === target);
};

export const getAllProducts = (): Product[] => {
  return products;
};
