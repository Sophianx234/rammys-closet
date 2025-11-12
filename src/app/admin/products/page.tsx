"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";

const mockProducts = [
  { id: 1, name: "Luxury Lipstick - Crimson", price: 2500, stock: 15, sales: 234 },
  { id: 2, name: "Silk Eye Shadow Palette", price: 3500, stock: 20, sales: 312 },
  { id: 3, name: "Foundation - Porcelain", price: 2800, stock: 25, sales: 189 },
];

export default function ProductsTab() {
  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100">Products</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your product catalog and stock levels
          </p>
        </div>
        <Button className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Products Table */}
      <Card className="p-6 bg-neutral-800 border border-neutral-700 shadow-md rounded-xl">
        <div className="overflow-x-auto rounded-lg border border-neutral-700">
          <table className="w-full text-sm">
            <thead className="bg-neutral-700 text-gray-400">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Name</th>
                <th className="py-3 px-4 text-left font-medium">Price</th>
                <th className="py-3 px-4 text-left font-medium">Stock</th>
                <th className="py-3 px-4 text-left font-medium">Sales</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-neutral-700 hover:bg-neutral-700/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-100">{p.name}</td>
                  <td className="py-3 px-4 text-gray-300">₦{p.price.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.stock > 10
                          ? "bg-emerald-700/20 text-emerald-400"
                          : "bg-yellow-700/20 text-yellow-400"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{p.sales}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="p-2 hover:bg-neutral-700/50 rounded text-gray-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-neutral-700/50 rounded text-gray-300">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-700/20 rounded text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
