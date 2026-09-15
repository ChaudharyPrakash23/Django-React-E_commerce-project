import ProductList from "./pages/ProductList"
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage"
import Checkoutpage from "./pages/CheckoutPage";
function App(){
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<Checkoutpage/>}/>
      </Routes>
    </Router>
  )
}
export default App