export const categoriesSeed = [
  {
    name: "Lipsticks",
    slug: "lipsticks",
    description: "Various shades of lipsticks for all occasions.",
    image: "https://images.unsplash.com/photo-1601597110423-5c5aa6f90aa5"
  },
  {
    name: "Lip Gloss",
    slug: "lip-gloss",
    description: "Shiny, moisturizing lip glosses.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
  },
  {
    name: "Eyeshadow",
    slug: "eyeshadow",
    description: "Colorful eyeshadow palettes and singles.",
    image: "https://images.unsplash.com/photo-1581092795364-9c91c0b662d4"
  },
  {
    name: "Eyeliner",
    slug: "eyeliner",
    description: "Liquid, pencil, and gel eyeliners.",
    image: "https://images.unsplash.com/photo-1621071842568-28f2f10e1113"
  },
  {
    name: "Mascara",
    slug: "mascara",
    description: "Lengthening, volumizing, and waterproof mascaras.",
    image: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf7"
  },
  {
    name: "Foundation",
    slug: "foundation",
    description: "Liquid, cream, and powder foundations.",
    image: "https://images.unsplash.com/photo-1580310796741-b5b6b9f383d0"
  },
  {
    name: "Concealer",
    slug: "concealer",
    description: "Concealers for all skin tones.",
    image: "https://images.unsplash.com/photo-1612874741625-8a1c6ef746e3"
  },
  {
    name: "Blush",
    slug: "blush",
    description: "Powder and cream blushes for glowing cheeks.",
    image: "https://images.unsplash.com/photo-1612531177761-8422692f5f35"
  },
  {
    name: "Highlighter",
    slug: "highlighter",
    description: "Highlight your best features with shimmer.",
    image: "https://images.unsplash.com/photo-1611276030056-3f79a3e868f2"
  },
  {
    name: "Bronzer",
    slug: "bronzer",
    description: "Add warmth and dimension to your face.",
    image: "https://images.unsplash.com/photo-1598387842182-841d8d9a5fd5"
  },
];

export interface ProductSeed {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  variants: { name: string; options: string[] }[];
  isFeatured: boolean;
}

export const generateProducts = (categories: { _id: string; name: string }[]) => {
  const products = [];

  categories.forEach(category => {
    for (let i = 1; i <= 25; i++) {
      products.push({
        name: `${category.name} Sample ${i}`,
        slug: `${category.slug}-sample-${i}`,
        description: `Sample ${i} of ${category.name}`,
        category: category._id, // <-- dynamically reference category ID
        price: Math.floor(Math.random() * 5000) + 1000,
        images: [`https://picsum.photos/seed/${category.slug}${i}/400/400`],
        features: ["Feature 1", "Feature 2", "Feature 3"],
        variants: [{ name: "shade", options: ["Option 1", "Option 2", "Option 3"] }],
        isFeatured: i % 5 === 0
      });
    }
  });

  return products;
};
