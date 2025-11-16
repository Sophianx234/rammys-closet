import Header from "@/components/header";
import Footer from "@/components/footer";
import TrackOrderCard from "@/components/track-order-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockTrackingData = {
  "1": {
    orderNumber: "RM-001",
    total: 45000,
    items: [
      { name: "Luxury Lipstick - Red", quantity: 1, price: 15000 },
      { name: "Foundation - Shade 02", quantity: 1, price: 20000 },
      { name: "Mascara - Black", quantity: 1, price: 10000 },
    ],
    timeline: [
      {
        status: "processing" as const,
        date: "2025-10-15T10:00:00",
        description: "Order confirmed",
      },
      {
        status: "shipped" as const,
        date: "2025-10-17T14:30:00",
        location: "Lagos Distribution Center",
        description: "Package dispatched",
      },
      {
        status: "delivered" as const,
        date: "2025-10-18T16:45:00",
        location: "Your address",
        description: "Delivered",
      },
    ],
  },
};

export default async function TrackOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = mockTrackingData[id as keyof typeof mockTrackingData];

  if (!order) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the order you're looking for
          </p>
          <Link href="/orders">
            <Button className="bg-primary hover:bg-primary/90">
              View All Orders
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/orders"
          className="text-primary hover:underline mb-6 inline-block"
        >
          ← Back to Orders
        </Link>

        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Order #{order.orderNumber}
          </h1>
          <p className="text-muted-foreground mb-6">
            Total: ₵{order.total.toLocaleString()}
          </p>

          <div className="bg-background rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-4">Order Timeline</h2>
            {order.timeline.map((event, index) => (
              <TrackOrderCard key={index} {...event} />
            ))}
          </div>

          <div>
            <h2 className="font-semibold mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₵{item.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
