export default function PreventDefault({ children }: React.PropsWithChildren) {
  return (
    <div onClick={(e) => e.preventDefault()} aria-hidden="true">
      {children}
    </div>
  )
}
