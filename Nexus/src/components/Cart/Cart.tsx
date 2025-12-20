import styles from "./Cart.module.scss"
import { useCart } from "../../store/useCart"

type CartProps = {
  mode?: "floating" | "page"
}

export default function Cart({ mode = "floating" }: CartProps) {
  const items = useCart((s) => s.items)
  const totalPrice = useCart((s) => s.totalPrice())
  const increment = useCart((s) => s.increment)
  const decrement = useCart((s) => s.decrement)
  const remove = useCart((s) => s.removeFromCart)
  const clear = useCart((s) => s.clear)
  const containerClass =
    mode === "page" ? `${styles.cart} ${styles.page}` : styles.cart

  return (
    <aside className={containerClass}>
      <h3>سبد خرید شما ({items.length}) نوع کالا دارد</h3>
      <div className={styles.items}>
        {items.map((it) => (
          <div key={it.id} className={styles.item}>
            <img src={it.image} alt={it.title} />
            <div className={styles.meta}>
              <div>{it.title}</div>
              <div>${(it.price * it.quantity).toFixed(2)}</div>
              <div className={styles.controls}>
                <button onClick={() => decrement(it.id)}>-</button>
                <span>{it.quantity}</span>
                <button onClick={() => increment(it.id)}>+</button>
                <button className={styles.remove} onClick={() => remove(it.id)}>
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>مجموع: ${totalPrice.toFixed(2)}</div>
        <div className={styles.actions}>
          <button
            onClick={() => alert("پرداخت شد!")}
            className={styles.checkout}>
            تسویه حساب
          </button>
          <button className={styles.clear} onClick={() => clear()}>
            پاک کردن سبد
          </button>
        </div>
      </div>
    </aside>
  )
}
