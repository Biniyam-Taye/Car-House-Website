import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/Owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();
  const [data, setData] = useState({
    totalCars: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completeOrder: 0,
    recentOrders: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingOrders,
      icon: assets.cautionIconColored,
    },
    { title: "Confirmed", value: data.totalCars, icon: assets.listIconColored },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);
  return (
    <div className="w-full min-h-screen p-3 md:p-8 lg:p-10 bg-light">
      <Title
        title="Owner Dashboard"
        subTitle="Monitor your cars, orders, revenue, and recent activities"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 my-6 md:my-8">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 md:gap-4 items-center justify-between p-4 md:p-5 rounded-lg border border-borderColor bg-white hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div>
              <h1 className="text-xs md:text-sm text-gray-500 font-medium">{card.title}</h1>
              <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex-shrink-0">
              <img src={card.icon} alt="" className="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-8 w-full">
        {/*recent orders*/}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 md:p-6 border border-borderColor rounded-lg bg-white shadow-sm w-full lg:flex-1 order-2 lg:order-1"
        >
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Recent Orders</h1>
          <p className="text-gray-500 text-xs md:text-sm mb-4">Latest Customer Orders</p>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {data.recentOrders && data.recentOrders.length > 0 ? (
              data.recentOrders.map((order, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mt-3 md:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 hover:bg-blue-50 rounded-lg transition"
                >
                  <div className="flex items-center gap-3 w-full sm:flex-1">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                      <img src={assets.listIconColored} alt="" className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm md:text-base truncate">
                        {order.car?.brand} {order.car?.model}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.createdAt ? order.createdAt.split("T")[0] : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-medium w-full sm:w-auto justify-between sm:justify-end">
                    <p className="text-xs md:text-sm text-gray-700">
                      {currency}
                      {order.price}
                    </p>
                    <p className="px-2 md:px-3 py-1 border border-blue-200 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 flex-shrink-0">
                      {order.status}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8 text-sm">No recent orders</p>
            )}
          </div>
        </motion.div>

        {/*monthly revenue*/}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 md:p-6 border border-borderColor rounded-lg bg-white shadow-sm w-full sm:w-80 lg:w-96 order-1 lg:order-2"
        >
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Monthly Revenue</h1>
          <p className="text-gray-500 text-xs md:text-sm mb-6">Revenue for current month</p>
          <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
            {currency}
            {data.monthlyRevenue || 0}
          </div>
          <p className="text-xs text-gray-500">All transactions included</p>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3">Performance</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Completed Orders</span>
                <span className="font-semibold text-gray-900">{data.completeOrder || 0}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-semibold text-orange-600">{data.pendingOrders || 0}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Dashboard;
