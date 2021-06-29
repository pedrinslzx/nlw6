import { useCallback, useState } from 'react'

export function useToggle(
  initialValue = false
): [boolean, (value?: boolean) => boolean] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(
    (valueToChange?: boolean) => {
      setValue(valueToChange || !value)
      return valueToChange || !value
    },
    [value, setValue]
  )

  return [value, toggle]
}
