import { FieldValues, UseFormRegister, useFormContext } from 'react-hook-form'

export type FormRegisteredProps = {
  fieldNames: string[]
  register?: UseFormRegister<FieldValues>
}

export function FormRegistered({
  register: registerValue,
  fieldNames,
}: FormRegisteredProps) {
  const formContext = useFormContext()

  if (!formContext && !registerValue) {
    throw new Error(
      'FormRegistered must be used within a FormContext or have a register prop'
    )
  }

  const fnRegister = registerValue || formContext.register

  return (
    <>
      {fieldNames.map((fieldName) => {
        return (
          <input key={fieldName} type="hidden" {...fnRegister(fieldName)} />
        )
      })}
    </>
  )
}
