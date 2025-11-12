"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, ShoppingBag, Package, Users } from "lucide-react";
import { motion } from "framer-motion";

const mockStats = [
  { label: "Total Sales", value: "₦2.5M", icon: TrendingUp, change: "+12%" },
  { label: "Orders", value: "156", icon: ShoppingBag, change: "+8%" },
  { label: "Products", value: "42", icon: Package, change: "+3%" },
  { label: "Customers", value: "892", icon: Users, change: "+15%" },
];

const mockOrders = [
  { id: "RM-001", customer: "Sarah M.", amount: 45000, status: "delivered", date: "2025-10-18" },
  { id: "RM-002", customer: "Jennifer K.", amount: 28500, status: "shipped", date: "2025-10-20" },
  { id: "RM-003", customer: "Amanda T.", amount: 62000, status: "processing", date: "2025-10-25" },
];

export default function OverviewTab() {
  return (
    <section className="space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100">Dashboard Overview</h2>
          <p className="text-sm text-gray-400 mt-1">
            Get insights into sales performance and recent activities
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 bg-neutral-800 border border-neutral-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <h3 className="text-3xl font-bold mt-2 text-gray-100">{stat.value}</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-700 text-rose-500">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs font-medium text-emerald-400 mt-3">{stat.change} this month</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <Card className="p-6 bg-neutral-800 border border-neutral-700 shadow-md rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-100">Recent Orders</h3>
          <button className="text-rose-400 hover:underline text-sm">View All</button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-neutral-700">
          <table className="w-full text-sm">
            <thead className="bg-neutral-700 text-gray-400">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Order ID</th>
                <th className="py-3 px-4 text-left font-medium">Customer</th>
                <th className="py-3 px-4 text-left font-medium">Amount</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((o, i) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="border-b border-neutral-700 hover:bg-neutral-700/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-100">{o.id}</td>
                  <td className="py-3 px-4 text-gray-300">{o.customer}</td>
                  <td className="py-3 px-4 text-gray-300">₦{o.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
                        o.status === "delivered"
                          ? "bg-emerald-700/20 text-emerald-400"
                          : o.status === "shipped"
                          ? "bg-blue-700/20 text-blue-400"
                          : "bg-yellow-700/20 text-yellow-400"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{new Date(o.date).toLocaleDateString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
