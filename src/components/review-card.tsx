import { Star } from "lucide-react"

interface ReviewCardProps {
  author: string
  rating: number
  title: string
  content: string
  date: string
  verified?: boolean
}

export default function ReviewCard({ author, rating, title, content, date, verified }: ReviewCardProps) {
  return (
    <div className="border-b border-border pb-6 last:border-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold">{author}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            {verified && (
              <span className="text-xs bg-green-500/20 text-green-700 px-2 py-0.5 rounded">Verified Purchase</span>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString()}</p>
      </div>
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  )
}
