import { Loader2 } from 'lucide-react'

export default function Loader({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-16 ${className ?? ''}`}>
      <Loader2 size={28} className="animate-spin text-accent" strokeWidth={1.5} />
    </div>
  )
}
