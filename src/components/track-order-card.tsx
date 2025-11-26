import { toKey } from "@/lib/utils";
import { OrderStatus } from "@/models/Order";
import { AlertTriangle, CheckCircle2, Clock, Home, Navigation, Package, PackageCheck, Truck, TruckIcon, XCircle } from "lucide-react";

interface TrackOrderCardProps {
  status: 'completed' | 'current' | 'upcoming'
  title: OrderStatus
  date: string
  location?: string
  description: string
  nextStatus?: 'completed' | 'current' | 'upcoming'
}

const getStatusIcon = (key: string) => {
  switch (key) {
    case "processing":
      return <Clock className="w-6 h-6" />;
    case "ready_for_pickup":
      return <Package className="w-6 h-6" />;
    case "packed":
      return <PackageCheck className="w-6 h-6" />;
    case "ready_for_dispatch":
      return <TruckIcon className="w-6 h-6" />;
    case "dispatched":
      return <Truck className="w-6 h-6" />;
    case "in_transit":
      return <Navigation className="w-6 h-6" />;
    case "arrived":
      return <Home className="w-6 h-6" />;
    case "delivery_attempted":
      return <AlertTriangle className="w-6 h-6" />;
    case "delivered":
      return <CheckCircle2 className="w-6 h-6" />;
    case "cancelled":
      return <XCircle className="w-6 h-6" />;
    default:
      return <Clock className="w-6 h-6" />;
  }
};


export default function TrackOrderCard({ status, date, location, description,title,nextStatus }: TrackOrderCardProps) {
  console.log("Rendering TrackOrderCard with status:", { status, title }, nextStatus);
  
  return (
    <div className="flex gap-4 pb-8 relative">
      <div className="flex flex-col items-center">
       <div
  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4
    ${
      status === "completed"
        ? "bg-green-500/20"
        : status === "current"
        ? "bg-blue-500/30"
        : "bg-yellow-500/20" // upcoming
    }
  `}
>
          <span className="text-xl">{getStatusIcon(toKey(title))}</span>
        </div>
        <div className={`w-1 h-16 ${nextStatus ==='upcoming'?"bg-border":nextStatus==='completed'?'bg-green-500/40':'hidden'} `} />
      </div>

      <div className="pt-2 pb-4">
        <p className="font-semibold capitalize">{status === 'completed' || status === 'current' ? title:status}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        {location && <p className="text-xs text-muted-foreground mt-2">{location}</p>}
        {date?<p className="text-xs text-muted-foreground mt-2">
          
          {new Date(date).toLocaleDateString()} at{" "}
          {new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>:<p className="text-xs text-muted-foreground mt-2">Waiting for confirmation</p>}
      </div>
    </div>
  )
}
