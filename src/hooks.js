import { useState } from 'react'

export function useGridSpans(imageRef) {
  const [gridSpan, setGridSpan] = useState(0)

  function setSpans() {
    const height = imageRef.current.clientHeight
    const value = Math.ceil(height / 10)
    setGridSpan(value)
  }

  return [gridSpan, setSpans]
}
