interface TrackOrderCardProps {
  status: "processing" | "shipped" | "delivered"
  date: string
  location?: string
  description: string
}

const statusIcons = {
  processing: "📦",
  shipped: "🚚",
  delivered: "✓",
}

export default function TrackOrderCard({ status, date, location, description }: TrackOrderCardProps) {
  return (
    <div className="flex gap-4 pb-8 relative">
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            status === "delivered" ? "bg-green-500/20" : status === "shipped" ? "bg-blue-500/20" : "bg-yellow-500/20"
          }`}
        >
          <span className="text-xl">{statusIcons[status]}</span>
        </div>
        <div className="w-1 h-16 bg-border" />
      </div>

      <div className="pt-2 pb-4">
        <p className="font-semibold capitalize">{status}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        {location && <p className="text-xs text-muted-foreground mt-2">{location}</p>}
        <p className="text-xs text-muted-foreground mt-2">
          {new Date(date).toLocaleDateString()} at{" "}
          {new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}
