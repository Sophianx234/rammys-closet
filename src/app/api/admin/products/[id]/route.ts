import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const product = await Product.findById(params.id).populate("category").lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching product:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
