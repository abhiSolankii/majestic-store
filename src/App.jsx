import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

import { CartContextProvider } from "./context/CartContext";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <CartContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </Router>
    </CartContextProvider>
  );
};

export default App;
