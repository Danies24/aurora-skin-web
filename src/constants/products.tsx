export interface ProductVariant {
  size: string;
  price: number;
  weight: string;
  strikedPrice?: number;
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
  strikedPrice?: number;
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
        strikedPrice: 199,
        weight: "100 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight and water.",
    warnings: "For external use only. Do a patch test before use.",
    rank: 1,
    category: "Bathing Powder",
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
        strikedPrice: 199,
        weight: "100 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight",
    warnings: "For external use only. Do a patch test before use.",
    rank: 1,
    category: "Bathing Powder",
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
    images: ["/images/products/babyBoy1.jpg", "/images/products/babyBoy4.jpg"],
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
        strikedPrice: 219,
        weight: "100 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight and water.",
    warnings: "For external use only. Do a patch test before use.",
    rank: 1,
    category: "Bathing Powder",
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
        strikedPrice: 219,
        weight: "100 grams",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight and water.",
    warnings: "For external use only. Do a patch test before use.",
    rank: 1,
    category: "Bathing Powder",
    rating: 4.5,
  },
  {
    id: "combo-baby-boy-family",
    name: "Bathing Powder – Family Combo (Baby Boy)",
    target: "For Family",
    benefit: "Gentle and safe bathing powder for husband, wife, and baby boy.",
    description:
      "A specially curated combo for a young family — includes natural and safe bathing powders for husband, wife, and their little boy. Made with authentic Tamil herbs and no harmful chemicals.",
    ingredients:
      "Green Gram, Bengal Gram, Sweet Flag, Aromatic Rice, Tanner’s Cassia Flower, Vetiver Root, Dried Rose Petals, Wild Turmeric, Musk Turmeric and our special Herb Aurora ingredients. [பச்சை பயறு, கடலை பருப்பு, வசம்பு, கார்போக அரிசி, ஆவாரம் பூ, வெட்டிவேர், உலர்ந்த ரோஜா இதழ்கள், பூலாங்கிழங்கு, கஸ்தூரி மஞ்சள் மற்றும் எங்கள் Herb Aurora வின் சிறப்பான மூலிகைகள்.]",
    usage:
      "Mix with water to form a paste. Apply evenly on the body while bathing. Gently massage for 2–3 minutes and rinse off. Ideal for daily use.",
    images: [
      "/images/products/boyFamily1.jpg",
      "/images/products/boyFamily2.jpg",
      "/images/products/boyFamily3.jpg",
      "/images/products/boyFamily4.jpg",
    ],
    color: "herb-green-light",
    features: [
      "Combo for Dad, Mom & Baby Boy",
      "Gentle for baby skin",
      "Natural cleansing for adults",
      "No harmful chemicals",
    ],
    variants: [
      {
        size: "Combo Pack",
        price: 499,
        strikedPrice: 599,
        weight: "300 grams (3×100g)",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from direct sunlight and water.",
    warnings: "For external use only. Do a patch test before use.",
    rank: 1,
    category: "Combo Pack",
    rating: 4.7,
  },
  {
    id: "combo-baby-girl-family",
    name: "Bathing Powder – Family Combo (Baby Girl)",
    target: "For Family",
    benefit: "Gentle and safe bathing powder for husband, wife, and baby girl.",
    description:
      "Perfect combo for young families with a baby girl — includes safe and natural skin care powders for all. Crafted with love and traditional herbs.",
    ingredients:
      "Green Gram, Bengal Gram, Sweet Flag, Aromatic Rice, Tanner’s Cassia Flower, Vetiver Root, Dried Rose Petals, Wild Turmeric, Musk Turmeric and our special Herb Aurora ingredients. [பச்சை பயறு, கடலை பருப்பு, வசம்பு, கார்போக அரிசி, ஆவாரம் பூ, வெட்டிவேர், உலர்ந்த ரோஜா இதழ்கள், பூலாங்கிழங்கு, கஸ்தூரி மஞ்சள் மற்றும் எங்கள் Herb Aurora வின் சிறப்பான மூலிகைகள்.]",
    usage:
      "Mix with water to form a paste. Apply on the body. Gently scrub and rinse. Suitable for adults and kids.",
    images: [
      "/images/products/girlFamily1.jpg",
      "/images/products/girlFamily2.jpg",
      "/images/products/girlFamily3.jpg",
      "/images/products/girlFamily4.jpg",
    ],
    color: "herb-pink",
    features: [
      "Combo for Dad, Mom & Baby Girl",
      "Gentle & nourishing",
      "Family-safe herbal formula",
      "100% Natural ingredients",
    ],
    variants: [
      {
        size: "Combo Pack",
        price: 499,
        strikedPrice: 599,
        weight: "300 grams (3×100g)",
      },
    ],
    shelfLife: "12 months",
    storage: "Store in a cool, dry place away from sunlight.",
    warnings: "Do not ingest. For external use only.",
    rank: 1,
    category: "Combo Pack",
    rating: 4.7,
  },
  {
    id: "combo-couple-pack",
    name: "Couple Combo – Him & Her",
    target: "For Couples",
    benefit: "Perfect herbal combo for couples – refreshing & nourishing.",
    description:
      "A romantic combo designed for couples who love to pamper their skin together. Includes one pack each for men and women, made with traditional Tamil ingredients.",
    ingredients:
      "Soapnut, Wild Turmeric, Sweet Flag, Vetiver, Green Gram, Aromatic Rice, Rose Petals, Mace, Indian Sarsaparilla and Herb Aurora ingredients. [சீயக்காய், பூலாங்கிழங்கு, வசம்பு, வெட்டிவேர், பச்சை பயறு, கார்போக அரிசி, ரோஜா இதழ்கள் மற்றும் எங்கள் Herb Aurora வின் மூலிகைகள்.]",
    usage:
      "Mix with water and apply on face & body. Ideal for replacing regular face/body wash.",
    images: [
      "/images/products/coupleCombo1.jpg",
      "/images/products/coupleCombo2.jpg",
      "/images/products/coupleCombo3.jpg",
    ],
    color: "herb-duo",
    features: [
      "Includes: 1 Him + 1 Her",
      "Skin brightening",
      "No artificial fragrance",
      "Couple-friendly combo",
    ],
    variants: [
      {
        size: "Combo Pack",
        price: 349,
        strikedPrice: 399,
        weight: "200 grams (2×100g)",
      },
    ],
    shelfLife: "12 months",
    storage: "Keep dry. Avoid direct sun.",
    warnings: "Patch test before use. External use only.",
    rank: 1,
    category: "Combo Pack",
    rating: 4.6,
  },
  {
    id: "combo-whole-family",
    name: "Whole Family Combo – 4 Variants",
    target: "For Entire Family",
    benefit:
      "Complete natural skin care for dad, mom, baby boy, and baby girl.",
    description:
      "Our ultimate combo – crafted for the entire family with love and care. From adults to kids, everyone gets the herbal care they deserve with Herb Aurora.",
    ingredients:
      "Green Gram, Bengal Gram, Vetiver, Sweet Flag, Aromatic Rice, Rose Petals, Wild Turmeric, Musk Turmeric and other special ingredients. [பச்சை பயறு, கடலை பருப்பு, வசம்பு, கார்போக அரிசி, வெட்டிவேர், ரோஜா இதழ்கள், பூலாங்கிழங்கு மற்றும் Herb Aurora மூலிகைகள்.]",
    usage:
      "Mix powder with water, apply during bath time. Gentle enough for daily use across all age groups.",
    images: [
      "/images/products/wholeFamily1.jpg",
      "/images/products/wholeFamily2.jpg",
      "/images/products/wholeFamily3.jpg",
      "/images/products/wholeFamily4.jpg",
    ],
    color: "herb-full",
    features: [
      "Includes: Him, Her, Baby Boy, Baby Girl",
      "Full family safe combo",
      "Daily-use herbal powder",
      "Dermatologically safe ingredients",
    ],
    variants: [
      {
        size: "Combo Pack",
        price: 699,
        strikedPrice: 799,
        weight: "400 grams (4×100g)",
      },
    ],
    shelfLife: "12 months",
    storage: "Store dry and cool. Close pouch tightly.",
    warnings: "Avoid eyes. External use only.",
    rank: 1,
    category: "Combo Pack",
    rating: 4.8,
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
