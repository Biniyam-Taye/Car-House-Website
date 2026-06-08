import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const { cars, axios, token, setShowLogin } = useAppContext();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    const foundCar = cars.find((c) => c._id === id);
    setCar(foundCar);
    if (foundCar) setActiveImage(foundCar.image);
  }, [cars, id]);

  const handleStripePayment = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (isOrdering) return;
    setIsOrdering(true);
    try {
      const { data } = await axios.post("/api/booking/checkout-session", {
        car: car._id,
      });
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Could not initiate payment.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsOrdering(false);
    }
  };

  // Derive contact details
  const phone = car?.contact_phone || "";
  const ownerEmail = car?.owner?.email || "";

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 pb-20">
      {/* Back button */}
      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 mb-6 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <motion.img
          src={assets.arrow_icon}
          alt=""
          className="rotate-180 opacity-65"
          whileHover={{
            rotate: -180,
            scale: 1.2,
            opacity: 1
          }}
          transition={{ duration: 0.3 }}
        />
        Back to all cars
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* ─── LEFT: Images + Details ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          {/* Main Image */}
          <motion.img
            key={activeImage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={activeImage || car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-120 object-cover rounded-2xl shadow-lg"
          />

          {/* Thumbnail Gallery */}
          {car.subImages && car.subImages.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-2 mb-6 mt-3 scrollbar-hide">
              <motion.img
                src={car.image}
                alt="main"
                onClick={() => setActiveImage(car.image)}
                whileHover={{
                  scale: 1.1,
                  rotate: 2,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-24 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0 ${activeImage === car.image
                  ? "border-primary scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
                  }`}
              />
              {car.subImages.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`view-${idx}`}
                  onClick={() => setActiveImage(img)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 2,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-24 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0 ${activeImage === img
                    ? "border-primary scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                />
              ))}
            </div>
          )}

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 mt-4"
          >
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
                {car.condition && ` • ${car.condition}`}
              </p>
            </div>
            <hr className="border-borderColor" />

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity || "—"} Seats`, color: "from-blue-500 to-cyan-500" },
                { icon: assets.fuel_icon, text: car.fuel_type || "—", color: "from-green-500 to-emerald-500" },
                { icon: assets.car_icon, text: car.transmission || "—", color: "from-purple-500 to-pink-500" },
                { icon: assets.location_icon, text: car.location || "—", color: "from-orange-500 to-red-500" },
              ].map(({ icon, text, color }, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={text}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                  }}
                  className="flex flex-col items-center bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer relative overflow-hidden group"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <motion.img
                    src={icon}
                    alt=""
                    className="h-5 mb-2 relative z-10"
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.3
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.span
                    className="relative z-10 font-semibold text-gray-700"
                    whileHover={{
                      color: color.split(' ')[1].replace('to-', '')
                    }}
                  >
                    {text}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            {car.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-blue-50 to-purple-50 border border-gray-200 p-6 cursor-pointer group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative z-10">
                  <motion.h2
                    className="text-xl font-medium mb-3 text-gray-800"
                    whileHover={{
                      scale: 1.05,
                      color: "#6366f1"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Description
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 leading-relaxed"
                    whileHover={{
                      letterSpacing: "0.02em"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {car.description}
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2
                  className="text-xl font-medium mb-3 text-gray-800"
                  whileHover={{
                    scale: 1.05,
                    color: "#6366f1"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Features
                </motion.h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.features.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{
                        scale: 1.05,
                        x: 5,
                        backgroundColor: "rgba(99, 102, 241, 0.1)"
                      }}
                      className="flex items-center text-gray-600 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      <motion.img
                        src={assets.check_icon}
                        alt=""
                        className="h-4 mr-3"
                        whileHover={{
                          rotate: [0, -15, 15, -15, 0],
                          scale: 1.3
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.span
                        whileHover={{
                          color: "#6366f1",
                          fontWeight: 600
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item}
                      </motion.span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
              }}
              className="border border-borderColor rounded-xl p-5 bg-white transition-shadow"
            >
              <motion.h2
                className="text-xl font-semibold mb-4 text-gray-800"
                whileHover={{
                  scale: 1.05,
                  color: "#6366f1"
                }}
                transition={{ duration: 0.3 }}
              >
                Specifications
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-sm">
                {car.brand && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Brand</p><p className="font-semibold text-gray-700">{car.brand}</p></motion.div>}
                {car.model && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Model</p><p className="font-semibold text-gray-700">{car.model}</p></motion.div>}
                {car.generation && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Generation</p><p className="font-semibold text-gray-700">{car.generation}</p></motion.div>}
                {car.trim && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Trim</p><p className="font-semibold text-gray-700">{car.trim}</p></motion.div>}
                {car.year && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Year</p><p className="font-semibold text-gray-700">{car.year}</p></motion.div>}
                {car.condition && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Condition</p><p className="font-semibold text-gray-700">{car.condition}</p></motion.div>}
                {car.color && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Color</p><p className="font-semibold text-gray-700">{car.color}</p></motion.div>}
                {car.mileage && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Mileage</p><p className="font-semibold text-gray-700">{car.mileage}</p></motion.div>}
                {car.plate_no && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Plate No.</p><p className="font-semibold text-gray-700">{car.plate_no}</p></motion.div>}
                {car.engine && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Engine / Motor</p><p className="font-semibold text-gray-700">{car.engine}</p></motion.div>}
                {car.battery_capacity && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Battery Capacity</p><p className="font-semibold text-gray-700">{car.battery_capacity}</p></motion.div>}
                {car.range && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Range</p><p className="font-semibold text-gray-700">{car.range}</p></motion.div>}
                {car.drive_type && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Drive Type</p><p className="font-semibold text-gray-700">{car.drive_type}</p></motion.div>}
                {car.top_speed && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Top Speed</p><p className="font-semibold text-gray-700">{car.top_speed}</p></motion.div>}
                {car.fuel_consumption && <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="px-2 py-1 rounded-lg transition-colors cursor-pointer"><p className="text-gray-400">Fuel Consumption</p><p className="font-semibold text-gray-700">{car.fuel_consumption}</p></motion.div>}
                {car.dimensions && (
                  <motion.div whileHover={{ x: 5, backgroundColor: "rgba(99, 102, 241, 0.05)" }} className="col-span-2 px-2 py-1 rounded-lg transition-colors cursor-pointer">
                    <p className="text-gray-400">Dimensions (L/W/H/GC)</p>
                    <p className="font-semibold text-gray-700">{car.dimensions}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: Pricing + Order + Contact ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-max sticky top-20 space-y-4"
        >
          <div className="rounded-2xl border border-borderColor shadow-lg p-6 bg-white space-y-5">
            {/* Price */}
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Sale Price</p>
              {car.sale_price ? (
                <p className="text-3xl font-extrabold text-gray-900">
                  {car.sale_price.toLocaleString()}
                  <span className="text-base font-semibold text-gray-400 ml-1">ETB</span>
                </p>
              ) : (
                <p className="text-xl font-bold text-gray-500">Price on Request</p>
              )}
            </div>

            {/* Bank Finance */}
            {car.bank_price && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-blue-700">Bank Finance Price:</span>
                  <span className="text-lg font-bold text-blue-900">
                    {car.bank_price.toLocaleString()} ETB
                  </span>
                </div>
                {car.bank_info && (
                  <div className="text-xs text-blue-600 font-medium bg-blue-100/60 p-2 rounded-lg">
                    ℹ️ {car.bank_info}
                  </div>
                )}
              </div>
            )}

            <hr className="border-borderColor" />

            {/* Quick Info */}
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {car.condition && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Condition</span>
                  <span className="font-semibold">{car.condition}</span>
                </div>
              )}
              {car.mileage && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Mileage</span>
                  <span className="font-semibold">{car.mileage}</span>
                </div>
              )}
              {car.color && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Color</span>
                  <span className="font-semibold">{car.color}</span>
                </div>
              )}
              {car.fuel_type && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Fuel Type</span>
                  <span className="font-semibold">{car.fuel_type}</span>
                </div>
              )}
              {car.transmission && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Transmission</span>
                  <span className="font-semibold">{car.transmission}</span>
                </div>
              )}
              {car.location && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="font-semibold">{car.location}</span>
                </div>
              )}
            </div>

            <hr className="border-borderColor" />

            {/* ── Stripe Order Button ── */}
            <button
              onClick={handleStripePayment}
              disabled={isOrdering}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all py-3.5 font-bold text-white rounded-xl shadow-lg hover:shadow-indigo-200 hover:shadow-xl active:scale-95 cursor-pointer"
            >
              {isOrdering ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Redirecting…
                </>
              ) : (
                <>
                  {/* Stripe-style card icon */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  {token ? "Order via Stripe" : "Login to Order"}
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              Secure international payment via Stripe · Visa & Mastercard accepted
            </p>

            <hr className="border-borderColor" />

            {/* ── Contact Seller Icons ── */}
            <div>
              <motion.p
                className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 text-center"
                whileHover={{
                  scale: 1.1,
                  color: "#6366f1"
                }}
                transition={{ duration: 0.3 }}
              >
                Contact Seller
              </motion.p>
              <div className="flex items-center justify-center gap-4">
                {/* WhatsApp */}
                {phone && (
                  <motion.a
                    href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, -10, 0],
                      boxShadow: "0 10px 25px rgba(34, 197, 94, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-green-50 hover:bg-green-100 border border-green-200 text-green-600 transition-all shadow-sm"
                  >
                    {/* WhatsApp SVG */}
                    <motion.svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      whileHover={{
                        scale: 1.3
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </motion.svg>
                  </motion.a>
                )}

                {/* Telegram */}
                {phone && (
                  <motion.a
                    href={`https://t.me/${phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, 10, -10, 10, 0],
                      boxShadow: "0 10px 25px rgba(14, 165, 233, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-500 transition-all shadow-sm"
                  >
                    {/* Telegram SVG */}
                    <motion.svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      whileHover={{
                        scale: 1.3
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </motion.svg>
                  </motion.a>
                )}

                {/* Phone */}
                {phone && (
                  <motion.a
                    href={`tel:${phone}`}
                    title="Call Seller"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -15, 15, -15, 0],
                      boxShadow: "0 10px 25px rgba(99, 102, 241, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 transition-all shadow-sm"
                  >
                    <motion.svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      whileHover={{
                        scale: 1.3
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </motion.svg>
                  </motion.a>
                )}

                {/* Email */}
                {ownerEmail && (
                  <motion.a
                    href={`mailto:${ownerEmail}`}
                    title="Email Seller"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, 10, -10, 10, 0],
                      boxShadow: "0 10px 25px rgba(244, 63, 94, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-500 transition-all shadow-sm"
                  >
                    <motion.svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      whileHover={{
                        scale: 1.3
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </motion.svg>
                  </motion.a>
                )}

                {/* Fallback if no contact info */}
                {!phone && !ownerEmail && (
                  <p className="text-xs text-gray-400 text-center">No contact info provided</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
