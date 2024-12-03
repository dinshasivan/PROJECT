import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { getCartCount, products, cartItems, currency, updateQuantity } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [quantities, setQuantities] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    const initialQuantities = {};

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        // Find the product details using the product ID
        const product = products.find((p) => p._id === itemId);

        if (product) {
          tempData.push({
            _id: itemId,
            name: product.name, // Include the product name
            quantity: cartItems[itemId],
            image: product.image[0], // Assuming the image is in product.image array
          });
          initialQuantities[itemId] = cartItems[itemId];
        }
      }
    }

    console.log("Cart Data with Names and Images:", tempData);
    console.log("Initial Quantities:", initialQuantities);
  }, [cartItems, products]);



  const increment = (id) => {
    const key = `${id}`;
    const newValue = (quantities[key] || 0) + 1; // Handle cases where quantities[key] is undefined
    setQuantities((prev) => ({ ...prev, [key]: newValue }));
    updateQuantity(id, newValue); // Update the quantity in the cart
  };

  const decrement = (id) => {
    const key = `${id}`;
    if (quantities[key] && quantities[key] > 1) { // Ensure quantities[key] is defined and greater than 1
      const newValue = quantities[key] - 1;
      setQuantities((prev) => ({ ...prev, [key]: newValue }));
      updateQuantity(id, newValue); // Update the quantity in the cart
    }
  };


  return (
    <section >
      <div className='max-padd-container'>
        {/* Title */}
        <div className='max-padd-conatiner'>
          <h3 className='font-bold p-8'>Cart <span className='text-secondary'>List</span></h3>
          <p>{getCartCount()} items</p>
        </div>

        {/* Container */}
        <div>
          {cartData.map((item, i) => {
            const productData = products.find(product => product._id === item._id);
            const key = `${item._id}`;
            console.log("product data", productData);
            

            if (!productData) return null; // Ensure productData exists

            return (
              <div key={i}>
                <div>
                  {/* Product Image */}
                  <div>
                    <img
                      src={productData.image[0]} // Use the image from productData
                      alt={productData.name}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <p>{productData.name}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className='flex my-20'>
          <div>
            <CartTotal/>
            <button onClick={()=> navigate('/place-order')}
              className='bg-green-400 ml-5 mt-6 p-2 rounded-lg'>
                Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Cart