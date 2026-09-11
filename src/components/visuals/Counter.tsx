import { useCountUp } from '../../hooks/useCountUp'
import { cn } from '../../utils/cn'

interface CounterProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function Counter({ value, suffix = '', prefix = '', decimals = 0, className }: CounterProps) {
  const { ref, value: v } = useCountUp(value, 1600, decimals)
  const text = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')
  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className={cn('tabular-nums', className)} aria-label={`${prefix}${value.toLocaleString('en-US')}${suffix}`}>
      {prefix}
      {text}
      {suffix}
    </span>
  )
}
