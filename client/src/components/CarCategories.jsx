import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const CarCategories = () => {
  const categoriesList = [
    {
      tag: "Convertibles",
      title: "Experience the ultimate freedom of open-air luxury...",
      description: "From elegant weekend cruisers to high-performance roadsters, find your perfect premium escape.",
      image: "/images/luxury.jpg",
      link: "/cars?category=Luxury",
    },
    {
      tag: "Sports Cars",
      title: "Unleash raw power and track-inspired handling...",
      description: "Designed for enthusiasts who demand razor-sharp precision, rapid acceleration, and pure thrill.",
      image: "/images/sports.jpg",
      link: "/cars?category=Sports",
    },
    {
      tag: "Luxury SUVs",
      title: "Command the road with premium space and status...",
      description: "Full-sized luxury off-roaders offering sophisticated leather interiors, advanced safety, and all-terrain drive.",
      image: "/images/suv.jpg",
      link: "/cars?category=SUV",
    },
  ];

  return (
    <div className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
      {/* Header aligned like the design reference (Blog on left, description on right) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-12 mb-16">
        <div className="max-w-xs">
          <h2 className="text-5xl font-black text-gray-900 tracking-tight">
            Categories
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
            Discover our carefully curated fleet classes, engineered for extreme comfort, peak prestige, and memorable performance on any road journey.
          </p>
        </div>
      </div>

      {/* Grid of Categories cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {categoriesList.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            className="group cursor-pointer flex flex-col"
          >
            {/* Image Container with high roundness */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100/50">
              {/* Cover Image with zoom-on-hover effect */}
              <img
                src={cat.image}
                alt={cat.tag}
                onError={(e) => {
                  // Fallback to placeholder if user hasn't added the image yet
                  e.target.src = `https://images.unsplash.com/photo-${
                    index === 0
                      ? "1503376780353-7e6692767b70" // Porsche Convertible
                      : index === 1
                      ? "1617814076367-b759c7d7e738" // Sports Car
                      : "1533473359331-0135ef1b58bf" // SUV
                  }?auto=format&fit=crop&q=80&w=800`;
                }}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Sub-overlay layer for subtle depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Top-Right White Circle Arrow Button */}
              <Link
                to={cat.link}
                className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-lg group-hover:bg-blue-600 group-hover:text-white"
              >
                <svg
                  className="h-5 w-5 text-gray-800 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              {/* Floating Bottom-Left Peach Badge Pill */}
              <div className="absolute bottom-5 left-5 rounded-2xl bg-[#edd6c0]/95 backdrop-blur-sm px-4 py-2 text-xs font-bold text-[#543b27] shadow-sm select-none">
                {cat.tag}
              </div>
            </div>

            {/* Description Text Below Card */}
            <div className="mt-6 px-1">
              <Link to={cat.link}>
                <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors duration-300">
                  {cat.title}
                </h3>
              </Link>
              <p className="mt-2.5 text-sm text-gray-500 font-normal leading-relaxed">
                {cat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CarCategories;
