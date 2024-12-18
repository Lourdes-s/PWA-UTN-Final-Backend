import { useCallback, useEffect, useRef } from 'react'

const useInfiniteScrolling = (fetchData, hasMore) => {
  const loadMoreRef = useRef(null)

  const handleIntersection = useCallback(
    (entries) => {
      const isIntersecting = entries[0]?.isIntersecting
      if (isIntersecting && hasMore) {
        fetchData()
      }
    },
    [fetchData, hasMore]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection)

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [handleIntersection])

  return { loadMoreRef }
}

export default useInfiniteScrolling;