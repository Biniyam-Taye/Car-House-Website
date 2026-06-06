import React, { useState } from "react";
import Title from "../../components/Owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency, fetchCars } = useAppContext();

  const [image, setImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
    generation: "",
    trim: "",
    engine: "",
    battery_capacity: "",
    drive_type: "",
    top_speed: "",
    fuel_consumption: "",
    range: "",
    dimensions: "",
    color: "",
    plate_no: "",
    mileage: "",
    condition: "",
    featuresInput: "",
    cash_price: "",
    bank_price: "",
    bank_info: "",
    sale_price: "",
    contact_phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHundler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);
    try {
      const featuresArray = car.featuresInput
        ? car.featuresInput
            .split(/[\n,]+/)
            .map((f) => f.trim())
            .filter((f) => f.length > 0)
        : [];

      const carData = {
        ...car,
        features: featuresArray,
        year: Number(car.year) || 0,
        pricePerDay: Number(car.pricePerDay) || 0,
        seating_capacity: Number(car.seating_capacity) || 0,
        cash_price: car.cash_price ? Number(car.cash_price) : undefined,
        bank_price: car.bank_price ? Number(car.bank_price) : undefined,
        sale_price: car.sale_price ? Number(car.sale_price) : undefined,
      };

      delete carData.featuresInput;

      // Clean empty string fields
      Object.keys(carData).forEach((key) => {
        if (carData[key] === "") {
          delete carData[key];
        }
      });

      const formData = new FormData();
      formData.append("image", image);
      subImages.forEach((file) => {
        formData.append("subImages", file);
      });
      formData.append("carData", JSON.stringify(carData));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setSubImages([]);
        setCar({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: "",
          location: "",
          description: "",
          generation: "",
          trim: "",
          engine: "",
          battery_capacity: "",
          drive_type: "",
          top_speed: "",
          fuel_consumption: "",
          range: "",
          dimensions: "",
          color: "",
          plate_no: "",
          mileage: "",
          condition: "",
          featuresInput: "",
          cash_price: "",
          bank_price: "",
          bank_info: "",
          sale_price: "",
          contact_phone: "",
        });
        if (fetchCars) {
          fetchCars();
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add new car"
        subTitle="Fill in details to list a new car for booking or sale, including pricing, availability, and technical specifications."
      />
      <form
        onSubmit={onSubmitHundler}
        className="flex flex-col gap-6 text-gray-500 text-sm mt-6 max-w-4xl"
      >
        {/* Media Block */}
        <div className="flex flex-col gap-4 p-5 border border-borderColor rounded-lg bg-white/50">
          <h3 className="font-semibold text-gray-800 text-base border-b border-borderColor pb-2">Media</h3>
          
          {/* Main Card Image */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700">Main Card Image (Required)</p>
            <div className="flex items-center gap-4 w-full">
              <label htmlFor="car-image">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_icon}
                  alt=""
                  className="h-16 w-16 object-cover rounded cursor-pointer border border-dashed border-gray-300 p-1"
                />
                <input
                  type="file"
                  id="car-image"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}

                />
              </label>
              <p className="text-xs text-gray-400">This image will be used as the main display card image.</p>
            </div>
          </div>

          {/* Sub Images (Inside/Outside views) */}
          <div className="flex flex-col gap-2 border-t border-borderColor pt-4 mt-2">
            <p className="font-semibold text-gray-700">Detail Views (Inside, Outside, Side Views)</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <label htmlFor="sub-images" className="flex items-center gap-2 px-3 py-1.5 border border-borderColor rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <img src={assets.upload_icon} className="h-5 w-5" alt="" />
                  <span>Upload Views</span>
                  <input
                    type="file"
                    id="sub-images"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => {
                      const filesArray = Array.from(e.target.files);
                      setSubImages((prev) => [...prev, ...filesArray]);
                    }}
                  />
                </label>
                <p className="text-xs text-gray-400">Add multiple images of the vehicle's interior and exterior.</p>
              </div>

              {/* Preview Grid */}
              {subImages.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mt-2">
                  {subImages.map((file, idx) => (
                    <div key={idx} className="relative group aspect-square">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`sub-preview-${idx}`}
                        className="w-full h-full object-cover rounded-md border border-borderColor p-0.5"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSubImages((prev) => prev.filter((_, i) => i !== idx));
                        }}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow hover:bg-red-600 transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <svg xmlns="http://www.w3.org/2050/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Details Block */}
        <div className="flex flex-col gap-4 p-5 border border-borderColor rounded-lg bg-white/50">
          <h3 className="font-semibold text-gray-800 text-base border-b border-borderColor pb-2">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col w-full">
              <label>Brand / Make</label>
              <input
                type="text"
                placeholder="e.g. BYD, Nissan, Toyota"
          
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.brand}
                onChange={(e) => setCar({ ...car, brand: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Model</label>
              <input
                type="text"
                placeholder="e.g. Song Plus Smart, Patrol"
          
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.model}
                onChange={(e) => setCar({ ...car, model: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Year</label>
              <input
                type="text"
                placeholder="e.g. 2025/4 or 2018"
          
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.year}
                onChange={(e) => setCar({ ...car, year: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col w-full">
              <label>Generation</label>
              <input
                type="text"
                placeholder="e.g. 1st, 5th"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.generation}
                onChange={(e) => setCar({ ...car, generation: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Trim</label>
              <input
                type="text"
                placeholder="e.g. Champion Edition, Nismo"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.trim}
                onChange={(e) => setCar({ ...car, trim: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Category (Body Type)</label>
              <select
                onChange={(e) => setCar({ ...car, category: e.target.value })}
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none bg-white focus:border-primary transition-all"
                value={car.category}
                
              >
                <option value="">Select a category</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="VAN">VAN</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="Pickup">Pickup</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col w-full">
              <label>Condition</label>
              <input
                type="text"
                placeholder="e.g. Brand New, Excellent"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.condition}
                onChange={(e) => setCar({ ...car, condition: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Color</label>
              <input
                type="text"
                placeholder="e.g. Grey, Black"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.color}
                onChange={(e) => setCar({ ...car, color: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Mileage</label>
              <input
                type="text"
                placeholder="e.g. 00 Km, 50,000 km"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.mileage}
                onChange={(e) => setCar({ ...car, mileage: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Plate No.</label>
              <input
                type="text"
                placeholder="e.g. Brand New, Code 2"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.plate_no}
                onChange={(e) => setCar({ ...car, plate_no: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col w-full">
              <label>Location</label>
              <input
                type="text"
                placeholder="e.g. Addis Ababa, New York"
                
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.location}
                onChange={(e) => setCar({ ...car, location: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Seating Capacity</label>
              <input
                type="number"
                placeholder="e.g. 5"

                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.seating_capacity}
                onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Technical Specs Block */}
        <div className="flex flex-col gap-4 p-5 border border-borderColor rounded-lg bg-white/50">
          <h3 className="font-semibold text-gray-800 text-base border-b border-borderColor pb-2">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col w-full">
              <label>Transmission</label>
              <select
                onChange={(e) => setCar({ ...car, transmission: e.target.value })}
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none bg-white focus:border-primary transition-all"
                value={car.transmission}
                
              >
                <option value="">Select Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label>Fuel Type</label>
              <select
                onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
                value={car.fuel_type}
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none bg-white focus:border-primary transition-all"
                
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Gas">Gas</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label>Engine</label>
              <input
                type="text"
                placeholder="e.g. 160KW 218HP, V8"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.engine}
                onChange={(e) => setCar({ ...car, engine: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col w-full">
              <label>Battery Capacity</label>
              <input
                type="text"
                placeholder="e.g. 87KWh"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.battery_capacity}
                onChange={(e) => setCar({ ...car, battery_capacity: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Range</label>
              <input
                type="text"
                placeholder="e.g. 610 KMs"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.range}
                onChange={(e) => setCar({ ...car, range: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Drive Type</label>
              <input
                type="text"
                placeholder="e.g. Single Motor FWD, 4WD"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.drive_type}
                onChange={(e) => setCar({ ...car, drive_type: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col w-full">
              <label>Top Speed</label>
              <input
                type="text"
                placeholder="e.g. 175KM/H"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.top_speed}
                onChange={(e) => setCar({ ...car, top_speed: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Fuel Consumption</label>
              <input
                type="text"
                placeholder="e.g. 7KM/L"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.fuel_consumption}
                onChange={(e) => setCar({ ...car, fuel_consumption: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Dimensions (L/W/H/GC)</label>
              <input
                type="text"
                placeholder="e.g. 3780*1715*1540*155 mm"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.dimensions}
                onChange={(e) => setCar({ ...car, dimensions: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Pricing & Financing Block */}
        <div className="flex flex-col gap-4 p-5 border border-borderColor rounded-lg bg-white/50">
          <h3 className="font-semibold text-gray-800 text-base border-b border-borderColor pb-2">Pricing & Financing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col w-full">
              <label>Daily Price (Rental, {currency})</label>
              <input
                type="number"
                placeholder="e.g. 150"
                
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.pricePerDay}
                onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Sale Price (Cash Price, Birr)</label>
              <input
                type="number"
                placeholder="e.g. 4000000"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.sale_price}
                onChange={(e) => setCar({ ...car, sale_price: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Bank Price (Birr)</label>
              <input
                type="number"
                placeholder="e.g. 8000000"
                className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
                value={car.bank_price}
                onChange={(e) => setCar({ ...car, bank_price: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label>Bank Available & Interest Info</label>
            <input
              type="text"
              placeholder="e.g. 50/50 Bank Available 18% interest"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
              value={car.bank_info}
              onChange={(e) => setCar({ ...car, bank_info: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Contact Phone (WhatsApp / Telegram)</label>
            <input
              type="text"
              placeholder="e.g. +251972655885"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
              value={car.contact_phone}
              onChange={(e) => setCar({ ...car, contact_phone: e.target.value })}
            />
            <p className="text-xs text-gray-400 mt-1">This number will be shown as a WhatsApp, Telegram, and call icon on the car details page.</p>
          </div>
        </div>

        {/* Description & Features Block */}
        <div className="flex flex-col gap-4 p-5 border border-borderColor rounded-lg bg-white/50">
          <h3 className="font-semibold text-gray-800 text-base border-b border-borderColor pb-2">Description & Features</h3>
          <div className="flex flex-col w-full">
            <label>Description</label>
            <textarea
              rows={4}
              placeholder="eg. A luxury SUV with powerful engine..."
              
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
              value={car.description}
              onChange={(e) => setCar({ ...car, description: e.target.value })}
            ></textarea>
          </div>
          <div className="flex flex-col w-full">
            <label>Features List</label>
            <textarea
              rows={6}
              placeholder="Paste or write features here (comma or newline separated, e.g. 360 Camera, Cruise Control, Panoramic Roof)"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none focus:border-primary transition-all"
              value={car.featuresInput}
              onChange={(e) => setCar({ ...car, featuresInput: e.target.value })}
            ></textarea>
            <p className="text-xs text-gray-400 mt-1">Separate features with commas or newlines (e.g. Cruise Control, Panoramic Roof)</p>
          </div>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2.5 mt-2 bg-primary
        text-white rounded-md font-medium w-max cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          <img src={assets.tick_icon} alt="" />
          {isLoading ? "Listing..." : "List your car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
