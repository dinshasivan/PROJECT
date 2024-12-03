import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaHeart } from "react-icons/fa6";
import Footer from '../components/Footer';

const Products = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");

  const fetchProductData = async () => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image[0]);
      console.log(selectedProduct);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <section className="p-6 md:p-12">
      <div className="container mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Product Data */}
        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Product Images */}
          <div className="flex-1">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                {product.image.map((item, i) => (
                  <img
                    onClick={() => setImage(item)}
                    src={item}
                    key={i}
                    alt="product"
                    className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:border-primary"
                  />
                ))}
              </div>
              <div className="flex justify-center items-center w-full">
                <img
                  src={image}
                  alt="selected product"
                  className="max-h-96 w-auto object-cover rounded-lg border"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-[1.5]">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h3>
            <div className="text-lg font-semibold text-gray-600 mb-4">
              <span>{currency}</span>
              <span>{product.price}</span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="flex gap-4 mb-6">
              <button onClick={()=>addToCart(product._id)} className="bg-secondary  py-2 px-6 rounded-lg shadow hover:bg-primary-dark">
                Add to Cart
              </button>
              <button className="border border-gray-300 py-2 px-6 rounded-lg shadow hover:bg-gray-100">
              <FaHeart />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span>🚚</span>
              <p className="text-sm text-gray-500">Free Delivery on orders over 500</p>
            </div>
            <hr className="my-6" />
            <div className="text-sm text-gray-600 space-y-2">
              <p>✔️ Authenticity You Can Trust</p>
              <p>✔️ Enjoy Cash on Delivery for Your Convenience</p>
              <p>✔️ Fast Delivery</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default Products;
