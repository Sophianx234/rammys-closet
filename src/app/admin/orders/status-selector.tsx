import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS_CONFIG } from "./page";

export default function StatusSelector({ current, onChange }: { current: string; onChange: (v: string) => void }) {
  const conf = STATUS_CONFIG[current] || { label: current, color: "bg-gray-50 text-gray-700" };
  return (
    <Select value={current} onValueChange={(v) => onChange(v)} >
      <SelectTrigger className={`h-8 text-xs w-[170px] border-0 ${conf.color} font-medium`}>
        <SelectValue>{conf.label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(STATUS_CONFIG).map(([k, c]) => (
          <SelectItem key={k} value={k}>
            <div className="flex items-center gap-2">
              <span className="text-sm">{c.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
