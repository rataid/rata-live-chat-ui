export default function StopPropagate({ children }: React.PropsWithChildren) {
  return (
    <div onClick={(e) => e.stopPropagation()} aria-hidden="true">
      {children}
    </div>
  )
}
