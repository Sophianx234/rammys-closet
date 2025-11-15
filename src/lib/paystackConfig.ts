// /lib/paystackConfig.ts
export type PaystackPaymentData = {
  email: string;
  amount: number; // in kobo
  currency?: string;
};

export const startPaystackPayment = (
  paymentData: PaystackPaymentData,
  callback: (response: { status: "success" | "cancelled"; [key: string]: any }) => void
) => {
  if (typeof window === "undefined") return; // Ensure client-side

  // Load Paystack script dynamically if not already loaded
  if (!(window as any).PaystackPop) {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => openPaystack(paymentData, callback);
    document.body.appendChild(script);
  } else {
    openPaystack(paymentData, callback);
  }
};

const openPaystack = (
  { email, amount, reference, currency }: PaystackPaymentData,
  callback: (response: { status: "success" | "cancelled"; [key: string]: any }) => void
) => {
  const handler = (window as any).PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Public key from env
    email,
    amount,
    currency: currency || "GHS",
    ref: reference,
    onClose: () => callback({ status: "cancelled" }),
    callback: (res: any) => callback({ status: "success", ...res }),
  });

  handler.openIframe();
};
