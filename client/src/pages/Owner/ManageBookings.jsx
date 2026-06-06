import React, { useEffect, useState } from "react";
import Title from "../../components/Owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageOrders = () => {
  const { currency, user, axios } = useAppContext();

  const [orders, setOrders] = useState([]);

  const fetchOwnerOrders = async () => {
    try {
      const { data } = await axios.get("/api/booking/owner");
      data.success ? setOrders(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const changeOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axios.post("/api/booking/change-status", {
        orderId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    user && fetchOwnerOrders();
  }, [user]);
  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Orders"
        subTitle="Track all customer orders,approve
      or cancel requests,and manage order status. "
      />
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-t border-borderColor text-gray-500"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={order.car.image}
                    alt=""
                    className=" h-12 w-12
            aspect-square rounded-md max-md:hidden"
                  />
                  <p className="font-medium max-md:hidden">
                    {order.car.brand} {order.car.model}
                  </p>
                </td>
                <td className="p-3 max-md:hidden">
                  {order.pickupDate.split("T")[0]} to{" "}
                  {order.returnDate.split("T")[0]}
                </td>
                <td className="p-3">
                  {currency}
                  {order.price}
                </td>
                <td className="p-3 max-md:hidden">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    Offline
                  </span>
                </td>
                <td className="p-3">
                  {order.status === "pending" ? (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        changeOrderStatus(order._id, e.target.value)
                      }
                      className="px-2 py-1.5 mt-1 text-gray-500
            border border-borderColor rounded-md outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
              ${order.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                        }`}
                    >
                      {order.status}
                    </span>
                  )}
                  <button
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to delete this order?")) {
                        try {
                          const { data } = await axios.post("/api/booking/delete", {
                            bookingId: order._id,
                          });
                          if (data.success) {
                            toast.success("Order deleted successfully");
                            fetchOwnerOrders();
                          } else {
                            toast.error(data.message);
                          }
                        } catch (error) {
                          toast.error(error.message);
                        }
                      }
                    }}
                    className="ml-3 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
