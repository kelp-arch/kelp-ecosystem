import Image from 'next/image'

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/kelp/kelp-logo-1.png"
      alt="Kelp"
      width={250}
      height={50}
      className={className}
      priority
    />
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <Image
      src="/kelp/kelp-logo-mark-1.png"
      alt="Kelp"
      width={50}
      height={50}
      className={className}
    />
  )
}