import { useState, useCallback, useMemo } from "react"

type Validator = Record<string, (value: string) => string | undefined>

const reduction = <T,>(fields: string[], initial: T) => {
  return fields.reduce((acc, field) => {
    acc[field] = initial
    return acc
  }, {} as Record<string, T>)
}

const merge =
  <T extends object>(a: T) =>
  (b: T) => ({ ...b, ...a })

export const useBasicForm = (fields: string[], validators?: Validator) => {
  const [state, setState] = useState(reduction(fields, ""))

  const [isDirty, setIsDirty] = useState(reduction(fields, false))

  const [errorsRaw, setErrorsRaw] = useState(
    reduction<string | undefined>(fields, undefined)
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      const name = event.target.name
      setState(merge({ [name]: value }))
      setIsDirty(merge({ [name]: true as boolean }))
      if (validators && validators[name]) {
        const error = validators[name](value)
        if (error) {
          setErrorsRaw(merge({ [name]: error as string | undefined }))
        }
      }
    },
    [validators]
  )

  const errors = useMemo(() => {
    let errors: Record<string, string | undefined> = {}
    fields.forEach((field) => {
      if (errorsRaw[field]) {
        if (isDirty[field]) {
          errors[field] = errorsRaw[field]
        }
      }
    })
    return errors
  }, [errorsRaw, fields, isDirty])

  return { state, errors, handleChange }
}
