import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { updateOrderStatus } from '../store/orderSlice';
import toast from 'react-hot-toast';
import isAdmin from '../utils/isAdmin';

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);
  console.log(orders);
  
  

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateOrderStatus,
        data: { orderId, status: newStatus },
      });

      if (response.data.success) {
        dispatch(updateOrderStatus({ orderId, status: newStatus }));
        toast.success(`Order status updated to ${newStatus}`);
      }
    } catch (error) {
      toast.error('Failed to update order status.');
    }
  };

  // Admin sees all orders, regular users see only their own orders
  const filteredOrders = isAdmin(user.role=="ADMIN")
    ? orders // Admin sees all orders
    : orders.filter((order) => order.userId === user._id); // Regular user sees only their orders

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md p-5 font-semibold text-xl text-center mb-4">
        <h1>{isAdmin(user.role) ? 'Manage Orders' : 'My Orders'}</h1>
      </div>
      {!filteredOrders.length && <NoData />}
      {filteredOrders.map((order, index) => {
        return (
          <div key={order._id + index + 'order'} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <p className="text-gray-600 text-sm">
              Order No: <span className="font-bold">{order?.orderId}</span>
            </p>
            <div className="flex items-center gap-4 mt-3">
              <img
                src={order.product_details.image[0]}
                alt="Product"
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-medium text-lg">{order.product_details.name}</p>
                <p className="text-sm text-gray-500">
                  Tracking Status: <span className="text-green-600 font-semibold">{order.status}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Expected Delivery: <span className="font-semibold">5-7 Business Days</span>
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <p>
                Ordered On: <span className="font-semibold">{order.orderedDate}</span>
              </p>
              <p>
                Order Status: <span className="text-blue-600 font-semibold">{order.status}</span>
              </p>
            </div>

            {isAdmin(user.role) && (
              <div className="mt-4 flex gap-4">
                {['Packed', 'Shipped', 'Delivered'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(order.orderId, status)}
                    className={`px-4 py-2 text-white rounded ${
                      order.status === status
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    disabled={order.status === status}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
