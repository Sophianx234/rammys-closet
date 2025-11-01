import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface OrderCardProps {
  id: string
  orderNumber: string
  date: string
  total: number
  status: "processing" | "shipped" | "delivered"
  items: number
}

const statusColors = {
  processing: "bg-yellow-500/10 text-yellow-700",
  shipped: "bg-blue-500/10 text-blue-700",
  delivered: "bg-green-500/10 text-green-700",
}

export default function OrderCard({ id, orderNumber, date, total, status, items }: OrderCardProps) {
  return (
    <Link href={`/track/${id}`}>
      <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Order #</p>
            <p className="font-semibold">{orderNumber}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{new Date(date).toLocaleDateString()}</span>
          <span>{items} item(s)</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
            <p className="font-semibold">₦{total.toLocaleString()}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </Link>
  )
}
