import Cart from "../../components/Cart/Cart"
import { useCart } from "../../store/useCart"
import styles from "./CartPage.module.scss"

export default function CartPage() {
  const items = useCart((s) => s.items)
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = useCart((s) => s.totalPrice())

  return (
    <section className={styles.page}>
      <div className={styles.layout}>
        <div className={`${styles.hero} ${styles.heroSticky}`}>
          <p className={styles.kicker}>سفارش‌های شما</p>
          <h2>سبد خرید Nexus</h2>
          <p className={styles.copy}>
            هر محصولی که انتخاب کرده‌اید اینجاست؛ تعداد و مبلغ نهایی را بررسی
            کنید و در صورت نیاز تغییر دهید
          </p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span>تعداد اقلام</span>
              <strong>{totalCount > 0 ? <>{totalCount} محصول</> : "۰"}</strong>
            </div>
            <div className={styles.statItem}>
              <span>مجموع قابل پرداخت</span>
              <strong>{total > 0 ? `$${total.toFixed(2)}` : "$0.00"}</strong>
            </div>
          </div>
        </div>
        <div className={styles.cartSection}>
          <Cart mode="page" />
        </div>
      </div>
    </section>
  )
}
