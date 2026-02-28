export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid grid-cols-8 gap-10 px-6 py-6 md:gap-12 md:px-9 md:py-7"
      style={{ maxWidth: '1480px', marginInline: 'auto' }}
    >
      {children}
    </div>
  )
}
