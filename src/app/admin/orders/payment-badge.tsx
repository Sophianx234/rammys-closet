import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "./page";

export default function PaymentBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    failed: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <Badge variant="outline" className={`${styles[status]} capitalize border px-3 py-1 shadow-sm text-sm`}>
      {status}
    </Badge>
  );
}