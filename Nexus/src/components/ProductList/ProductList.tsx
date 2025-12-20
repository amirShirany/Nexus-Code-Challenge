import styles from "./ProductList.module.scss"
import { useEffect, useRef } from "react"
import { useProducts } from "../../hooks/useProducts"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import type { Product } from "../../types/product"
import type { InfiniteData } from "@tanstack/react-query"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useProducts()
  const parentRef = useRef<HTMLDivElement | null>(null)
  const infiniteData = data as InfiniteData<Product[]> | Product[] | undefined
  const allItems: Product[] = Array.isArray(infiniteData)
    ? infiniteData
    : infiniteData?.pages?.flat() ?? []

  useEffect(() => {
    const el = parentRef.current
    if (!el) return

    const handleScroll = () => {
      if (
        hasNextPage &&
        !isFetchingNextPage &&
        el.scrollHeight - el.scrollTop - el.clientHeight < 320
      ) {
        fetchNextPage()
      }
    }

    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (error) {
    return <div className={styles.loader}>خطا در بارگذاری اطلاعات!</div>
  }

  if (!data || !allItems.length) {
    return <div className={styles.loader}>در حال بارگذاری محصولات...</div>
  }

  return (
    <div ref={parentRef} className={styles.container}>
      <div className={styles.inner}>
        <TransitionGroup component="div" className={styles.grid}>
          {allItems.map((item) => (
            <AnimatedProductCard key={item.id} product={item} />
          ))}
        </TransitionGroup>
        {hasNextPage && (
          <div className={styles.loadMore}>
            {isFetchingNextPage ? "در حال بارگذاری موارد بیشتر..." : ""}
          </div>
        )}
      </div>
    </div>
  )
}

function AnimatedProductCard({ product }: { product: Product }) {
  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <CSSTransition nodeRef={nodeRef} timeout={480} classNames="fade-in-product">
      <div ref={nodeRef} className={styles.cardShell}>
        <ProductCard product={product} />
      </div>
    </CSSTransition>
  )
}
