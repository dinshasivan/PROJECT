import { createContext, useEffect, useState } from "react";
import { products } from "../assets/data";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

const currency = "$";
const delivery_charge =30

const [search, setSearch]=useState("")
const [showSearch, setShowSearch]=useState(false)
const [cartItems,setCartItems]=useState({})

//add to cart

const addToCart = async (itemId) => {
  let cartData = structuredClone(cartItems);

  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }

  setCartItems(cartData);
};

useEffect(() => {
  console.log(cartItems);
}, [cartItems]);

const getCartCount = () => {
  let totalCount = 0;

  for (const item in cartItems) {
    try {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    } catch (error) {
      console.error("Error in getCartCount:", error);
    }
  }

  console.log("Total count:", totalCount);
  return totalCount; // Ensure the function returns the count
};

//update quantity
const updateQuantity = async (itemId, quantity) => {
  let cartData = structuredClone(cartItems);
  cartData[itemId] = quantity;
  setCartItems(cartData);
};

// Getting total cart amount
const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItems) {
    const itemInfo = products.find((product) => product._id === itemId); // Find the product based on itemId

    // Ensure the product exists before calculating the total
    if (itemInfo) {
      try {
        if (cartItems[itemId] > 0) {
          totalAmount += itemInfo.price * cartItems[itemId]; // Multiply the price by the quantity
        }
      } catch (error) {
        console.error("Error calculating total amount:", error);
      }
    }
  }

  return totalAmount;
};


const contextvalue = {products,currency,delivery_charge,search,
  setSearch,showSearch,setShowSearch, addToCart,getCartCount,cartItems,updateQuantity,getCartAmount,
  delivery_charge
}
  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
