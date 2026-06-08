import React, { useEffect, useState, useMemo } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const Cars = () => {
  //getting search params from url
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();
  const [input, setInput] = useState(searchParams.get("search") || "");
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const query = searchParams.get("search");
    if (query !== null) {
      setInput(query);
    }
  }, [searchParams]);
  
  // New modern filter states
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Relevant");

  // Derive unique categories dynamically but add defaults so UI looks rich
  const categories = useMemo(() => {
    const dynamicCategories = cars.map(c => c.category).filter(Boolean);
    const defaultCategories = ["SUV", "Sedan", "Electric", "Luxury", "Coupe", "Sports"];
    return ["All", ...new Set([...dynamicCategories, ...defaultCategories])];
  }, [cars]);

  const applyFilter = async () => {
    let filtered = cars.slice();

    // 1. Text Search Filter (Model, Brand, Features)
    if (input !== "") {
      filtered = filtered.filter((car) => {
        const query = input.toLowerCase();
        return (
          (car.brand || "").toLowerCase().includes(query) ||
          (car.model || "").toLowerCase().includes(query) ||
          (car.category || "").toLowerCase().includes(query) ||
          (car.transmission || "").toLowerCase().includes(query)
        );
      });
    }

    // 2. Category Filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((car) => car.category === categoryFilter);
    }

    // 3. Sorting
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => {
        const priceA = (a.sale_price || a.cash_price || a.pricePerDay || 0);
        const priceB = (b.sale_price || b.cash_price || b.pricePerDay || 0);
        return priceA - priceB;
      });
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => {
        const priceA = (a.sale_price || a.cash_price || a.pricePerDay || 0);
        const priceB = (b.sale_price || b.cash_price || b.pricePerDay || 0);
        return priceB - priceA;
      });
    }

    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    const { data } = await axios.post("/api/booking/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });
    if (data.success) {
      setFilteredCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast("No cars availiable");
      }
      return null;
    }
  };

  useEffect(() => {
    isSearchData && searchCarAvailability();
  }, []);

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) {
      applyFilter();
    }
  }, [input, categoryFilter, sortOption, cars]);

  return (
    <div>
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center py-20 bg-gray-50 max-md:px-4 border-b border-gray-100"
      >
        <Title
          title="Premium Vehicles"
          subTitle="Find your perfect car. Search by make, model, or browse our exclusive collection."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex items-center bg-white px-5 mt-8 max-w-2xl w-full h-14 
        rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100"
        >
          <img src={assets.search_icon} alt="search" className="w-5 h-5 mr-3 opacity-50" />

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search 'BYD', 'SUV', or 'Electric'..."
            className="w-full h-full outline-none text-gray-700 font-medium placeholder-gray-400"
          />
          <div 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 ml-2 rounded-full cursor-pointer transition-colors flex items-center justify-center ${showFilters ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
          >
            <img src={assets.filter_icon} alt="filter" className={`w-5 h-5 transition-transform duration-300 ${showFilters ? 'rotate-180 opacity-100' : 'opacity-60'}`} />
          </div>
        </motion.div>

        {/* EXPANDABLE MODERN FILTERS */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="w-full max-w-2xl overflow-hidden"
            >
              <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Category Filter */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${categoryFilter === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-200'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By Filter */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sort By Price</label>
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-gray-50 border border-gray-100 outline-none text-gray-700 text-sm font-semibold rounded-2xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors w-full"
                  >
                    <option>Relevant</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CARS GRID SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 bg-white min-h-[50vh]"
      >
        <div className="flex justify-between items-center xl:px-20 max-w-7xl mx-auto mb-8">
          <p className="text-gray-500 font-medium">
            Showing <span className="font-bold text-gray-900">{filteredCars.length}</span> Vehicles
          </p>
          {categoryFilter !== "All" && (
            <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm border border-blue-100">
              {categoryFilter}
            </span>
          )}
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:px-20 max-w-7xl mx-auto">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No vehicles found</h3>
            <p className="text-gray-500 max-w-md">Try adjusting your search criteria or removing filters to find what you're looking for.</p>
            <button 
              onClick={() => { setInput(""); setCategoryFilter("All"); setSortOption("Relevant"); }}
              className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
            >
              Clear all filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cars;
