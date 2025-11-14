import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/models/Category";
import { connectToDatabase } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const data = await req.json();
    const { name, slug, description, image } = data;

    // Check if slug or name exists
    const existing = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }

    const newCategory = new Category({ name, slug, description, image });
    await newCategory.save();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
