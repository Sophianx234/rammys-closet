import { NextResponse } from "next/server";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/connectDB";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const newOrder = await Order.create({
      user: data.userId,
      customer: {
        phone: data.formData.phone,
      },

      deliveryAddress: {
        address: data.formData.address,
        city: data.formData.city,
        region: data.formData.region,
      },

      items: data.cart.map((item: any) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),

      totalAmount: data.total,
      paymentStatus: "paid",
      paymentReference: data.reference,
      orderStatus: "processing",
    });

    // 🔥 CLEAR USER CART IF LOGGED IN
    if (data.userId) {
      await User.findByIdAndUpdate(data.userId, { cart: [] });
    }

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
