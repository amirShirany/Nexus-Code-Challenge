import type { Product } from "../../types/product"
import styles from "./ProductCard.module.scss"
import { useCart } from "../../store/useCart"

type Props = { product: Product }

export default function ProductCard({ product }: Props) {
  const addToCart = useCart((s) => s.addToCart)

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.title} />
      </div>
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.bottom}>
        <div className={styles.price}>${product.price.toFixed(2)}</div>
        <button className={styles.addBtn} onClick={() => addToCart(product)}>
          افزودن به سبد
        </button>
      </div>
    </article>
  )
}
