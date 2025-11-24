import styles from "./ProductCard.module.scss"
import type { Product } from "../../types/product"
import { useCart } from "../../store/useCart"

type Props = { product: Product }

export default function ProductCard({ product }: Props) {
  const addToCart = useCart((s) => s.addToCart)
  const hasRating = product.rating && typeof product.rating.rate === "number"

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.category}</span>
          <div
            className={styles.rating}
            aria-label={
              hasRating
                ? `امتیاز ${product.rating!.rate.toFixed(1)} از ۵`
                : "بدون امتیاز ثبت‌شده"
            }>
            <span className={styles.star} aria-hidden="true">
              ★
            </span>
            {hasRating ? (
              <>
                <span className={styles.ratingValue}>
                  {product.rating!.rate.toFixed(1)}
                </span>
                <span className={styles.ratingCount}>
                  ({product.rating!.count ?? 0})
                </span>
              </>
            ) : (
              <span className={styles.ratingPlaceholder}>بدون امتیاز</span>
            )}
          </div>
        </div>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>${product.price.toFixed(2)}</div>
        <button className={styles.addBtn} onClick={() => addToCart(product)}>
          افزودن به سبد
        </button>
      </div>
    </article>
  )
}
