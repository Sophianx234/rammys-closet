"use client";

import { useState, useEffect, useCallback, use } from "react";
import { z } from "zod";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  FaArrowLeft,
  FaTrash,
} from "react-icons/fa";
import { GridLoader } from "react-spinners";

// --- Types ---
interface ICategoryOption {
  _id: string;
  name: string;
}

// Validation schema
const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description is too short"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().min(0, "Stock cannot be negative"),
  features: z.array(z.string()).optional(),
  category: z.string().min(1, "Category is required"),
  variants: z
    .array(z.object({ name: z.string(), options: z.array(z.string().min(1)) }))
    .optional(),
  isFeatured: z.boolean().optional(),
});

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [categories, setCategories] = useState<ICategoryOption[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Separate state
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

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

  const MAX_IMAGES = 5;

  const [newFeature, setNewFeature] = useState("");
  const [variantName, setVariantName] = useState("");
  const [variantOptions, setVariantOptions] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- Fetch Categories & Product ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch("/api/admin/categories");
        const catData = await catRes.json();
        setCategories(catData);

        const prodRes = await fetch(`/api/admin/products/${id}`);
        if (!prodRes.ok) throw new Error("Product not found");

        const data = await prodRes.json();

        setProduct({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          images: data.images || [],
          features: data.features || [],
          category: data.category?._id || data.category,
          variants: data.variants || [],
          isFeatured: data.isFeatured || false,
        });

        setExistingImages(data.images || []);
      } catch (e) {
        console.error(e);
        Swal.fire("Error", "Failed loading product.", "error");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [id]);

  // --- Dropzone (limited to 5 total images) ---
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const total = existingImages.length + newImages.length;

      if (total >= MAX_IMAGES) {
        Swal.fire("Limit reached", "Max 5 images allowed.", "warning");
        return;
      }

      const allowedSlots = MAX_IMAGES - total;
      const filesToAdd = acceptedFiles.slice(0, allowedSlots);

      const previewURLs = filesToAdd.map((f) => URL.createObjectURL(f));

      setNewImages((prev) => [...prev, ...filesToAdd]);
      setNewPreviews((prev) => [...prev, ...previewURLs]);
    },
    [existingImages, newImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  // --- Remove New Image ---
  const removeNewImage = (idx: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // --- Remove Existing Image ---
  const removeExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((x) => x !== url));
  };

  // --- Feature Logic ---
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setProduct((p) => ({ ...p, features: [...p.features, newFeature.trim()] }));
    setNewFeature("");
  };
  const removeFeature = (i: number) => {
    setProduct((p) => ({
      ...p,
      features: p.features.filter((_, idx) => idx !== i),
    }));
  };

  // --- Variant Logic ---
  const handleAddVariant = () => {
    if (!variantName.trim() || !variantOptions.trim()) return;

    setProduct((p) => ({
      ...p,
      variants: [
        ...p.variants,
        {
          name: variantName.trim(),
          options: variantOptions
            .split(",")
            .map((o) => o.trim())
            .filter(Boolean),
        },
      ],
    }));

    setVariantName("");
    setVariantOptions("");
  };

  const removeVariant = (i: number) => {
    setProduct((p) => ({
      ...p,
      variants: p.variants.filter((_, idx) => idx !== i),
    }));
  };

  // --- Submit ---
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({});
    

    if (existingImages.length + newImages.length === 0) {
      return setErrors({ images: "At least 1 image is required." });
    }

    try {
      const validated = productSchema.parse({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });

      setSubmitting(true);

      const form = new FormData();
      form.append("name", validated.name);
      form.append("description", validated.description);
      form.append("price", String(validated.price));
      form.append("stock", String(validated.stock));
      form.append("category", validated.category);
      form.append("isFeatured", String(validated.isFeatured));

      validated.features?.forEach((f) => form.append("features[]", f));

      validated.variants?.forEach((v, idx) => {
        form.append(`variants[${idx}][name]`, v.name);
        v.options.forEach((o) =>
          form.append(`variants[${idx}][options][]`, o)
        );
      });

      // Keep existing images
      existingImages.forEach((url) =>
        form.append("existingImages[]", url)
      );

      // Upload new ones
      newImages.forEach((file) => form.append("newImages", file));

      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) throw new Error("Update failed");

Swal.fire({
  icon: "success",
  title: "Product updated!",
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  background: "#1f1f1f",
  color: "#fff",
});


      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          fieldErrors[e.path[0] as string] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        Swal.fire("Error", err.message, "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingData)
    return (
      <div className="h-dvh flex items-center justify-center">
      <GridLoader size={24} color="#ffaf9f" />
    </div>
    );

  // -----------------------------
  // MERGED IMAGES (existing + new)
  // -----------------------------
  const mergedImages = [
    ...existingImages.map((url) => ({ type: "existing", url })),
    ...newPreviews.map((url, idx) => ({ type: "new", url, idx })),
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-100 flex items-center gap-2">
          <FaBoxOpen className="text-primary" /> Edit Product
        </h2>
        <Button variant="outline" onClick={() => router.back()} className="gap-2">
          <FaArrowLeft /> Cancel
        </Button>
      </div>

      <Card className="p-6 bg-neutral-800 border border-neutral-700 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME + PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 flex items-center gap-2 mb-1">
                <FaBoxOpen /> Product Name
              </label>
              <Input
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-gray-300 flex items-center gap-2 mb-1">
                <FaMoneyBillWave /> Price (₵)
              </label>
              <Input
                type="number"
                min={0}
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          {/* STOCK + CATEGORY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 flex items-center gap-2 mb-1">
                <FaWarehouse /> Stock
              </label>
              <Input
                type="number"
                min={0}
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: Number(e.target.value) })
                }
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
              )}
            </div>

            <div>
              <label className="text-gray-300 flex items-center gap-2 mb-1">
                <FaTags /> Category
              </label>
              <select
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="w-full p-2 h-10 rounded-md bg-neutral-900 border border-neutral-700 text-gray-100"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-gray-300 flex items-center gap-2 mb-1">
              <FaRegFileAlt /> Description
            </label>
            <Textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              rows={5}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* IMAGES */}
          <div>
            <label className="text-gray-300 flex items-center gap-2 mb-2">
              <FaImages /> Product Images (max {MAX_IMAGES})
            </label>

            {/* MERGED GALLERY */}
            {mergedImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {mergedImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-32 object-cover rounded-md border border-neutral-600"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        img.type === "existing"
                          ? removeExistingImage(img.url)
                          : removeNewImage(img.idx!)
                      }
                      className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white p-1 rounded"
                    >
                      <FaTrash size={12} />
                    </button>

                    {img.type === "new" && (
                      <div className="absolute bottom-0 w-full bg-green-800/80 text-[10px] text-white text-center py-1 rounded-b">
                        NEW
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* DROPZONE (disabled when max images reached) */}
            {mergedImages.length < MAX_IMAGES ? (
              <div
                {...getRootProps()}
                className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
                  isDragActive
                    ? "border-primary bg-neutral-900/50"
                    : "border-neutral-600 bg-neutral-900/30"
                }`}
              >
                <input {...getInputProps()} />
                <p className="text-gray-400">
                  Drag & drop images here (max {MAX_IMAGES})
                </p>
              </div>
            ) : (
              <p className="text-yellow-400 text-sm">
                Maximum of {MAX_IMAGES} images reached.
              </p>
            )}

            {errors.images && (
              <p className="text-red-500 text-xs mt-1">{errors.images}</p>
            )}
          </div>

          {/* FEATURES */}
          <div>
            <label className="text-gray-300 flex items-center gap-2 mb-1">
              <FaStar /> Features
            </label>

            <div className="flex gap-2 mb-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g. Long-lasting"
              />
              <Button type="button" onClick={handleAddFeature}>
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.features.map((f, i) => (
                <span
                  key={i}
                  className="bg-neutral-700 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="hover:text-red-400"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* VARIANTS */}
          <div>
            <label className="text-gray-300 flex items-center gap-2 mb-1">
              <FaSlidersH /> Variants
            </label>

            <div className="flex gap-2 mb-2 flex-wrap">
              <Input
                className="w-1/3"
                value={variantName}
                onChange={(e) => setVariantName(e.target.value)}
                placeholder="Name (e.g. Size)"
              />
              <Input
                className="flex-1"
                value={variantOptions}
                onChange={(e) => setVariantOptions(e.target.value)}
                placeholder="Options (Red, Blue)"
              />
              <Button type="button" onClick={handleAddVariant}>
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.variants.map((v, i) => (
                <span
                  key={i}
                  className="bg-neutral-700 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                >
                  {v.name}: {v.options.join(", ")}
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="hover:text-red-400"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* FEATURED */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={product.isFeatured}
              onCheckedChange={(checked) =>
                setProduct({ ...product, isFeatured: Boolean(checked) })
              }
            />
            <span className="text-gray-300 flex items-center gap-2">
              <FaThumbtack /> Mark as Featured
            </span>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-primary text-black flex items-center gap-2 min-w-[150px]"
            >
              <FaSave /> {submitting ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </motion.section>
  );
}
