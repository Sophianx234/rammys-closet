"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Added
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Added
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  Search, // Added
  Filter, // Added
  XCircle, // Added
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useRouter } from "next/navigation";
import { GridLoader } from "react-spinners";

// ------------------ Types -------------------

type OrderStatus =
  | "processing"
  | "awaiting_payment"
  | "paid"
  | "awaiting_pickup"
  | "packed"
  | "ready_for_dispatch"
  | "dispatched"
  | "in_transit"
  | "arrived"
  | "delivery_attempted"
  | "delivered"
  | "cancelled";

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockCount: number;
}

interface RecentOrder {
  _id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: OrderStatus;
  date: string;
  avatar?: string;
}

interface StockAlert {
  _id: string;
  name: string;
  stock: number;
  price: number;
  images: string[];
}

const salesData = [
  { name: "Mon", sales: 400 },
  { name: "Tue", sales: 300 },
  { name: "Wed", sales: 200 },
  { name: "Thu", sales: 278 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

// ------------------ Helpers -------------------

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(amount);

const statusColor = (status: OrderStatus) => {
  const map: Record<OrderStatus, string> = {
    delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    in_transit: "bg-amber-100 text-amber-800 border-amber-200",
    awaiting_payment: "bg-orange-100 text-orange-800 border-orange-200",
    awaiting_pickup: "bg-purple-100 text-purple-800 border-purple-200",
    packed: "bg-indigo-100 text-indigo-800 border-indigo-200",
    ready_for_dispatch: "bg-cyan-100 text-cyan-800 border-cyan-200",
    dispatched: "bg-sky-100 text-sky-800 border-sky-200",
    arrived: "bg-teal-100 text-teal-800 border-teal-200",
    delivery_attempted: "bg-rose-100 text-rose-800 border-rose-200",
    paid: "bg-lime-100 text-lime-800 border-lime-200",
  };

  return map[status] || "bg-gray-100 text-gray-600";
};

// ------------------ Component -------------------

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Data State
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    lowStockCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([]);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        setStockAlerts(data.stockAlerts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Filtering Logic ---
  const filteredOrders = recentOrders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center">
      <GridLoader size={24} color="#ffaf9f" />
    </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 pb-10">
      {/* ---------- HEADER ---------- */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Insight into your store performance and operations.
          </p>
        </div>
        <Button size="sm">Download Report</Button>
      </header>

      {/* ---------- STATS CARDS ---------- */}
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row justify-between pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(stats.totalRevenue)}
            </p>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row justify-between pb-2">
            <CardTitle className="text-sm">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p className="text-xs text-muted-foreground">
              +180 since last hour
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row justify-between pb-2">
            <CardTitle className="text-sm">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalCustomers}</p>
            <p className="text-xs text-muted-foreground">+19% new signups</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row justify-between pb-2">
            <CardTitle className="text-sm">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.lowStockCount}</p>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </section>

      {/* ---------- SALES + INVENTORY ---------- */}
      <section className="grid gap-6 lg:grid-cols-7">
        <Card className="shadow-sm border col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily revenue for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ffaf9f" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#ffaf9f" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} />
                  <XAxis
                    dataKey="name"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `GH₵${v}`}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#ffaf9f"
                    fill="url(#salesGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border col-span-3">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Inventory Alerts</CardTitle>
              <CardDescription>Products running low on stock</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockAlerts.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item?.images?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="h-10 w-10 rounded-md object-cover border"
                    />
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.stock === 0
                          ? "Out of stock"
                          : `Only ${item.stock} left`}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">
                    {formatCurrency(item.price)}
                  </p>
                </div>
              ))}
              {stockAlerts.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-4">
                  Inventory looks good!
                </p>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full mt-5"
              onClick={() => router.push("/admin/inventory")}
            >
              View All Inventory
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ---------- RECENT ORDERS (WITH FILTERS) ---------- */}
      <Card className="shadow-sm border">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                {filteredOrders.length} orders match your filters
              </CardDescription>
            </div>

            {/* FILTERS CONTAINER */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Status Filter */}
              <div className="w-full sm:w-[150px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-[250px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search name, email, ID..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* View All Link (Moved to end) */}
              <Button variant="ghost" size="icon" onClick={() => router.push('/admin/orders')}>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <XCircle className="h-8 w-8 text-gray-300" />
                      <p>No orders found matching your filters.</p>
                      <Button 
                        variant="link" 
                        onClick={() => {setSearchQuery(""); setStatusFilter("all")}}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    {/* Customer */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={order.avatar} />
                          <AvatarFallback>
                            {order.customerName.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.customerEmail}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Order ID */}
                    <TableCell className="font-mono text-xs">
                      {order._id}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`capitalize border ${statusColor(
                          order.status
                        )}`}
                      >
                        {order.status.replace("_", " ")}
                      </Badge>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(order.totalAmount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}