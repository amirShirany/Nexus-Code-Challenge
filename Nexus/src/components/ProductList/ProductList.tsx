import { useEffect, useRef } from "react"
import { useProducts } from "../../hooks/useProducts"
import { useVirtualizer } from "@tanstack/react-virtual"
import ProductCard from "../ProductCard/ProductCard"
import styles from "./ProductList.module.scss"

export default function ProductList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useProducts()
  const parentRef = useRef<HTMLDivElement | null>(null)

  // تغییر بر اساس نوع برگرداندن داده useProducts
  const allItems = data?.pages?.flat?.() ?? []

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allItems.length + 1 : allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 340,
    overscan: 3,
  })

  useEffect(() => {
    const last = rowVirtualizer.getVirtualItems().slice(-1)[0]
    if (!last) return

    if (
      last.index >= allItems.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [rowVirtualizer.getVirtualItems(), allItems.length, hasNextPage])

  if (error) {
    return (
      <div className={styles.loader}>خطا در بارگذاری اطلاعات</div>
    )
  }

  if (!data || !allItems.length) {
    return (
      <div className={styles.loader}>در حال بارگذاری...</div>
    )
  }

  return (
    <div ref={parentRef} className={styles.container}>
      <div
        className={styles.inner}
        style={{ height: rowVirtualizer.getTotalSize() }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = allItems[virtualRow.index]

          return (
            <div
              key={virtualRow.key}
              className={styles.row}
              style={{ transform: `translateY(${virtualRow.start}px)` }}>
              {item ? (
                <ProductCard product={item} />
              ) : (
                hasNextPage && (
                  <div className={styles.loader}>در حال بارگذاری...</div>
                )
              )}
            </div>
          )
        })}
      </div>

      {isFetchingNextPage && (
        <div className={styles.loadingMore}>در حال بارگذاری موارد بیشتر...</div>
      )}
    </div>
  )
}
