"use client";

import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// ✅ Icons
import {
  FaBoxOpen,
  FaMoneyBillWave,
  FaWarehouse,
  FaTags,
  FaRegFileAlt,
  FaImages,
  FaStar,
  FaSlidersH,
  FaThumbtack,
  FaSave,
} from "react-icons/fa";

// ✅ Validation schema
const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description is too short"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().min(0, "Stock cannot be negative"),
  images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
  features: z.array(z.string()).optional(),
  category: z.string().min(1, "Category is required"),
  variants: z
    .array(z.object({ name: z.string(), options: z.array(z.string().min(1)) }))
    .optional(),
  isFeatured: z.boolean().optional(),
});

interface ICategoryOption {
  _id: string;
  name: string;
}

export default function AddProductPage() {
  const [categories, setCategories] = useState<ICategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: [] as string[],
    features: [] as string[],
    category: "",
    variants: [] as { name: string; options: string[] }[],
    isFeatured: false,
  });

  const [newFeature, setNewFeature] = useState("");
  const [variantName, setVariantName] = useState("");
  const [variantOptions, setVariantOptions] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        setCategories(await res.json());
      } catch {
        Swal.fire("Error", "Unable to load categories.", "error");
      }
    })();
  }, []);

  // ✅ Dropzone setup
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    try {
      const urls: string[] = [];
      for (const file of acceptedFiles) {
        const previewUrl = URL.createObjectURL(file);
        urls.push(previewUrl);
      }
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    } catch {
      Swal.fire("Upload Error", "Failed to process image upload.", "error");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 5,
  });

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setProduct((p) => ({ ...p, features: [...p.features, newFeature.trim()] }));
      setNewFeature("");
    }
  };

  const handleAddVariant = () => {
    if (variantName.trim() && variantOptions.trim()) {
      setProduct((p) => ({
        ...p,
        variants: [
          ...p.variants,
          {
            name: variantName.trim(),
            options: variantOptions.split(",").map((o) => o.trim()).filter(Boolean),
          },
        ],
      }));
      setVariantName("");
      setVariantOptions("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = productSchema.parse({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });

      setLoading(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error("Failed to save product");

      Swal.fire({
        title: "Success!",
        text: "Product added successfully.",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      setProduct({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        images: [],
        features: [],
        category: "",
        variants: [],
        isFeatured: false,
      });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        Swal.fire("Validation Error", err.errors[0]?.message || "Invalid input", "warning");
      } else {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-semibold text-gray-100 flex items-center gap-2">
        <FaBoxOpen className="text-rose-400" /> Add New Product
      </h2>

      <Card className="p-6 bg-neutral-800 border border-neutral-700 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-300 flex items-center gap-2">
                <FaBoxOpen /> Product Name
              </label>
              <Input
                type="text"
                placeholder="Luxury Lipstick - Crimson"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-300 flex items-center gap-2">
                <FaMoneyBillWave /> Price (₦)
              </label>
              <Input
                type="number"
                min={0}
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Stock & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-300 flex items-center gap-2">
                <FaWarehouse /> Stock
              </label>
              <Input
                type="number"
                min={0}
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-300 flex items-center gap-2">
                <FaTags /> Category
              </label>
              <select
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                className="w-full p-2 rounded-md bg-neutral-900 border border-neutral-700 text-gray-100"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-gray-300 flex items-center gap-2">
              <FaRegFileAlt /> Description
            </label>
            <Textarea
              placeholder="Enter detailed product description..."
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-gray-300 mb-2 block flex items-center gap-2">
              <FaImages /> Product Images
            </label>
            <div
              {...getRootProps()}
              className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition 
              ${isDragActive ? "border-rose-500 bg-rose-500/10" : "border-neutral-600 bg-neutral-900/30"}`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-rose-400">Drop images here...</p>
              ) : (
                <p className="text-gray-400">
                  Drag & drop product images here, or click to browse (max 5)
                </p>
              )}
            </div>

            {product.images.length > 0 && (
              <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt={`preview-${idx}`}
                      className="rounded-lg object-cover w-full h-32 border border-neutral-700"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setProduct((p) => ({
                          ...p,
                          images: p.images.filter((_, i) => i !== idx),
                        }))
                      }
                      className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="space-y-2">
            <label className="text-gray-300 flex items-center gap-2">
              <FaStar /> Features
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                placeholder="e.g. ‘Long-lasting matte finish’, ‘Hydrating formula’"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
              />
              <Button type="button" onClick={handleAddFeature}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.features.map((f, i) => (
                <span key={i} className="bg-neutral-700 text-gray-100 px-3 py-1 rounded-full text-xs">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-2">
            <label className="text-gray-300 flex items-center gap-2">
              <FaSlidersH /> Variants
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              <Input
                type="text"
                placeholder="e.g. Shade, Size, Finish"
                value={variantName}
                onChange={(e) => setVariantName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="e.g. Crimson Red, Rose Pink, Nude Beige (comma separated)"
                value={variantOptions}
                onChange={(e) => setVariantOptions(e.target.value)}
              />
              <Button type="button" onClick={handleAddVariant}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v, i) => (
                <span
                  key={i}
                  className="bg-neutral-700 text-gray-100 px-3 py-1 rounded-full text-xs"
                >
                  {v.name}: {v.options.join(", ")}
                </span>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={product.isFeatured}
              onCheckedChange={(checked) => setProduct({ ...product, isFeatured: Boolean(checked) })}
            />
            <span className="text-gray-300 flex items-center gap-2">
              <FaThumbtack /> Mark as Featured
            </span>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-2"
            disabled={loading}
          >
            <FaSave /> {loading ? "Saving..." : "Add Product"}
          </Button>
        </form>
      </Card>
    </motion.section>
  );
}
