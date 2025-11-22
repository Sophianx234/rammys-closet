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
  AlertCircle,
  ArrowUpRight,
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
  images:string[]
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
    delivered: "bg-emerald-100 text-emerald-800",
    processing: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    in_transit: "bg-amber-100 text-amber-800",
    awaiting_payment: "bg-gray-100 text-gray-600",
    awaiting_pickup: "bg-gray-100 text-gray-600",
    packed: "bg-gray-100 text-gray-600",
    ready_for_dispatch: "bg-gray-100 text-gray-600",
    dispatched: "bg-gray-100 text-gray-600",
    arrived: "bg-gray-100 text-gray-600",
    delivery_attempted: "bg-gray-100 text-gray-600",
    paid: "bg-gray-100 text-gray-600",
  };

  return map[status];
};

// ------------------ Component -------------------

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    lowStockCount: 0,
  });

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([]);


  // ... inside DashboardPage component

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard", {
           cache: "no-store" // Ensure we always get fresh data
        });
        
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();

        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        setStockAlerts(data.stockAlerts);
        // You will need to update your state definition to include salesData
        // setSalesData(data.salesData); 
        
        // Note: You need to add `const [salesData, setSalesData] = useState(...)` 
        // to your component state if you want the chart to be dynamic.
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
/*   useEffect(() => {
    setTimeout(() => {
      setStats({
        totalRevenue: 15420.5,
        totalOrders: 142,
        totalCustomers: 89,
        lowStockCount: 3,
      });

      setRecentOrders([
        {
          _id: "ORD-001",
          customerName: "Abena Koranteng",
          customerEmail: "abena@example.com",
          totalAmount: 450,
          status: "processing",
          date: "2023-10-25",
        },
        {
          _id: "ORD-002",
          customerName: "Kofi Mensah",
          customerEmail: "kofi@example.com",
          totalAmount: 120,
          status: "delivered",
          date: "2023-10-24",
        },
        {
          _id: "ORD-003",
          customerName: "Sarah Doe",
          customerEmail: "sarah@example.com",
          totalAmount: 890,
          status: "in_transit",
          date: "2023-10-24",
        },
        {
          _id: "ORD-004",
          customerName: "Kwame Osei",
          customerEmail: "kwame@example.com",
          totalAmount: 65,
          status: "cancelled",
          date: "2023-10-23",
        },
      ]);

      setStockAlerts([
        { _id: "1", name: "Velvet Matte Lipstick - Ruby", stock: 2, price: 85 },
        { _id: "2", name: "Hydrating Face Serum", stock: 0, price: 150 },
        { _id: "3", name: "Rose Water Toner", stock: 4, price: 45 },
      ]);

      setLoading(false);
    }, 1000);
  }, []);
 */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        Loading dashboard...
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
        {/* Revenue */}
        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row justify-between pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        {/* Orders */}
        <Card className="shadow-sm border">
          <CardHeader className="flex flex-row justify-between pb-2">
            <CardTitle className="text-sm">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p className="text-xs text-muted-foreground">+180 since last hour</p>
          </CardContent>
        </Card>

        {/* Customers */}
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

        {/* Low Stock */}
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
        {/* SALES CHART */}
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
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffaf9f" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#ffaf9f" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
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

        {/* INVENTORY ALERTS */}
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
        
        {/* PRODUCT IMAGE */}
        <img
          src={item?.images?.[0]}
          alt={item.name}
          className="h-10 w-10 rounded-md object-cover border"
        />

        <div>
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {item.stock === 0 ? "Out of stock" : `Only ${item.stock} left`}
          </p>
        </div>
      </div>

      <p className="text-sm font-medium">{formatCurrency(item.price)}</p>
    </div>
  ))}

  {stockAlerts.length === 0 && (
    <p className="text-muted-foreground text-sm text-center py-4">
      Inventory looks good!
    </p>
  )}
</div>


            <Button variant="outline" className="w-full mt-5" onClick={() => router.push("/admin/inventory")}>
              View All Inventory
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ---------- RECENT ORDERS ---------- */}
      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              {stats.totalOrders} total orders this month
            </CardDescription>
          </div>

          <Button variant="ghost" size="sm" className="gap-1">
            View All <ArrowUpRight className="h-4 w-4" />
          </Button>
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
              {recentOrders.map((order) => (
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
                  <TableCell className="font-mono text-xs">{order._id}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`capitalize border ${statusColor(order.status)}`}
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
