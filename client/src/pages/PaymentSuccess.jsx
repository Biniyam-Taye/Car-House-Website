import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const [loading, setLoading] = useState(true);
  const hasPurchased = useRef(false);

  useEffect(() => {
    const finalizePurchase = async () => {
      const sessionId = searchParams.get("session_id");
      const car = searchParams.get("car");
      const pickupDate = searchParams.get("pickupDate");
      const returnDate = searchParams.get("returnDate");
      const purchaseType = searchParams.get("purchaseType") || "sale";

      if (!sessionId || !car) {
        setLoading(false);
        return;
      }

      if (hasPurchased.current) return;
      hasPurchased.current = true; // Prevent duplicate API calls on strict mode

      try {
        const { data } = await axios.post("/api/booking/create", {
          car,
          ...(pickupDate && { pickupDate }),
          ...(returnDate && { returnDate }),
          purchaseType,
        });

        if (data.success) {
          toast.success(
            purchaseType === "sale"
              ? "Payment successful! Your purchase order has been confirmed."
              : "Payment successful! Order confirmed."
          );
          setTimeout(() => navigate("/my-bookings"), 2500);
        } else {
          toast.error(data.message || "Failed to finalize your order.");
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    finalizePurchase();
  }, [searchParams, axios, navigate]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      {loading ? (
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold">Processing Payment...</h2>
          <p className="text-gray-500 mt-2">Please don't close this window.</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500">Payment Issue</h2>
          <p className="text-gray-500 mt-2">There was an error finalizing your order.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-primary hover:bg-primary-dull text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Return Home
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
