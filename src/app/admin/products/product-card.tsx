"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Edit,
  Eye,
  Pencil,
  Star,
  Tag,
  Trash2
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import ImageSlider from "./image-slider";

export function ProductCard({ product, index }) {
  const [open, setOpen] = useState(false);

  const stockClass =
    product.stock > 10
      ? "text-emerald-400"
      : product.stock > 0
      ? "text-yellow-400"
      : "text-red-400";




 const router = useRouter();

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Delete Product?",
      text: `Are you sure you want to delete "${product.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/admin/products/${product._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      Swal.fire({
        title: "Deleted!",
        text: "The product has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      router.refresh(); // 🔥 refresh UI instantly
    } catch (err) {
      Swal.fire("Error", "Could not delete product", "error");
    }
  };


  return (
    <>
      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="h-full"
      >
        <div className="bg-card rounded-lg pb-5 border border-neutral-800 hover:border-primary transition-all duration-300 shadow-xl overflow-hidden dark:bg-neutral-900/50 dark:text-gray-50 h-full flex flex-col">
          
          {/* IMAGE */}
          <div className="relative w-full h-56 bg-neutral-950">
            <Image
              src={product.images[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover transition duration-500"
            />

            {/* Overlay Buttons */}
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity justify-end flex pt-3 gap-3">
              <div></div>
              <div>
                {/* OPEN MODAL BUTTON */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-black/40 hover:bg-black/60 border border-white/20 text-white hover:text-rose-400"
                  title="View Details"
                  onClick={() => setOpen(true)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
  size="icon"
  variant="ghost"
  className="bg-black/40 hover:bg-black/60 border border-white/20 text-white hover:text-rose-400"
  title="Edit Product"
  onClick={() => router.push(`products/edit/${product._id}`)}
>
  <Pencil className="w-4 h-4" />
</Button>

                

                <Button
  size="icon"
  variant="ghost"
  onClick={handleDelete}
  className="bg-black/40 hover:bg-black/60 border border-white/20 text-white hover:text-red-400"
  title="Delete Product"
>
  <Trash2 className="w-4 h-4" />
</Button>

              </div>
            </div>

            {product.isFeatured && (
              <Badge className="absolute top-3 left-3 bg-primary text-black text-xs px-3 py-1 shadow-md">
                <Star className="w-3 h-3 mr-1 " /> Featured
              </Badge>
            )}
          </div>

          {/* CONTENT */}
          <CardContent className="p-4 flex flex-col justify-between flex-grow">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="text-xs text-gray-400 bg-neutral-800/70 border-none"
                >
                  <Tag className="w-3 h-3 mr-1" />{" "}
                  {product.category?.name || "Uncategorized"}
                </Badge>

                {product.rating > 0 && (
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-200">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({product.reviewsCount})
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-50 tracking-tight leading-tight pt-1">
                {product.name}
              </h3>

              <p className="text-xs text-gray-400 line-clamp-2 min-h-[30px] leading-relaxed">
                {product.description || "No description available."}
              </p>

              <p className="text-2xl font-extrabold text-primary mt-2">
                ₵{(product.price / 100).toFixed(2)}
              </p>
            </div>

            <div className="pt-4 mt-auto border-t border-neutral-800 flex items-center justify-between text-sm">
              <span className="text-gray-400">
                Stock:
                <span className={`ml-1 font-bold ${stockClass}`}>
                  {product.stock}
                </span>
              </span>
              <Badge
                className={`text-xs ${
                  product.inStock
                    ? "bg-emerald-600/20 text-emerald-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </CardContent>
        </div>
      </motion.div>

      {/* MODAL */}
      {/* MODAL */}
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent
    className="max-w-xl max-h-[90vh] overflow-y-auto bg-neutral-900 border-neutral-800 text-gray-100 scrollbar-hide"
  >
    <DialogHeader>
      <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
      <DialogDescription className="text-gray-400">
        Product Details
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4">
      <ImageSlider images={product.images} />

      <p className="text-gray-300">{product.description}</p>

      <div className="flex justify-between text-sm">
        <p><strong>Category:</strong> {product.category.name}</p>
        <p><strong>Price:</strong> ₵{(product.price / 100).toFixed(2)}</p>
      </div>

      <div className="flex justify-between text-sm">
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Rating:</strong> ⭐ {product.rating} ({product.reviewsCount})</p>
      </div>
    </div>
  </DialogContent>
</Dialog>


    </>
  );
}
