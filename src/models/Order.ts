import mongoose, { Schema, Document, Model } from "mongoose";

// --- Custom Order Statuses (Lowercase Version) ---
export type OrderStatus =
  | "processing"
  | "on_hold"
  | "awaiting_pick"
  | "packing"
  | "ready_for_dispatch"
  | "dispatched"
  | "arrived"
  | "delivery_attempted"
  | "delivered"
  | "cancelled";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  paymentReference?: string;
  deliveryAddress: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentReference: String,

    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },

    orderStatus: {
      type: String,
      enum: [
        "processing",
        "on_hold",
        "awaiting_pick",
        "packing",
        "ready_for_dispatch",
        "dispatched",
        "arrived",
        "delivered",
        "cancelled",
      ],
      default: "processing",
    },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
