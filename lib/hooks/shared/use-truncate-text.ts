import { useState, useEffect, RefObject } from 'react'

interface UseTruncateText {
  truncateText: boolean
}

export const useTruncateText = (
  ref: RefObject<HTMLSpanElement>,
  text: string
): UseTruncateText => {
  const [truncateText, setTruncateText] = useState<boolean>(false)

  useEffect(() => {
    const element = ref.current

    const isCheckTruncate = Boolean(
      element &&
        (element.scrollWidth > element.clientWidth ||
          (element.scrollWidth === 0 && element.clientWidth === 0))
    )

    setTruncateText(isCheckTruncate)
  }, [ref, text?.length])

  return {
    truncateText
  }
}
