import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency, formatDate, OrderItem, ProductSummary, ServerOrder, STATUS_CONFIG } from "./page";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Package, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function OrderDetailsSheetContent({
  order,
  onDelete,
  onStatusChange,
}: {
  order: ServerOrder;
  onDelete: (id: string) => void;
  onStatusChange: (ref: string, newStatus: string) => void;
}) {
  // helper to derive product shape

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


  console.log('order in sheet',order);
  const normalizeItem = (it: OrderItem) => {
    const prod = typeof it.product === "string" ? { _id: it.product, name: "Product", image: null, price: it.price || 0 } : (it.product as ProductSummary);
    return {
      name: prod?.name || "Product",
      image: prod?.images[0] || null,
      price: it.price ?? prod?.price ?? 0,
      qty: it.quantity ?? 1,
      id: prod?._id,
    };
  };

  const items = (order.items || []).map(normalizeItem);
  console.log('normalized items',items);

  return (
    <div className="space-y-6 p-6">
      <SheetHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={order.user?.profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(order.user?.name || "Guest")}`}
                alt={order.user?.name || "Guest"}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <div className="text-sm text-muted-foreground">Customer</div>
                <div className="font-semibold">{order.user?.name ?? "Guest"}</div>
                <div className="text-xs text-muted-foreground">{order.customer.phone}</div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <Badge className="font-mono">#{order.paymentReference}</Badge>
            <div className="text-xs text-muted-foreground mt-1">{formatDate(order.createdAt)}</div>
          </div>
        </div>

        <SheetTitle className="mt-4 text-2xl">Order Details</SheetTitle>
        <SheetDescription className="mt-1">
          Status: <span className="font-medium">{STATUS_CONFIG[order.orderStatus]?.label ?? order.orderStatus}</span>
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Package className="w-4 h-4" /> Items
        </h3>

        <div className="border rounded-lg divide-y">
          {items.map((it, idx) => (
            <div key={idx} className="p-4 flex gap-4 items-center">
              <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                {it.image ? (
                  <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{it.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {it.qty}</p>
                  </div>
                  <div className="font-medium">{formatCurrency(it.price * it.qty)}</div>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-muted/30 flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold flex items-center gap-2"><User className="w-4 h-4" /> Customer</h4>
          <div className="mt-3 border rounded-lg p-4 text-sm">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-xs text-muted-foreground">Name</div>
              <div className="col-span-2 font-medium">{order.user?.name ?? "Guest"}</div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="col-span-2">{order.customer.phone}</div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="col-span-2">{order.user?.email ?? "-"}</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold flex items-center gap-2"><MapPin className="w-4 h-4" /> Delivery</h4>
          <div className="mt-3 border rounded-lg p-4 text-sm">
            <p className="font-medium">{order.deliveryAddress.address}</p>
            <p className="text-muted-foreground">{order.deliveryAddress.city}, {order.deliveryAddress.region}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Select value={order.orderStatus} onValueChange={(v) => onStatusChange(order.paymentReference, v)} >
          <SelectTrigger className="h-10 w-56 text-sm border-0">
            <SelectValue>{STATUS_CONFIG[order.orderStatus]?.label ?? order.orderStatus}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(STATUS_CONFIG).map(([k, c]) => (
              <SelectItem key={k} value={k}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="destructive" onClick={() => onDelete(order._id)}>
          Delete Order
        </Button>

        <Button onClick={() => Toast.fire({ icon: "success", title: "Invoice downloaded (placeholder)" })}>
          <ExternalLink className="w-4 h-4 mr-2" /> Download Invoice
        </Button>
      </div>

      <SheetFooter className="pt-4">
        <div className="w-full text-right">
          <div className="text-sm text-muted-foreground">Last updated: {formatDate(order.updatedAt)}</div>
        </div>
      </SheetFooter>
    </div>
  );
}