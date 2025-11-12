"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaImage, FaTrash, FaTag, FaAlignLeft, FaSave } from "react-icons/fa";

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().optional(),
  image: z.string().optional(),
});

export default function AddCategoryPage() {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Auto-generate slug from name
  const handleNameChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setCategory({ ...category, name: value, slug });
  };

  // ✅ Dropzone setup
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setCategory((prev) => ({ ...prev, image: previewUrl }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = categorySchema.parse(category);
      setLoading(true);

      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) throw new Error("Failed to save category");

      Swal.fire({
        title: "✅ Success!",
        text: "Category added successfully.",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      setCategory({ name: "", slug: "", description: "", image: "" });
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
        <FaTag className="text-rose-400" /> Add New Category
      </h2>

      <Card className="p-6 bg-neutral-800 border border-neutral-700 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <FaTag /> Category Name
              </Label>
              <Input
                type="text"
                placeholder="e.g. Lipsticks"
                value={category.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <FaTag /> Slug
              </Label>
              <Input
                type="text"
                placeholder="lipsticks"
                value={category.slug}
                onChange={(e) => setCategory({ ...category, slug: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-gray-300 flex items-center gap-2">
              <FaAlignLeft /> Description
            </Label>
            <Textarea
              placeholder="Describe this category (optional)"
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-gray-300 mb-2 block flex items-center gap-2">
              <FaImage /> Category Image
            </Label>
            <div
              {...getRootProps()}
              className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
                isDragActive
                  ? "border-rose-500 bg-rose-500/10"
                  : "border-neutral-600 bg-neutral-900/30"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-rose-400 flex items-center justify-center gap-2">
                  <FaImage /> Drop image here...
                </p>
              ) : (
                <p className="text-gray-400 flex items-center justify-center gap-2">
                  <FaImage /> Drag & drop an image here, or click to browse
                </p>
              )}
            </div>

            {category.image && (
              <div className="relative mt-4 inline-block">
                <img
                  src={category.image}
                  alt="Preview"
                  className="rounded-lg object-cover w-48 h-48 border border-neutral-700"
                />
                <button
                  type="button"
                  onClick={() => setCategory((p) => ({ ...p, image: "" }))}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white text-xs rounded-full p-1 transition"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-2"
            disabled={loading}
          >
            <FaSave />
            {loading ? "Saving..." : "Add Category"}
          </Button>
        </form>
      </Card>
    </motion.section>
  );
}
