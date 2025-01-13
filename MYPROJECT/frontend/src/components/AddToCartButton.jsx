import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
    const cartItem = useSelector(state => state.cartItem.cart);

    const [loading, setLoading] = useState(false);
    const [cartDetails, setCartDetails] = useState(null);

    // Check if the product exists in the cart
    useEffect(() => {
        const item = cartItem.find(item => item.productId._id === data._id);
        setCartDetails(item || null);
    }, [data, cartItem]);

    // Add product to the cart
    const handleAddToCart = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.addTocart,
                data: { productId: data._id },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchCartItem(); // Refresh the cart items
            }
        } catch (error) {
            toast.error('Failed to add item to the cart.');
        } finally {
            setLoading(false);
        }
    };

    // Update product quantity in the cart
    const handleUpdateQty = async (newQty) => {
        if (newQty <= 0) {
            handleRemoveFromCart();
            return;
        }

        try {
            const response = await updateCartItem(cartDetails._id, newQty);
            if (response.success) {
                toast.success('Quantity updated.');
            }
        } catch (error) {
            toast.error('Failed to update quantity.');
        }
    };

    // Remove product from the cart
    const handleRemoveFromCart = async () => {
        try {
            await deleteCartItem(cartDetails._id);
            toast.success('Item removed from the cart.');
        } catch (error) {
            toast.error('Failed to remove item.');
        }
    };

    return (
        <div className="w-full max-w-[150px]">
            {cartDetails ? (
                <div className="flex">
                    <button
                        onClick={() => handleUpdateQty(cartDetails.quantity - 1)}
                        className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
                    >
                        <FaMinus />
                    </button>
                    <p className="px-2 font-semibold">{cartDetails.quantity}</p>
                    <button
                        onClick={() => handleUpdateQty(cartDetails.quantity + 1)}
                        className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
                    >
                        <FaPlus />
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleAddToCart}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                >
                    {loading ? 'Loading...' : 'Add'}
                </button>
            )}
        </div>
    );
};

export default AddToCartButton;
