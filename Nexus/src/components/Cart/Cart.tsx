import { useCart } from "../../store/useCart"
import styles from "./Cart.module.scss"

export default function Cart() {
  const items = useCart((s) => s.items)
  const totalPrice = useCart((s) => s.totalPrice())
  const increment = useCart((s) => s.increment)
  const decrement = useCart((s) => s.decrement)
  const remove = useCart((s) => s.removeFromCart)
  const clear = useCart((s) => s.clear)

  return (
    <aside className={styles.cart}>
      <h3>سبد خرید ({items.length})</h3>
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
                <button onClick={() => remove(it.id)}>حذف</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div>مجموع: ${totalPrice.toFixed(2)}</div>
        <div>
          <button
            onClick={() => alert("پرداخت (شبیه‌سازی)")}
            className={styles.checkout}>
            تسویه حساب
          </button>
          <button onClick={() => clear()}>پاک کردن سبد</button>
        </div>
      </div>
    </aside>
  )
}
