type TabsIdProps = {
  id?: string
  marginTop?: string
}

export function TabsId({ id, marginTop }: TabsIdProps) {
  return <div id={id} className="absolute" style={{ marginTop }} />
}
