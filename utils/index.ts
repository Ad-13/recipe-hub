import type { Difficulty } from '@/types'

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ')
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

export function difficultyStyle(difficulty: Difficulty): string {
  const map: Record<Difficulty, string> = {
    easy:   'bg-sage-soft   text-sage   border-sage/30',
    medium: 'bg-amber-soft  text-amber  border-amber/30',
    hard:   'bg-accent-soft text-accent border-accent/30',
  }
  return map[difficulty]
}
