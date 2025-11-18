"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

/* ---------------- MOCK DATA ---------------- */

const mockOrders = [
  {
    id: "RM-001",
    customer: "Sarah M.",
    total: 45000,
    qty: 3,
    status: "delivered",
    payment: "paid",
    delivery: "Lagos, NG",
    date: "2025-10-18",
  },
  {
    id: "RM-002",
    customer: "Jennifer K.",
    total: 28500,
    qty: 2,
    status: "shipped",
    payment: "paid",
    delivery: "Abuja, NG",
    date: "2025-10-20",
  },
  {
    id: "RM-003",
    customer: "Amanda T.",
    total: 62000,
    qty: 5,
    status: "processing",
    payment: "pending",
    delivery: "Kano, NG",
    date: "2025-10-25",
  },
  {
    id: "RM-004",
    customer: "Michael B.",
    total: 18900,
    qty: 1,
    status: "delivered",
    payment: "paid",
    delivery: "Ibadan, NG",
    date: "2025-10-25",
  },
  {
    id: "RM-005",
    customer: "Jessica F.",
    total: 75200,
    qty: 4,
    status: "processing",
    payment: "paid",
    delivery: "Port Harcourt, NG",
    date: "2025-10-26",
  },
  {
    id: "RM-006",
    customer: "David E.",
    total: 9500,
    qty: 1,
    status: "cancelled",
    payment: "failed",
    delivery: "Enugu, NG",
    date: "2025-10-27",
  },
];

/* ---------------- HELPERS ---------------- */

const paymentBadge = {
  paid: { label: "Paid", variant: "default", icon: DollarSign },
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  failed: { label: "Failed", variant: "destructive", icon: CreditCard },
};

const statusOptions = ["processing", "shipped", "delivered", "cancelled"];

/* ---------------- COMPONENT ---------------- */

export default function OrdersTab() {
  const [orders, setOrders] = useState(mockOrders);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const ordersPerPage = 5;
  const [page, setPage] = useState(1);

  /* FILTERING */
  const filtered = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ordersPerPage);
  const visible = filtered.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  /* OPEN MODAL */
  const viewOrder = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  /* STATUS CHANGE */
  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* HEADER TOOLS */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
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
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <Button>New Order</Button>
        </div>
      </div>

      {/* TABLE */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Showing {visible.length} of {filtered.length} results
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Address</TableHead>
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
                    transition={{ delay: i * 0.04 }}
                    className="border-b"
                  >
                    <TableCell>{o.id}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell>{o.qty}</TableCell>
                    <TableCell className="font-semibold">
                      ₵{o.total.toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={P.variant}
                        className="flex items-center gap-1"
                      >
                        <Icon className="w-3 h-3" />
                        {P.label}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-primary" />
                      {o.delivery}
                    </TableCell>

                    {/* STATUS SELECT */}
                    <TableCell>
                      <Select
                        onValueChange={(v) => updateStatus(o.id, v)}
                        defaultValue={o.status}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder={o.status} />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="capitalize"
                            >
                              {s}
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
                            <Eye className="w-4 h-4 mr-2" /> View
                          </DropdownMenuItem>

                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
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

        {/* Pagination */}
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

      {/* MODAL */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-primary" />
              Order Details
            </DialogTitle>
            <DialogDescription>
              Complete information for this order.
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Detail label="Order ID" value={selectedOrder.id} />
                <Detail label="Customer" value={selectedOrder.customer} />
                <Detail label="Quantity" value={selectedOrder.qty} />
                <Detail
                  label="Amount"
                  value={`₵${selectedOrder.total.toLocaleString()}`}
                />
                <Detail label="Payment" value={selectedOrder.payment} />
                <Detail label="Status" value={selectedOrder.status} />
                <Detail label="Address" value={selectedOrder.delivery} />
                <Detail
                  label="Date"
                  value={new Date(selectedOrder.date).toLocaleDateString()}
                />
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

/* Small reusable detail block */
const Detail = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);
