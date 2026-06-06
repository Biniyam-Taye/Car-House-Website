import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const CarDetails = () => {
  const { id } = useParams();
  const { cars } = useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const foundCar = cars.find((car) => car._id === id);
    setCar(foundCar);
    if (foundCar) {
      setActiveImage(foundCar.image);
    }
  }, [cars, id]);

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 pb-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: car image and details */}
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
            transition={{ duration: 0.5, delay: 0.3 }}
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

            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
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

            {/* Description */}
            <div>
              <h2 className="text-xl font-medium mb-3">Description</h2>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div>
                <h2 className="text-xl font-medium mb-3">Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {car.features.map((item) => (
                    <li key={item} className="flex items-center text-gray-500">
                      <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Sheet */}
            <div className="border border-borderColor rounded-xl p-5 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-sm">
                <div>
                  <p className="text-gray-400">Brand</p>
                  <p className="font-semibold text-gray-700">{car.brand}</p>
                </div>
                <div>
                  <p className="text-gray-400">Model</p>
                  <p className="font-semibold text-gray-700">{car.model}</p>
                </div>
                {car.generation && (
                  <div>
                    <p className="text-gray-400">Generation</p>
                    <p className="font-semibold text-gray-700">{car.generation}</p>
                  </div>
                )}
                {car.trim && (
                  <div>
                    <p className="text-gray-400">Trim</p>
                    <p className="font-semibold text-gray-700">{car.trim}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400">Year</p>
                  <p className="font-semibold text-gray-700">{car.year}</p>
                </div>
                {car.condition && (
                  <div>
                    <p className="text-gray-400">Condition</p>
                    <p className="font-semibold text-gray-700">{car.condition}</p>
                  </div>
                )}
                {car.color && (
                  <div>
                    <p className="text-gray-400">Color</p>
                    <p className="font-semibold text-gray-700">{car.color}</p>
                  </div>
                )}
                {car.mileage && (
                  <div>
                    <p className="text-gray-400">Mileage</p>
                    <p className="font-semibold text-gray-700">{car.mileage}</p>
                  </div>
                )}
                {car.plate_no && (
                  <div>
                    <p className="text-gray-400">Plate No.</p>
                    <p className="font-semibold text-gray-700">{car.plate_no}</p>
                  </div>
                )}
                {car.engine && (
                  <div>
                    <p className="text-gray-400">Engine / Motor</p>
                    <p className="font-semibold text-gray-700">{car.engine}</p>
                  </div>
                )}
                {car.battery_capacity && (
                  <div>
                    <p className="text-gray-400">Battery Capacity</p>
                    <p className="font-semibold text-gray-700">{car.battery_capacity}</p>
                  </div>
                )}
                {car.range && (
                  <div>
                    <p className="text-gray-400">Range</p>
                    <p className="font-semibold text-gray-700">{car.range}</p>
                  </div>
                )}
                {car.drive_type && (
                  <div>
                    <p className="text-gray-400">Drive Type</p>
                    <p className="font-semibold text-gray-700">{car.drive_type}</p>
                  </div>
                )}
                {car.top_speed && (
                  <div>
                    <p className="text-gray-400">Top Speed</p>
                    <p className="font-semibold text-gray-700">{car.top_speed}</p>
                  </div>
                )}
                {car.fuel_consumption && (
                  <div>
                    <p className="text-gray-400">Fuel Consumption</p>
                    <p className="font-semibold text-gray-700">{car.fuel_consumption}</p>
                  </div>
                )}
                {car.dimensions && (
                  <div className="col-span-2">
                    <p className="text-gray-400">Dimensions (L/W/H/GC)</p>
                    <p className="font-semibold text-gray-700">{car.dimensions}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Pricing & Contact Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-max sticky top-20 space-y-4"
        >
          {/* Price Card */}
          <div className="rounded-2xl border border-borderColor shadow-lg p-6 bg-white space-y-4">
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

            {/* Contact Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+251972655885"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all py-3 font-semibold text-white rounded-xl cursor-pointer shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Seller
              </a>
              <a
                href="https://wa.me/251972655885"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition-all py-3 font-semibold text-white rounded-xl cursor-pointer shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            <p className="text-center text-xs text-gray-400">Contact seller directly to inquire or make an offer</p>
          </div>
        </motion.div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;

