import { NavLink, Route, Routes } from "react-router-dom"
import styles from "./App.module.scss"
import CartPage from "./pages/CartPage/CartPage"
import ProductPage from "./pages/ProductPage/ProductPage"
import { useCart } from "./store/useCart"

export default function App() {
  const totalCount = useCart((s) => s.totalCount())
  const totalPrice = useCart((s) => s.totalPrice())

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink

  return (
    <div className={styles.app}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.branding}>
            <p>گالری محصولات دیجیتال</p>
            <h1>Nexus Gallery</h1>
            <p>محبوب‌ترین گجت‌ها با تحویل سریع و تضمین اصالت</p>
          </div>
          <nav className={styles.nav}>
            <NavLink to="/" end className={navLinkClass}>
              محصولات
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              سبد خرید
            </NavLink>
            <span className={styles.cartButton}>
               اطلاعات سبد خرید
              <span className={styles.badge}>{totalCount}</span>
              <span>${totalPrice.toFixed(2)} : مبلغ</span>
            </span>
          </nav>
        </header>

        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
