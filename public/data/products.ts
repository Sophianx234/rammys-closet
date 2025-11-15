import mongoose from "mongoose";
// Assuming categoriesSeed is already inserted into DB
export const productsSeed = [
  {
    name: "Matte Red Lipstick",
    slug: "matte-red-lipstick",
    description: "Long-lasting matte red lipstick for bold lips.",
    category: new mongoose.Types.ObjectId("654a1f1b9a1c4f001a3b4c01"), // Lipsticks
    price: 4500,
    images: ["https://images.unsplash.com/photo-1601597110423-5c5aa6f90aa5"],
    features: ["Long-lasting", "Hydrating", "Bold color"],
    rating: 4.5,
    reviewsCount: 34,
    stock: 50,
    inStock: true,
    variants: [
      { name: "shade", options: ["Crimson", "Ruby", "Scarlet"] }
    ],
    isFeatured: true,
  },
  {
    name: "Glossy Pink Lip Gloss",
    slug: "glossy-pink-lip-gloss",
    description: "Shiny pink lip gloss for a moisturizing finish.",
    category: new mongoose.Types.ObjectId("654a1f1b9a1c4f001a3b4c02"), // Lip Gloss
    price: 3500,
    images: ["https://images.unsplash.com/photo-1607746882042-944635dfe10e"],
    features: ["Shiny finish", "Moisturizing", "Lightweight"],
    rating: 4.2,
    reviewsCount: 22,
    stock: 30,
    inStock: true,
    variants: [
      { name: "shade", options: ["Bubblegum", "Rose", "Peach"] }
    ],
    isFeatured: false,
  },
  {
    name: "Smokey Eyeshadow Palette",
    slug: "smokey-eyeshadow-palette",
    description: "12-color smokey eyeshadow palette for dramatic looks.",
    category: new mongoose.Types.ObjectId("654a1f1b9a1c4f001a3b4c03"), // Eyeshadow
    price: 7000,
    images: ["https://images.unsplash.com/photo-1581092795364-9c91c0b662d4"],
    features: ["Highly pigmented", "Blendable", "Long-lasting"],
    rating: 4.8,
    reviewsCount: 45,
    stock: 40,
    inStock: true,
    variants: [
      { name: "palette type", options: ["Smokey", "Natural", "Bright"] }
    ],
    isFeatured: true,
  },
  // Add remaining products following same pattern...
];

// Seed function
