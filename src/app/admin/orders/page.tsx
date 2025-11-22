"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  ExternalLink,
  XCircle,
  RefreshCw,
  CreditCard,
  X,
  Check,
  SlidersHorizontal,
  Copy
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import StatusSelector from "./status-selector";
import PaymentBadge from "./payment-badge";
import OrderDetailsSheetContent from "./order-details";
import { GridLoader } from "react-spinners";

/* ============================
   Types & Config
   ============================ */

export type OrderStatus =
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
  | "cancelled"
  | "failed";

export type PaymentStatus = "pending" | "paid" | "failed";

export type ServerOrder = {
  _id: string;
  user?: {
    _id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    profile?: string;
  } | null;
  customer: {
    phone: string;
  };
  deliveryAddress: {
    address: string;
    city: string;
    region: string;
  };
  items: any[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentReference: string;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export const ITEMS_PER_PAGE = 10;

export const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: any }
> = {
  processing: { label: "Processing", color: "bg-blue-50 text-blue-700", icon: Clock },
  awaiting_payment: { label: "Awaiting Payment", color: "bg-yellow-50 text-yellow-700", icon: Clock },
  paid: { label: "Paid", color: "bg-emerald-50 text-emerald-700", icon: CreditCard },
  awaiting_pickup: { label: "Awaiting Pickup", color: "bg-indigo-50 text-indigo-700", icon: Package },
  packed: { label: "Packed", color: "bg-indigo-50 text-indigo-700", icon: Package },
  ready_for_dispatch: { label: "Ready for Dispatch", color: "bg-violet-50 text-violet-700", icon: Truck },
  dispatched: { label: "Dispatched", color: "bg-purple-50 text-purple-700", icon: Truck },
  in_transit: { label: "In Transit", color: "bg-orange-50 text-orange-700", icon: Truck },
  arrived: { label: "Arrived", color: "bg-sky-50 text-sky-700", icon: Truck },
  delivery_attempted: { label: "Delivery Attempted", color: "bg-yellow-50 text-yellow-700", icon: AlertCircle },
  delivered: { label: "Delivered", color: "bg-green-50 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-50 text-red-700", icon: XCircle },
  failed: { label: "Failed", color: "bg-red-50 text-red-700", icon: AlertCircle },
};

const Toast = withReactContent(Swal).mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  customClass: {
    popup: "text-sm font-medium rounded-lg shadow-md",
  },
});

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(amount);

export const formatDate = (d?: string) =>
  d ? new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";

/* ============================
   Main Component
   ============================ */

export default function OrdersManagement() {
  const [orders, setOrders] = useState<ServerOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // --- Filtering States ---
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("all"); // all, today, week, month
  
  const [page, setPage] = useState<number>(1);
  const [selectedOrder, setSelectedOrder] = useState<ServerOrder | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?page=${page}&limit=${ITEMS_PER_PAGE}`);
      const data = await res.json();
      if (!data || !Array.isArray(data.orders)) {
        throw new Error("Unexpected response");
      }
      setOrders(data.orders as ServerOrder[]);
    } catch (err) {
      console.error("Fetch orders error:", err);
      Toast.fire({ icon: "error", title: "Could not load orders." });
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusUpdate = async (paymentReference: string, newStatus: string) => {
    try {
      const res = await fetch("/api/orders/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: paymentReference, status: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      setOrders((prev) => prev.map((o) => (o.paymentReference === paymentReference ? { ...o, orderStatus: newStatus as OrderStatus } : o)));
      Toast.fire({ icon: "success", title: "Order status updated" });
      if (selectedOrder && selectedOrder.paymentReference === paymentReference) {
        setSelectedOrder({ ...selectedOrder, orderStatus: newStatus as OrderStatus });
      }
    } catch (err) {
      Toast.fire({ icon: "error", title: "Update failed" });
    }
  };

  const handleDelete = async (orderId: string) => {
    setIsSheetOpen(false);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it",
      customClass: { popup: "rounded-xl" },
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        Toast.fire({ icon: "success", title: "Order deleted" });
        setIsSheetOpen(false);
      } catch (err) {
        Toast.fire({ icon: "error", title: "Delete failed" });
      }
    }
  };

  // --- Sophisticated Filtering Logic ---
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // 1. Text Search
      const lower = searchTerm.toLowerCase();
      const referenceMatch = o.paymentReference?.toLowerCase().includes(lower);
      const phoneMatch = o.customer?.phone?.toLowerCase().includes(lower);
      const nameMatch = o.user?.name?.toLowerCase().includes(lower);
      const matchesSearch = referenceMatch || phoneMatch || nameMatch;

      // 2. Status Filter (Multi-select)
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(o.orderStatus);

      // 3. Date Filter
      let matchesDate = true;
      if (dateFilter !== "all") {
        const date = new Date(o.createdAt);
        const now = new Date();
        if (dateFilter === "today") {
          matchesDate = date.toDateString() === now.toDateString();
        } else if (dateFilter === "week") {
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          matchesDate = date >= weekAgo;
        } else if (dateFilter === "month") {
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
          matchesDate = date >= monthAgo;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, searchTerm, statusFilter, dateFilter]);

  // Pagination based on filtered results
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ITEMS_PER_PAGE));
  const paginated = filteredOrders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Helpers for Filter UI
  const isFilterActive = statusFilter.length > 0 || dateFilter !== "all" || searchTerm !== "";
  
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter([]);
    setDateFilter("all");
  };

  const toggleStatusFilter = (statusKey: string) => {
    setStatusFilter(prev => 
      prev.includes(statusKey) 
        ? prev.filter(s => s !== statusKey) 
        : [...prev, statusKey]
    );
  };
  if(loading) return (<div className="h-dvh flex items-center justify-center">
        <GridLoader size={24} color="#ffaf9f" />
      </div>)

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track customer orders.</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" onClick={fetchOrders} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          
        </div>
      </div>

      <Card>
        {/* --- SOPHISTICATED FILTER BAR --- */}
        <CardHeader className="border-b p-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            
            {/* Left: Search */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search order #, phone or name..."
                className="pl-10 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right: Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              
              {/* Status Multi-Select Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-9 border-dashed ${statusFilter.length > 0 ? "bg-accent/50 border-primary/50 text-primary" : "text-muted-foreground"}`}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Status
                    {statusFilter.length > 0 && (
                      <>
                        <Separator orientation="vertical" className="mx-2 h-4" />
                        <Badge variant="secondary" className="h-5 px-1 rounded-sm text-[10px] font-normal lg:hidden">
                          {statusFilter.length}
                        </Badge>
                        <span className="hidden lg:inline text-xs font-medium">
                          {statusFilter.length} selected
                        </span>
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.keys(STATUS_CONFIG).map((key) => (
                    <DropdownMenuCheckboxItem
                      key={key}
                      checked={statusFilter.includes(key)}
                      onCheckedChange={() => toggleStatusFilter(key)}
                      className="capitalize scrollbar-hide"
                    >
                      {STATUS_CONFIG[key].label}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {statusFilter.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onSelect={() => setStatusFilter([])}
                        className="justify-center text-center text-xs font-medium"
                      >
                        Clear status
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Date Range Selector (Simplified) */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className={`h-9 w-[160px] ${dateFilter !== 'all' ? "bg-accent/50 border-primary/50 text-primary" : "text-muted-foreground border-dashed"}`}>
                   <div className="flex items-center truncate">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <SelectValue placeholder="Date Range" />
                   </div>
                </SelectTrigger>
                <SelectContent align="end">
                   <SelectItem value="all">All Time</SelectItem>
                   <SelectItem value="today">Today</SelectItem>
                   <SelectItem value="week">Last 7 Days</SelectItem>
                   <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>

              {/* Global Reset Button */}
              {isFilterActive && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-9 px-2 lg:px-3 text-muted-foreground hover:text-destructive"
                >
                  <span className="sr-only lg:not-sr-only">Reset</span>
                  <XCircle className="ml-0 lg:ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[160px]">Reference</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="">Total</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-6 w-28 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <div className="bg-muted/50 p-4 rounded-full mb-3">
                         <SlidersHorizontal className="h-8 w-8 opacity-50" />
                      </div>
                      <p className="font-medium">No orders found.</p>
                      <p className="text-xs mt-1">Try adjusting your filters or search query.</p>
                      {isFilterActive && (
                        <Button variant="link" onClick={clearFilters} className="mt-2 text-primary">
                          Clear all filters
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((order) => (
                  <TableRow key={order._id} className="group hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono font-medium text-xs">
                      {order.paymentReference}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={order.user?.profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(order.user?.name || "Guest")}`}
                          alt={order.user?.name || "Guest"}
                          className="w-9 h-9 rounded-full object-cover border bg-muted"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{order.user?.name ?? "Guest"}</span>
                          <span className="text-xs text-muted-foreground">{order.customer?.phone}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                       <StatusSelector
                          current={order.orderStatus}
                          onChange={(v) => handleStatusUpdate(order.paymentReference, v)}
                        />
                    </TableCell>

                    <TableCell>
                      <PaymentBadge status={order.paymentStatus} />
                    </TableCell>

                    <TableCell className="text-right font-semibold">
                      {formatCurrency(order.totalAmount)}
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsSheetOpen(true);
                            }}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.paymentReference)}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Reference
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(order._id)} className="text-red-600 focus:text-red-600">
                            Delete Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Footer / Pagination */}
        <div className="border-t p-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled={page === 1 || loading} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled={page === totalPages || loading} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={(v) => { setIsSheetOpen(v); if (!v) setSelectedOrder(null); }}>
        <SheetContent className="sm:max-w-2xl w-full overflow-y-auto">
          {selectedOrder ? <OrderDetailsSheetContent order={selectedOrder} onDelete={handleDelete} onStatusChange={handleStatusUpdate} /> : (
            <div className="p-6">
              <Skeleton className="h-6 w-44 mb-4" />
              <Skeleton className="h-48" />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}