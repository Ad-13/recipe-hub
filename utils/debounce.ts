export default function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: T) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}