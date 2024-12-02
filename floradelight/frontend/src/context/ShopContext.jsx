import { createContext, useState } from "react";
import { products } from "../assets/data";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

const currency = "$";
const delivery_charge =30

const [search, setSearch]=useState("")
const [showSearch, setShowSearch]=useState(false)

const contextvalue = {products,currency,delivery_charge,search,
  setSearch,showSearch,setShowSearch
}
  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
