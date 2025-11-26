'use server'
import Header from "@/components/header";
import Footer from "@/components/footer";
import TrackOrderCard from "@/components/track-order-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default async function TrackOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/user/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  console.log("Fetched order:", data);
  const order = data.order;
  console.log("Order timeline details:", );
  // Filter timeline events
const filteredTimeline = order.timeline.filter(
  (event) => !(event.title.toLowerCase() === "cancelled" && event.status === "upcoming")
);


  if (!order) {
    return (
      <main className="min-h-screen bg-background">
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
            {filteredTimeline.map((event, index) => (
              
              <TrackOrderCard
  key={index}
  {...event}
  nextStatus={filteredTimeline[index + 1]?.status || null}
/>

            ))}
          </div>

          <div>
            <h2 className="font-semibold mb-4">Ordered Items</h2>
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
