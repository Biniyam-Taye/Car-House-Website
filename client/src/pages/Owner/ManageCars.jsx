import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageCars = () => {
  const { isOwner, axios, currency, fetchCars: fetchGlobalCars } = useAppContext();

  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [editSubImages, setEditSubImages] = useState([]);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
        if (fetchGlobalCars) fetchGlobalCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this car?"
      );
      if (!confirm) return null;
      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
        if (fetchGlobalCars) fetchGlobalCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEditModal = (car) => {
    setEditingCar(car);
    setEditForm({
      brand: car.brand || "",
      model: car.model || "",
      year: car.year || "",
      pricePerDay: car.pricePerDay || "",
      category: car.category || "",
      transmission: car.transmission || "",
      fuel_type: car.fuel_type || "",
      seating_capacity: car.seating_capacity || "",
      location: car.location || "",
      description: car.description || "",
      generation: car.generation || "",
      trim: car.trim || "",
      engine: car.engine || "",
      battery_capacity: car.battery_capacity || "",
      drive_type: car.drive_type || "",
      top_speed: car.top_speed || "",
      fuel_consumption: car.fuel_consumption || "",
      range: car.range || "",
      dimensions: car.dimensions || "",
      color: car.color || "",
      plate_no: car.plate_no || "",
      mileage: car.mileage || "",
      condition: car.condition || "",
      featuresInput: car.features ? car.features.join(", ") : "",
      cash_price: car.cash_price || "",
      bank_price: car.bank_price || "",
      bank_info: car.bank_info || "",
      sale_price: car.sale_price || "",
      contact_phone: car.contact_phone || "",
      listing_title: car.listing_title || "",
      option_level: car.option_level || "",
      document_status: car.document_status || "",
      accessories: car.accessories || "",
      commission: car.commission || "",
      price_type: car.price_type || "",
    });
    setEditImage(null);
    setEditSubImages([]);
    // Trigger animation
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingCar(null);
      setEditForm({});
      setEditImage(null);
      setEditSubImages([]);
    }, 300);
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();
    if (isEditLoading) return;

    setIsEditLoading(true);
    try {
      const featuresArray = editForm.featuresInput
        ? editForm.featuresInput
            .split(/[\n,]+/)
            .map((f) => f.trim())
            .filter((f) => f.length > 0)
        : [];

      const carData = {
        ...editForm,
        features: featuresArray,
        year: Number(editForm.year) || 0,
        pricePerDay: Number(editForm.pricePerDay) || 0,
        seating_capacity: Number(editForm.seating_capacity) || 0,
        cash_price: editForm.cash_price ? Number(editForm.cash_price) : undefined,
        bank_price: editForm.bank_price ? Number(editForm.bank_price) : undefined,
        sale_price: editForm.sale_price ? Number(editForm.sale_price) : undefined,
      };

      delete carData.featuresInput;

      // Clean empty string fields
      Object.keys(carData).forEach((key) => {
        if (carData[key] === "") {
          delete carData[key];
        }
      });

      const formData = new FormData();
      formData.append("carId", editingCar._id);
      if (editImage) {
        formData.append("image", editImage);
      }
      editSubImages.forEach((file) => {
        formData.append("subImages", file);
      });
      formData.append("carData", JSON.stringify(carData));

      const { data } = await axios.post("/api/owner/edit-car", formData);

      if (data.success) {
        toast.success(data.message);
        closeEditModal();
        fetchOwnerCars();
        if (fetchGlobalCars) fetchGlobalCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsEditLoading(false);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their
      details, or remove them from the sales platform "
      />
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt=""
                    className="h-12 w-12 aspect-square
              rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand}
                      {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} ● {car.transmission}
                    </p>
                  </div>
                </td>
                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3 ">
                  {currency}
                  {car.pricePerDay}/day
                </td>
                <td className="p-3 max-md:hidden">
                  <span
                    className={`p-3 py-1 rounded-full text-xs ${car.isAvaliable
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                      }`}
                  >
                    {car.isAvaliable ? "Availiable" : "Unavailiable"}
                  </span>
                </td>

                <td className="flex items-center gap-1 p-3">
                  <button
                    onClick={() => openEditModal(car)}
                    className="p-1.5 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Edit car"
                  >
                    <img
                      src={assets.edit_icon}
                      alt="Edit"
                      className="w-5 h-5"
                    />
                  </button>
                  <img
                    onClick={() => toggleAvailability(car._id)}
                    src={
                      car.isAvaliable ? assets.eye_close_icon : assets.eye_icon
                    }
                    className="cursor-pointer"
                  />
                  <img
                    onClick={() => deleteCar(car._id)}
                    src={assets.delete_icon}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal Overlay */}
      {editingCar && (
        <div
          className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
            isModalOpen ? "bg-black/40" : "bg-transparent pointer-events-none"
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEditModal();
          }}
        >
          {/* Slide-in Panel */}
          <div
            className={`bg-white w-full max-w-2xl h-full overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out ${
              isModalOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-borderColor">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <img src={assets.edit_icon} alt="" className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Edit Car</h2>
                  <p className="text-xs text-gray-400">
                    {editingCar.brand} {editingCar.model}
                  </p>
                </div>
              </div>
              <button
                onClick={closeEditModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={onEditSubmit} className="flex flex-col gap-5 p-6 text-gray-500 text-sm">
              {/* Current Image & Upload New */}
              <div className="flex flex-col gap-3 p-4 border border-borderColor rounded-lg bg-gray-50/50">
                <h3 className="font-semibold text-gray-700 text-sm">Car Image</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={editImage ? URL.createObjectURL(editImage) : editingCar.image}
                    alt=""
                    className="h-20 w-20 object-cover rounded-lg border border-borderColor"
                  />
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="edit-car-image"
                      className="px-3 py-1.5 border border-borderColor rounded-md cursor-pointer hover:bg-white transition-colors text-xs font-medium text-gray-600 w-max"
                    >
                      Change Image
                      <input
                        type="file"
                        id="edit-car-image"
                        accept="image/*"
                        hidden
                        onChange={(e) => setEditImage(e.target.files[0])}
                      />
                    </label>
                    <p className="text-xs text-gray-400">Leave empty to keep current image</p>
                  </div>
                </div>
              </div>

              {/* Basic Details */}
              <div className="flex flex-col gap-3 p-4 border border-borderColor rounded-lg bg-gray-50/50">
                <h3 className="font-semibold text-gray-700 text-sm">Basic Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Listing Title</label>
                    <input
                      type="text"
                      placeholder="e.g. 💥 BYD Leopard 💡 max 💥"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.listing_title}
                      onChange={(e) => setEditForm({ ...editForm, listing_title: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Option Level</label>
                    <input
                      type="text"
                      placeholder="e.g. Full Option"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.option_level}
                      onChange={(e) => setEditForm({ ...editForm, option_level: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Brand / Make</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.brand}
                      onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Model</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.model}
                      onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Year</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.year}
                      onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Category</label>
                    <select
                      className="px-3 py-2 border border-borderColor rounded-md outline-none bg-white focus:border-primary transition-all text-sm"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    >
                      <option value="">Select</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="VAN">VAN</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Pickup">Pickup</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Generation</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.generation}
                      onChange={(e) => setEditForm({ ...editForm, generation: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Trim</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.trim}
                      onChange={(e) => setEditForm({ ...editForm, trim: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Condition</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.condition}
                      onChange={(e) => setEditForm({ ...editForm, condition: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Color</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.color}
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Mileage</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.mileage}
                      onChange={(e) => setEditForm({ ...editForm, mileage: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Plate No.</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.plate_no}
                      onChange={(e) => setEditForm({ ...editForm, plate_no: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Location</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Seating Capacity</label>
                    <input
                      type="number"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.seating_capacity}
                      onChange={(e) => setEditForm({ ...editForm, seating_capacity: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="flex flex-col gap-3 p-4 border border-borderColor rounded-lg bg-gray-50/50">
                <h3 className="font-semibold text-gray-700 text-sm">Technical Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Transmission</label>
                    <select
                      className="px-3 py-2 border border-borderColor rounded-md outline-none bg-white focus:border-primary transition-all text-sm"
                      value={editForm.transmission}
                      onChange={(e) => setEditForm({ ...editForm, transmission: e.target.value })}
                    >
                      <option value="">Select</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="Semi-Automatic">Semi-Automatic</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Fuel Type</label>
                    <select
                      className="px-3 py-2 border border-borderColor rounded-md outline-none bg-white focus:border-primary transition-all text-sm"
                      value={editForm.fuel_type}
                      onChange={(e) => setEditForm({ ...editForm, fuel_type: e.target.value })}
                    >
                      <option value="">Select</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Electric">Electric</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Gas">Gas</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Engine</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.engine}
                      onChange={(e) => setEditForm({ ...editForm, engine: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Battery Capacity</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.battery_capacity}
                      onChange={(e) => setEditForm({ ...editForm, battery_capacity: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Range</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.range}
                      onChange={(e) => setEditForm({ ...editForm, range: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Drive Type</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.drive_type}
                      onChange={(e) => setEditForm({ ...editForm, drive_type: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Top Speed</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.top_speed}
                      onChange={(e) => setEditForm({ ...editForm, top_speed: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Fuel Consumption</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.fuel_consumption}
                      onChange={(e) => setEditForm({ ...editForm, fuel_consumption: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Dimensions</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.dimensions}
                      onChange={(e) => setEditForm({ ...editForm, dimensions: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Financing */}
              <div className="flex flex-col gap-3 p-4 border border-borderColor rounded-lg bg-gray-50/50">
                <h3 className="font-semibold text-gray-700 text-sm">Pricing & Financing</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Daily Price ({currency})</label>
                    <input
                      type="number"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.pricePerDay}
                      onChange={(e) => setEditForm({ ...editForm, pricePerDay: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Sale Price (Birr)</label>
                    <input
                      type="number"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.sale_price}
                      onChange={(e) => setEditForm({ ...editForm, sale_price: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Bank Price (Birr)</label>
                    <input
                      type="number"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.bank_price}
                      onChange={(e) => setEditForm({ ...editForm, bank_price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Bank Info</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.bank_info}
                      onChange={(e) => setEditForm({ ...editForm, bank_info: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Price Type</label>
                    <select
                      className="px-3 py-2 border border-borderColor rounded-md outline-none bg-white focus:border-primary transition-all text-sm"
                      value={editForm.price_type}
                      onChange={(e) => setEditForm({ ...editForm, price_type: e.target.value })}
                    >
                      <option value="">Select Price Type</option>
                      <option value="Fixed">Fixed</option>
                      <option value="Negotiable">Negotiable</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                    value={editForm.contact_phone}
                    onChange={(e) => setEditForm({ ...editForm, contact_phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Description & Features */}
              <div className="flex flex-col gap-3 p-4 border border-borderColor rounded-lg bg-gray-50/50">
                <h3 className="font-semibold text-gray-700 text-sm">Description & Features</h3>
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">Features (comma or newline separated)</label>
                  <textarea
                    rows={4}
                    className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                    value={editForm.featuresInput}
                    onChange={(e) => setEditForm({ ...editForm, featuresInput: e.target.value })}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="flex flex-col gap-3 p-4 border border-borderColor rounded-lg bg-gray-50/50">
                <h3 className="font-semibold text-gray-700 text-sm">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Document Status</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.document_status}
                      onChange={(e) => setEditForm({ ...editForm, document_status: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Accessories</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.accessories}
                      onChange={(e) => setEditForm({ ...editForm, accessories: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1">Commission</label>
                    <input
                      type="text"
                      className="px-3 py-2 border border-borderColor rounded-md outline-none focus:border-primary transition-all text-sm"
                      value={editForm.commission}
                      onChange={(e) => setEditForm({ ...editForm, commission: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Sub Images */}
              <div className="flex flex-col gap-3 p-4 border border-borderColor rounded-lg bg-gray-50/50">
                <h3 className="font-semibold text-gray-700 text-sm">Detail View Images</h3>

                {/* Existing sub-images */}
                {editingCar.subImages && editingCar.subImages.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Current images (upload new to replace all)</p>
                    <div className="grid grid-cols-6 gap-2">
                      {editingCar.subImages.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`sub-${idx}`}
                          className="w-full aspect-square object-cover rounded-md border border-borderColor"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="edit-sub-images"
                    className="flex items-center gap-2 px-3 py-1.5 border border-borderColor rounded-md cursor-pointer hover:bg-white transition-colors text-xs font-medium text-gray-600"
                  >
                    <img src={assets.upload_icon} className="h-4 w-4" alt="" />
                    Upload New Views
                    <input
                      type="file"
                      id="edit-sub-images"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={(e) => {
                        const filesArray = Array.from(e.target.files);
                        setEditSubImages((prev) => [...prev, ...filesArray]);
                      }}
                    />
                  </label>
                </div>

                {editSubImages.length > 0 && (
                  <div className="grid grid-cols-6 gap-2">
                    {editSubImages.map((file, idx) => (
                      <div key={idx} className="relative group aspect-square">
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="w-full h-full object-cover rounded-md border border-borderColor"
                        />
                        <button
                          type="button"
                          onClick={() => setEditSubImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow hover:bg-red-600 transition-colors cursor-pointer"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 sticky bottom-0 bg-white py-4 border-t border-borderColor -mx-6 px-6">
                <button
                  type="submit"
                  disabled={isEditLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-md font-medium cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <img src={assets.tick_icon} alt="" className="w-4 h-4" />
                  {isEditLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-5 py-2.5 border border-borderColor text-gray-600 rounded-md font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
