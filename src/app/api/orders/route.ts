import { NextResponse } from "next/server";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/connectDB";
import "@/models/Product";

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



export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";

    const query: any = {};

    // Search by order ID, phone, reference
    if (search) {
      query.$or = [
        { paymentReference: { $regex: search, $options: "i" } },
        { "customer.phone": { $regex: search, $options: "i" } },
      ];
    }

    const orders = await Order.find(query)
      .populate("user")
      .populate("items.product")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
      console.log('orderxxx',orders);

    const totalOrders = await Order.countDocuments(query);

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        total: totalOrders,
        page,
        totalPages: Math.ceil(totalOrders / limit),
      },
    });
  } catch (error: any) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

