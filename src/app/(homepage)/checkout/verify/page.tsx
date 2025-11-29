"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDashStore } from "@/lib/store";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

function page() {
  const {user} = useDashStore();
  const [isProcessing, setIsProcessing] = useState(true);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [placedOrder, setPlacedOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { clearCart } = useDashStore();
  

      useEffect(() => {
      const verifyPayment = async () => {
        const pendingOrder = localStorage.getItem("pendingOrder");
        if (!pendingOrder) return;
  
        const orderData = JSON.parse(pendingOrder as string);
        try {
  
          const verifyResponse = await fetch(`/api/paystack/verify?reference=${orderData.reference}`);
          const verifyData = await verifyResponse.json();
  
          if (verifyResponse.ok && verifyData.status === "success") {
           const order =  await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderData),
            });
            if(order.ok){
              const orderData = await order.json();
              console.log('Order placed:', placedOrder);
              setOrderNumber(orderData?.order.paymentReference);
              setPlacedOrder(orderData.order);
            }
  
            clearCart();
            localStorage.removeItem("pendingOrder");
          } else {
            setError("Payment verification failed");
          }
        } catch (e) {
          setError("Verification error");
        } finally {
          setIsProcessing(false);
        }
      };
  
      verifyPayment();
    }, []);
  
  if (isProcessing ) {
      return (
        <main className="flex items-center justify-center h-screen bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
                  <GridLoader size={24} color="#ffaf9f" />
            
  
            <h2 className="text-xl font-semibold">Verifying Payment…</h2>
            <p className="text-muted-foreground text-sm">
              Please wait while we confirm your transaction.
            </p>
          </div>
        </main>
      );
    }
  
    return (
      <main>
        <section className="bg-secondary border-b border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">
              Order Confirmed
            </h1>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-card border-border p-8 text-center space-y-6">
            <CheckCircle size={64} className="mx-auto text-primary" />
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground">
                Your payment has been received and your order is confirmed
              </p>
            </div>

            <div className="bg-secondary p-4 rounded-lg space-y-2 text-left">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-mono font-semibold text-lg">{orderNumber}</p>
            </div>

            <div className="space-y-2 text-left">
              <p className="text-sm font-semibold">Order Details</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Email: {user?.email}</p>
                <p>Items: {placedOrder?.items.length}</p>
                <p>Total: ₵{placedOrder?.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to{" "}
                <strong>{user?.email}</strong>. You will receive tracking
                information shortly.
              </p>
              <Link href="/orders">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Track My Order
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  

export default page
