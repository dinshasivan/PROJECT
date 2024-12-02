import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import TopProducts from "./pages/TopProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";


export default function App (){
  return (
    <div className="overflow-hidden text-[#404040] bg-slate-50">
      <Header/>
     
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/topproducts" element={<TopProducts/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/place-order" element={<PlaceOrder/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/verify" element={<Verify/>}/>
      </Routes>
      
     
    </div>
  )
}