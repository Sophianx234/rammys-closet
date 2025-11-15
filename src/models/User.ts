// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profile?: string;
  role: "customer" | "admin"| 'dispatcher';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  phone?: string;
  wishlist: mongoose.Types.ObjectId[];
  cart: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: String,
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    phone: String,
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
