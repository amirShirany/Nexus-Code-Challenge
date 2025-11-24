import ProductList from "./components/ProductList/ProductList" 
import Cart from "./components/Cart/Cart"
//optional for layout// import styles from "./App.module.scss"

export default function App() {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <h1>Nexus Gallery</h1>
      </header>

      <main style={{ padding: 16 }}>
        <ProductList />
      </main>

      <Cart />
    </div>
  )
}
