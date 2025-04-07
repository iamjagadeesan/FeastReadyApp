import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import OrderTimeline from '../components/OrderTimeline.jsx';
import { GoDotFill } from "react-icons/go";

const Orders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // Track API loading state

  const fetchOrders = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false); // Stop loading after API call
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div data-aos="flip-right" data-aos-duration="500" data-aos-offset="10" 
      className="relative min-h-screen p-2 md:p-4 lg:p-6 bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white lg:px-24 text-sm md:text-base lg:text-base">
      <h2 className="text-3xl font-bold text-center w-max m-auto mb-6 font-f bg-clip-text text-transparent bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500">
        Your Orders
      </h2>

      {/* Show Loading Animation while fetching */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="m-auto h-24 w-24 rounded-full border-t-2 border-2 border-transparent border-t-yellow-300 animate-spin"></div>
        </div>
      )}

      {/* Show Orders if available */}
      {!loading && orders.length > 0 ? (
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-2 md:p-4 lg:p-4 rounded-lg shadow-md mb-6 font-e">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
            {orders.map((order, index) => (
              <div
                key={index}
                className={`flex flex-col relative p-3 rounded-lg shadow-md border-l-4 h-full bg-gradient-to-br from-green-700 via-green-800 to-green-800 ${
                  order.status === "Food Processing" ? "border-orange-600" :
                  order.status === "Out for Delivery" ? "border-blue-600" :
                  "border-green-600"
                }`}
              >
                <p className="mt-3"><strong className="text-yellow-200">Order ID - </strong> {order._id}</p>
                <p className="absolute top-1 right-1 text-xs text-gray-200 font-bold tracking-widest">
                  {new Date(order.date).toLocaleDateString()}
                </p>
                
                <div className="mt-2">
                  <strong className="text-yellow-200 underline underline-offset-4 underline-yellow-400">Items</strong>
                  <ul className="ml-4 list-disc">
                    {order.items.map((item, i) => (
                      <li key={i}>{item.name} - ₹{item.price}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-2 w-max">
                  <strong className="text-yellow-200 underline underline-offset-4 underline-yellow-400">Amount</strong> 
                  {typeof order.amount === "number" ? (
                    <span> ₹{order.amount.toFixed(2)}</span>
                  ) : (
                    <div>
                      <p>Subtotal - ₹{order.amount.subTotal}</p>
                      <p>Discount - ₹{order.amount.discount}</p>
                      <p>Delivery Fee - ₹{order.amount.deliveryFee}</p>
                      <div className="h-[2px] w-full bg-green-600 my-1"></div>
                      <p className="font-bold text-yellow-300"><strong>Total -</strong> ₹{order.amount.totalAmount}</p>
                    </div>
                  )}
                </div>

                <div className={`flex flex-col h-min`}>
                <OrderTimeline status={order.status} />

                <p className={`m-auto flex items-center ${order.status==="Food Processing"?'text-orange-500':''} ${order.status==="Out for Delivery"?'text-blue-500':''} ${order.status==="Delivered"?'text-green-500':''} text-lg font-semibold`}><GoDotFill/> {order.status}</p>
                <br />
                {order.status !== "Delivered" && (
                  <button onClick={fetchOrders} className="cursor-pointer active:scale-90 mx-auto mt-2 px-2 py-1 text-center font-bold bg-green-600 rounded-lg">
                    Check Status
                  </button>
                )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !loading && <p className="text-center text-gray-300">No orders available.</p>
      )}
    </div>
  );
};

export default Orders;
