import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { categoriesSeed, generateProducts } from "../public/data/category";


async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/rammys-collection");
    console.log("MongoDB connected");

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Insert categories
    const createdCategories = await Category.insertMany(categoriesSeed);
    console.log(`Inserted ${createdCategories.length} categories`);

    // Map categories to include their _id
    const products = generateProducts(createdCategories);
    const createdProducts = await Product.insertMany(products);
    console.log(`Inserted ${createdProducts.length} products`);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
