"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Clock,
  Box,
  ChevronRight,
  BarChart4,
} from "lucide-react";

// Mock Components (simulating shadcn/ui)
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-xl border bg-card text-card-foreground shadow-xl dark:bg-neutral-900 dark:border-neutral-800 ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-xl font-semibold leading-none tracking-tight text-gray-50 ${className}`}
  >
    {children}
  </h3>
);
const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-400 ${className}`}>{children}</p>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Badge = ({ children, variant, className = "" }) => {
  let baseStyle =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  if (variant === "success") {
    baseStyle += " bg-emerald-700/30 text-emerald-400";
  } else if (variant === "info") {
    baseStyle += " bg-blue-700/30 text-blue-400";
  } else if (variant === "warning") {
    baseStyle += " bg-yellow-700/30 text-yellow-400";
  } else {
    baseStyle += " bg-neutral-700/30 text-gray-300";
  }
  return <span className={`${baseStyle} ${className}`}>{children}</span>;
};

// --- MOCK DATA ---
const mockStats = [
  {
    label: "Total Revenue",
    value: "₵2.5M",
    icon: DollarSign,
    change: "+12%",
    color: "text-emerald-400",
    trend: "up",
  },
  {
    label: "Orders Placed",
    value: "156",
    icon: ShoppingBag,
    change: "+8%",
    color: "text-rose-400",
    trend: "up",
  },
  {
    label: "Products in Stock",
    value: "42",
    icon: Package,
    change: "+3%",
    color: "text-blue-400",
    trend: "up",
  },
  {
    label: "New Customers",
    value: "892",
    icon: Users,
    change: "-4%",
    color: "text-red-400",
    trend: "down",
  },
];

const mockOrders = [
  {
    id: "RM-001",
    customer: "Sarah M.",
    amount: 45000,
    status: "delivered",
    date: "2025-10-18",
  },
  {
    id: "RM-002",
    customer: "Jennifer K.",
    amount: 28500,
    status: "shipped",
    date: "2025-10-20",
  },
  {
    id: "RM-003",
    customer: "Amanda T.",
    amount: 62000,
    status: "processing",
    date: "2025-10-25",
  },
  {
    id: "RM-004",
    customer: "Michael B.",
    amount: 18900,
    status: "delivered",
    date: "2025-10-25",
  },
  {
    id: "RM-005",
    customer: "Jessica F.",
    amount: 75200,
    status: "processing",
    date: "2025-10-26",
  },
];

const mockTopProducts = [
  {
    id: 1,
    name: "Velvet Luxe Lipstick",
    sales: 85,
    revenue: 212500,
    category: "Lipstick",
  },
  {
    id: 2,
    name: "Opulence Eyeshadow",
    sales: 75,
    revenue: 262500,
    category: "Eyeshadow",
  },
  {
    id: 3,
    name: "PerfectSkin Foundation",
    sales: 60,
    revenue: 168000,
    category: "Foundation",
  },
  {
    id: 4,
    name: "HydraGlow Lip Gloss",
    sales: 45,
    revenue: 81000,
    category: "Lip Gloss",
  },
];

const mockMonthlySales = [
  { month: "Jan", sales: 120000 },
  { month: "Feb", sales: 180000 },
  { month: "Mar", sales: 150000 },
  { month: "Apr", sales: 220000 },
  { month: "May", sales: 290000 },
  { month: "Jun", sales: 250000 },
];
// --- END MOCK DATA ---

/**
 * Helper to determine badge style based on order status
 * @param {string} status
 */
const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return { text: "Delivered", variant: "success" };
    case "shipped":
      return { text: "Shipped", variant: "info" };
    case "processing":
      return { text: "Processing", variant: "warning" };
    default:
      return { text: "Unknown", variant: "default" };
  }
};

/**
 * Mock Chart Visualization Component (using pure CSS/Divs)
 */
function SalesChart() {
  // Find the max value for scaling the bars
  const maxSales = Math.max(...mockMonthlySales.map((d) => d.sales));
  const normalizedData = mockMonthlySales.map((d) => ({
    ...d,
    // Scale height to be max 100% of the container height (150px)
    height: (d.sales / maxSales) * 100,
  }));

  return (
    <Card className="col-span-1 lg:col-span-2 h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Monthly Sales Performance</CardTitle>
          <CardDescription>
            Revenue trend over the last 6 months.
          </CardDescription>
        </div>
        <Badge variant="default" className="bg-neutral-800 text-gray-300">
          <BarChart4 className="w-3 h-3 mr-1" /> 2025
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] flex items-end gap-4 px-2">
          {normalizedData.map((data, i) => (
            <div
              key={data.month}
              className="flex flex-col items-center flex-1 group relative"
            >
              {/* Bar Container */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${data.height}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-full bg-rose-600/70 rounded-t-md hover:bg-rose-500 transition-colors cursor-pointer shadow-lg"
                style={{ height: `${data.height}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-700/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  ₵{(data.sales / 1000).toFixed(1)}K
                </div>
              </motion.div>
              {/* Label */}
              <span className="text-xs text-gray-500 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Stats Card Component
 */
function StatsCard({ stat, index }) {
  const Icon = stat.icon;
  const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown;
  const trendColor = stat.trend === "up" ? "text-emerald-400" : "text-red-400";
  const trendBg = stat.trend === "up" ? "bg-emerald-700/20" : "bg-red-700/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="p-4 sm:p-6 transition-all duration-300 hover:border-rose-600/50">
        <div className="flex items-start justify-between">
          <div>
            <CardDescription>{stat.label}</CardDescription>
            <h3 className="text-3xl font-extrabold mt-1 text-gray-50 tracking-tight">
              {stat.value}
            </h3>
          </div>
          <div
            className={`p-3 rounded-full ${trendBg} ${stat.color} shadow-lg`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 text-sm flex items-center">
          <span className={`flex items-center font-bold ${trendColor} mr-2`}>
            <TrendIcon className="w-4 h-4 mr-0.5" />
            {stat.change}
          </span>
          <span className="text-gray-500">vs. last month</span>
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * Main Overview Dashboard Component
 */
export default function OverviewTab() {
  return (
    <div className="min-h-screen   dark:text-gray-50">
      <section className="space-y-8 max-w-7xl mx-auto">
        {/* ## Dashboard Header */}

        {/* --- */}

        {/* ## 📈 Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat, i) => (
            <StatsCard key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* --- */}

        {/* ## 📊 Main Content Grid (Chart + Top Performers) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Monthly Sales Chart (Span 2 columns) */}
          <SalesChart />

          {/* Top Performing Products (Span 1 column) */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>
                Highest revenue generators this period.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTopProducts.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.15 }}
                  className="flex items-center justify-between border-b border-neutral-800 pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center space-x-3">
                    <Box className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-100">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-500">{p.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-50">
                      ₵{(p.revenue / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-gray-400">{p.sales} Sales</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* --- */}

        {/* ## 📋 Recent Orders Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Order Activity</CardTitle>
              <CardDescription>
                A list of the latest transactions.
              </CardDescription>
            </div>
            <button className="text-rose-400 hover:underline text-sm flex items-center">
              View All Orders <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-800 text-gray-400">
                  <tr>
                    <th className="py-3 px-6 text-left font-medium">
                      Order ID
                    </th>
                    <th className="py-3 px-6 text-left font-medium">
                      Customer
                    </th>
                    <th className="py-3 px-6 text-left font-medium">Amount</th>
                    <th className="py-3 px-6 text-left font-medium">Status</th>
                    <th className="py-3 px-6 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((o, i) => {
                    const status = getStatusBadge(o.status);
                    return (
                      <motion.tr
                        key={o.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * i }}
                        className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors last:border-b-0"
                      >
                        <td className="py-3 px-6 font-semibold text-gray-100">
                          {o.id}
                        </td>
                        <td className="py-3 px-6 text-gray-300">
                          {o.customer}
                        </td>
                        <td className="py-3 px-6 text-gray-300">
                          ₵{o.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-6">
                          <Badge variant={status.variant}>
                            <Clock className="w-3 h-3 mr-1" /> {status.text}
                          </Badge>
                        </td>
                        <td className="py-3 px-6 text-gray-400">
                          {new Date(o.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
