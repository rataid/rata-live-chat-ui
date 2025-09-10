import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { UseFormProps, useForm, useFormContext } from 'react-hook-form'
import { useLoaderData, useParams, useSubmit } from 'react-router-dom'

type UseFormHelperProps = {
  schema?: any
  args?: any
  query?: any
  queryKey?: string
  refetchInterval?: number
}

export default function useFormHelper<TData>({
  schema,
  args: argsValue,
  query,
  queryKey,
  refetchInterval,
}: UseFormHelperProps) {
  const submit = useSubmit()

  const params = useParams()

  const args = argsValue || { id: params?.id }

  const q = query
    ? query(args, queryKey)
    : {
        queryKey: ['empty'],
        queryFn: () => null,
      }

  const loaderData = useLoaderData() as Awaited<TData>

  const { data, isLoading } = useQuery<TData>({
    ...q,
    refetchInterval,
    enabled: !isEmpty(args),
  })

  const formOptions: UseFormProps = {
    mode: 'onBlur',
  }

  if (schema) {
    formOptions.resolver = zodResolver(schema)
  } else {
    formOptions.resolver = undefined
  }

  const methods = useForm(formOptions)

  const formContext = useFormContext()

  // Validate only particular fields based on the schema
  const fieldsValid = async (fields: string[]) => {
    await formContext.trigger(fields)

    const pickedFields = fields.reduce((acc, field) => {
      return { ...acc, [field]: true }
    }, {})
    const partialSchema = schema.pick(pickedFields)
    const values = fields.reduce((acc, field) => {
      formContext.trigger(field)
      return { ...acc, [field]: formContext.getValues(field) }
    }, {})
    const message = partialSchema.safeParse(values)

    return message.success
  }

  const onSubmit = methods.handleSubmit((formData: any, e: any) =>
    submit(e.target)
  )

  return {
    methods,
    formContext,
    loaderData,
    data,
    isLoading,
    fieldsValid,
    submit,
    onSubmit,
  }
}
