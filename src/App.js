import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom';
import Products from './component/products';
import Product  from './component/Product';
import Cart from './component/Cart';
import Login from './component/buttons/Login';
import Checkout from './component/Checkout';
import Donate from './component/Donate';
import CommandePage from './component/Commande';

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id_product" element={<Product/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Login" element={<Login onLogin={Login} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/Donate" element={<Donate />} />
        <Route path="/commands/:email" element={<CommandePage />} />
      </Routes>
      
      
    </>
  );
}

export default App;