"use client";

import { Card } from "@/components/ui/card";

const mockOrders = [
  { id: "RM-001", customer: "Sarah M.", amount: 45000, status: "delivered", date: "2025-10-18" },
  { id: "RM-002", customer: "Jennifer K.", amount: 28500, status: "shipped", date: "2025-10-20" },
  { id: "RM-003", customer: "Amanda T.", amount: 62000, status: "processing", date: "2025-10-25" },
];

export default function OrdersTab() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>
      <Card className="p-6 bg-card border-border shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 text-left">Order ID</th>
              <th className="py-3 text-left">Customer</th>
              <th className="py-3 text-left">Amount</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-left">Date</th>
              <th className="py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((o) => (
              <tr key={o.id} className="border-b border-border hover:bg-secondary/50 transition">
                <td className="py-3 font-medium">{o.id}</td>
                <td className="py-3">{o.customer}</td>
                <td className="py-3">₦{o.amount.toLocaleString()}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      o.status === "delivered"
                        ? "bg-green-500/10 text-green-700"
                        : o.status === "shipped"
                        ? "bg-blue-500/10 text-blue-700"
                        : "bg-yellow-500/10 text-yellow-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-3">{new Date(o.date).toLocaleDateString()}</td>
                <td className="py-3">
                  <button className="text-primary hover:underline text-xs font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
}
