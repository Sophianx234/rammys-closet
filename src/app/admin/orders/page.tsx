"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Toast = withReactContent(Swal).mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

import {
  Search,
  Filter,
  Eye,
  Trash2,
  MoreVertical,
  MapPin,
  DollarSign,
  CheckCircle,
  Clock,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ListOrdered,
  User,
  Package,
  Truck,
  Check,
  Timer,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

/* ================= BADGES ================= */

const paymentBadge = {
  paid: { label: "Paid", variant: "default", icon: DollarSign },
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  failed: { label: "Failed", variant: "destructive", icon: CreditCard },
};

/* ================= STATUS OPTIONS ================= */

const statusOptions = [
  "processing",
  "awaiting_payment",
  "paid",
  "packed",
  "ready_for_pickup",
  "ready_for_dispatch",
  "dispatched",
  "in_transit",
  "arrived",
  "delivery_attempted",
  "delivered",
  "cancelled",
];

/* ================= MAIN COMPONENT ================= */

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);

  const ordersPerPage = 10;

  /* ================= FETCH REAL ORDERS ================= */
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch(`/api/orders?page=${page}&limit=${ordersPerPage}`);
        const data = await res.json();

        if (!data.success) {
          Toast.fire({
            icon: "error",
            title: "Failed to fetch orders",
          });
          return;
        }

        const formatted = data.orders.map((o) => ({
          id: o.paymentReference,
          customer: o.user?.name || "Unknown",
          phone: o.customer?.phone,
          total: o.totalAmount,
          qty: o.items.length,
          status: o.orderStatus,
          payment: o.paymentStatus,
          reference: o.paymentReference,
          delivery: {
            address: o.deliveryAddress?.address,
            city: o.deliveryAddress?.city,
            region: o.deliveryAddress?.region,
          },
          items: o.items.map((i) => ({
            name: i.product?.name,
            qty: i.quantity,
            price: i.price,
          })),
          date: o.createdAt,
        }));

        setOrders(formatted);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Network error fetching orders",
        });
      }
    };

    loadOrders();
  }, [page]);

  /* FILTERING */
  const filtered = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(Math.ceil(filtered.length / ordersPerPage), 1);

  const visible = filtered.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  /* OPEN MODAL */
  const viewOrder = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  /* ================= UPDATE STATUS (Backend) ================= */
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch("/api/orders/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: id, status: newStatus }),
      });

      if (!res.ok) {
        Toast.fire({
          icon: "error",
          title: "Status update failed",
        });
        return;
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
      );

      Toast.fire({
        icon: "success",
        title: "Status updated!",
      });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Network error updating status",
      });
    }
  };

  /* DELETE ORDER */
  const deleteOrder = async (order) => {
    const confirm = await Swal.fire({
      title: "Delete Order?",
      text: `Are you sure you want to delete ${order.id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        Toast.fire({ icon: "error", title: "Delete failed" });
        return;
      }

      setOrders((prev) => prev.filter((o) => o.id !== order.id));

      Toast.fire({ icon: "success", title: "Order deleted" });
    } catch {
      Toast.fire({ icon: "error", title: "Network error" });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders (ID or customer)"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>

          <Button>Create Manual Order</Button>
        </div>
      </div>

      {/* TABLE */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Showing {visible.length} of {filtered.length} orders
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {visible.map((o, i) => {
                const P = paymentBadge[o.payment];
                const Icon = P.icon;

                return (
                  <motion.tr
                    key={o.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b"
                  >
                    <TableCell className="font-medium">{o.id}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell>{o.qty}</TableCell>

                    {/* PAYMENT */}
                    <TableCell>
                      <Badge variant={P.variant} className="flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {P.label}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-semibold">
                      ₵{o.total?.toLocaleString()}
                    </TableCell>

                    {/* STATUS SELECT */}
                    <TableCell>
                      <Select
                        defaultValue={o.status}
                        onValueChange={(v) => updateStatus(o.id, v)}
                      >
                        <SelectTrigger className="h-8 text-xs capitalize">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s} value={s} className="capitalize">
                              {s.replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell>
                      {new Date(o.date).toLocaleDateString()}
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => viewOrder(o)}>
                            <Eye className="w-4 h-4 mr-2" /> View Order
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => deleteOrder(o)}
                            className="text-red-500"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>

        {/* PAGINATION */}
        <div className="flex items-center justify-between p-4 border-t">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* ================= MODAL ================= */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-3xl h-[32rem]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-primary" />
              Order Details — {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Full detailed breakdown of this order.
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 overflow-y-scroll scrollbar-hide">
              {/* TIMELINE */}
              <OrderTimeline status={selectedOrder.status} />

              <div className="grid grid-cols-1 gap-4">
                <InfoCard
                  title="Customer Info"
                  icon={<User className="w-4 h-4 text-primary" />}
                  items={[
                    { label: "Name", value: selectedOrder.customer },
                    { label: "Phone", value: selectedOrder.phone },
                  ]}
                />

                <InfoCard
                  title="Payment Details"
                  icon={<CreditCard className="w-4 h-4 text-primary" />}
                  items={[
                    { label: "Status", value: selectedOrder.payment },
                    { label: "Reference", value: selectedOrder.reference },
                  ]}
                />

                <InfoCard
                  title="Delivery Address"
                  icon={<MapPin className="w-4 h-4 text-primary" />}
                  items={[
                    { label: "Street", value: selectedOrder.delivery.address },
                    { label: "City", value: selectedOrder.delivery.city },
                    { label: "Region", value: selectedOrder.delivery.region },
                  ]}
                />
              </div>

              {/* ITEMS */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Items</h3>

                <div className="border rounded-lg p-4 space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b pb-2 last:border-none"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm">
                        {item.qty} × ₵{item.price.toLocaleString()}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between pt-3 font-semibold">
                    <p>Total</p>
                    <p>₵{selectedOrder.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ================= INFO CARD ================= */
const InfoCard = ({ title, icon, items }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-sm">
        {icon} {title}
      </CardTitle>
    </CardHeader>

    <CardContent className="space-y-1 text-sm">
      {items.map((item, i) => (
        <p key={i}>
          <span className="text-muted-foreground">{item.label}: </span>
          {item.value}
        </p>
      ))}
    </CardContent>
  </Card>
);

/* ================= TIMELINE ================= */

const timelineStages = [
  { key: "processing", label: "Processing", icon: Timer },
  { key: "paid", label: "Paid", icon: DollarSign },
  { key: "packed", label: "Packed", icon: Package },
  { key: "in_transit", label: "In Transit", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

function OrderTimeline({ status }) {
  const activeIndex = timelineStages.findIndex((s) => s.key === status);

  return (
    <div>
      <h3 className="font-semibold mb-3">Order Status</h3>

      <div className="flex items-center justify-between">
        {timelineStages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <div key={stage.key} className="flex flex-col items-center gap-2">
              <div
                className={`p-3 rounded-full ${
                  index <= activeIndex ? "bg-primary text-white" : "bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-xs ${
                  index <= activeIndex
                    ? "font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
