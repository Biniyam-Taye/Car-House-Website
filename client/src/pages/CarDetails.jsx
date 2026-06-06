import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const CarDetails = () => {
  const { id } = useParams();

  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate, user, setShowLogin } =
    useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please register or log in to book");
      setShowLogin(true);
      return;
    }

    try {
      const { data } = await axios.post("/api/booking/checkout-session", {
        car: id,
        pickupDate,
        returnDate,
      });
      if (data.success && data.url) {
        // Redirect to Stripe-hosted checkout page
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to create checkout session");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const foundCar = cars.find((car) => car._id === id);
    setCar(foundCar);
    if (foundCar) {
      setActiveImage(foundCar.image);
    }
  }, [cars, id]);
  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/*left car image and details*/}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={activeImage || car.image}
            alt=""
            className="w-full h-auto md:max-h-120 object-cover rounded-xl shadow-md"
          />

          {/* Thumbnails Gallery */}
          {car.subImages && car.subImages.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-2 mb-6 mt-3 scrollbar-hide">
              <img
                src={car.image}
                alt="main"
                onClick={() => setActiveImage(car.image)}
                className={`w-24 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0 ${
                  activeImage === car.image ? "border-primary scale-105" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              />
              {car.subImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`sub-${idx}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0 ${
                    activeImage === img ? "border-primary scale-105" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold ">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                icon: assets.users_icon,
                text: `${car.seating_capacity} Seats`,
              },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map(({ icon, text }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={text}
                className="flex flex-col items-center bg-light p-4 rounded-lg"
              >
                <img src={icon} alt="" className="h-5 mb-2" />
                {text}
              </motion.div>
            ))}
          </div>
          {/*description */}
          <div>
            <h1 className="text-xl font-medium mb-3">Description</h1>
            <p className="text-gray-500">{car.description}</p>
          </div>
          {/*features */}
          <div>
            <h1 className="text-xl font-medium mb-3">Features</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "360 Camera",
                "bluetooth",
                "GPS",
                "Heated Seates",
                "Rear View Mirror",
              ].map((item) => (
                <li key={item} className="flex items-center text-gray-500">
                  <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        {/*Right booking form*/}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6
        text-gray-500"
        >
          <p
            className="flex items-center justify-between text-2xl text-gray-800
          font-semibold"
          >
            {currency}
            {car.pricePerDay}{" "}
            <span className="text-base text-gray-400 font-normal">
              {" "}
              per day
            </span>
          </p>

          {/* Sale / Financing Details */}
          {(car.sale_price || car.bank_price) && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-borderColor flex flex-col gap-2 text-sm">
              {car.sale_price && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-600">Cash / Outright Sale:</span>
                  <span className="text-lg font-bold text-gray-900">{car.sale_price.toLocaleString()} ETB</span>
                </div>
              )}
              {car.bank_price && (
                <div className="flex justify-between items-center border-t border-gray-200/60 pt-2">
                  <span className="font-semibold text-gray-600">Bank Price:</span>
                  <span className="text-lg font-bold text-gray-900">{car.bank_price.toLocaleString()} ETB</span>
                </div>
              )}
              {car.bank_info && (
                <div className="text-xs text-blue-600 font-medium bg-blue-50/50 p-2 rounded-lg mt-1">
                  ℹ️ {car.bank_info}
                </div>
              )}
            </div>
          )}

          <hr className="border-borderColor my-6" />
          <div>
            <label htmlFor="pickup-date">pickup-date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              id="pickup-date"
              required
              className="border border-borderColor px-3 py-2 rounded-lg"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label htmlFor="return-date">Return Date</label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              required
              className="border border-borderColor px-3 py-2 rounded-lg"
            />
          </div>
          {user && user._id === car.owner ? (
            <div className="w-full bg-gray-100 text-gray-500 py-3 text-center rounded-xl font-medium">
              This is your car
            </div>
          ) : (
            <button
              className="w-full bg-primary hover:bg-primary-dull 
              transition-all py-3 font-medium text-white rounded-xl
              cursor-pointer"
            >
              Book Now
            </button>
          )}
          <p className="text-center text-sm ">
            NO credit Card required to reserve
          </p>
        </motion.form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
