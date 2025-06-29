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
      "Soapnut, Wild Turmeric, Sweet Flag, Vetiver Root, Green Gram, Aromatic Rice, Nutmeg, Mace, Indian Sarsaparilla, Tanner’s Cassia Flower, Dried Rose Petals, Hibiscus Flower, Indian Madder (Manjistha), Dried Lemon Peel, Dried Orange Peel, Bengal Gram (Chana Dal), Wheat, Spanish Cherry Flower, Caltrop Seeds and our special herb aurora ingredients.[சீயக்காய், பூலாங்கிழங்கு, வசம்பு, வெட்டிவேர், பச்சை பயறு, கார்போக அரிசி, ஜாதிக்காய், மாசிக்காய், நன்னாரி, ஆவாரம் பூ, உலர்ந்த ரோஜா இதழ்கள், செம்பருத்தி பூ, மஞ்சிஷ்டா, எலுமிச்சை தோல், ஆரஞ்சு தோல், கடலை பருப்பு, கோதுமை, மகிழம் பூ, பூந்தி கொட்டை மற்றும் எங்கள் Herb Aurora வின் சிறப்பான மூலிகைகள்.]",
    usage:
      "Mix with water to form a paste. Apply evenly on the body while bathing.Gently massage for 2–3 minutes and rinse off with water.You can gradually replace your regular body wash or face wash with this natural alternative.",
    images: [
      "/images/products/forHim1.jpg",
      "/images/products/forHim2.jpg",
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
        price: 159,
        weight: "100 grams",
      },
      {
        size: "250g",
        price: 319,
        weight: "250 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight and water.",
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
      "Soapnut, Wild Turmeric, Sweet Flag, Vetiver Root, Green Gram, Aromatic Rice, Nutmeg, Mace, Indian Sarsaparilla, Tanner’s Cassia Flower, Dried Rose Petals, Hibiscus Flower, Indian Madder, Dried Lemon Peel, Dried Orange Peel, Bengal Gram (Chana Dal), Wheat, Spanish Cherry Flower, Caltrop Seeds and our special herb aurora ingredients.[சீயக்காய், பூலாங்கிழங்கு, வசம்பு, வெட்டிவேர், பச்சை பயறு, கார்போக அரிசி, ஜாதிக்காய், மாசிக்காய், நன்னாரி, ஆவாரம் பூ, உலர்ந்த ரோஜா இதழ்கள், செம்பருத்தி பூ, மஞ்சிஷ்டா, எலுமிச்சை தோல், ஆரஞ்சு தோல், கடலை பருப்பு, கோதுமை, மகிழம் பூ, பூந்தி கொட்டை மற்றும் எங்கள் Herb Aurora வின் சிறப்பான மூலிகைகள்.]",
    usage:
      "Mix with water to form a paste. Apply evenly on the body while bathing.Gently massage for 2–3 minutes and rinse off with water.You can gradually replace your regular body wash or face wash with this natural alternative.",
    images: [
      "/images/products/forHer1.jpg",
      "/images/products/forHer2.jpg",
      // "/images/products/forHer3.jpg",
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
        price: 159,
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
      "Green Gram, Bengal Gram, Sweet Flag, Aromatic Rice, Tanner’s Cassia Flower, Vetiver Root, Dried Rose Petals, Wild Turmeric, Wheat and our special herb aurora ingredients.[பச்சை பயறு, கடலை பருப்பு, வசம்பு, கார்போக அரிசி, ஆவாரம் பூ, வெட்டிவேர், உலர்ந்த ரோஜா இதழ்கள், பூலாங்கிழங்கு, கோதுமை மற்றும் எங்கள் Herb Aurora வின் சிறப்பான மூலிகைகள்.]",
    usage:
      "Mix with water to form a paste. Apply evenly on the body while bathing.Gently massage for 2–3 minutes and rinse off with water.You can gradually replace your regular body wash or face wash with this natural alternative.",
    images: [
      "/images/products/babyBoy1.jpg",
      // "/images/products/babyBoy2.jpg",
      // "/images/products/babyBoy3.jpg",
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
        price: 349,
        weight: "250 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight and water.",
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
      "Green Gram, Bengal Gram, Sweet Flag, Aromatic Rice, Tanner’s Cassia Flower, Vetiver Root, Dried Rose Petals, Wild Turmeric, Musk Turmeric and our special Herb Aurora ingredients.[பச்சை பயறு, கடலை பருப்பு, வசம்பு, கார்போக அரிசி, ஆவாரம் பூ, வெட்டிவேர், உலர்ந்த ரோஜா இதழ்கள், பூலாங்கிழங்கு, கஸ்தூரி மஞ்சள் மற்றும் எங்கள் Herb Aurora வின் சிறப்பான மூலிகைகள்.]",
    usage:
      "Mix with water to form a paste. Apply evenly on the body while bathing.Gently massage for 2–3 minutes and rinse off with water.You can gradually replace your regular body wash or face wash with this natural alternative.",
    images: [
      "/images/products/babyGirl1.jpg",
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
        price: 349,
        weight: "250 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight and water.",
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
