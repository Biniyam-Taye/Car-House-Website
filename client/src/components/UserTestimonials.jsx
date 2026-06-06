import React from "react";
import { motion } from "motion/react";

const UserTestimonials = () => {
  const testimonials = [
    {
      name: "Alon Walker",
      tagline: "Elite Member",
      text: "Lorem ipsum dolour sit a met, connecter adipescent elite Seed effector nil era, a Commode EU lorem. Lorem ipsum dolour sit a met, connecter adipescent elite Seed effector nil era.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
      // Color configurations: Base background, hover gradient end, shadow glow color
      bgColor: "bg-[#00a8ff]",
      hoverBg: "hover:from-[#00a8ff] hover:to-[#00e1ff]",
      shadowColor: "hover:shadow-[0_20px_40px_rgba(0,168,255,0.4)]",
      textColor: "text-white",
      borderColor: "group-hover:border-[#00a8ff]",
    },
    {
      name: "Jhon Smith",
      tagline: "Frequent Buyer",
      text: "Lorem ipsum dolour sit a met, connecter adipescent elite Seed effector nil era, a Commode EU lorem. Lorem ipsum dolour sit a met, connecter adipescent elite Seed effector nil era.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
      bgColor: "bg-[#1b6cfc]",
      hoverBg: "hover:from-[#1b6cfc] hover:to-[#5c42ff]",
      shadowColor: "hover:shadow-[0_20px_40px_rgba(27,108,252,0.4)]",
      textColor: "text-white",
      borderColor: "group-hover:border-[#1b6cfc]",
    },
    {
      name: "Tom Smith",
      tagline: "Verified Customer",
      text: "Lorem ipsum dolour sit a met, connecter adipescent elite Seed effector nil era, a Commode EU lorem. Lorem ipsum dolour sit a met, connecter adipescent elite Seed effector nil era.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150",
      bgColor: "bg-[#7ca2ff]",
      hoverBg: "hover:from-[#7ca2ff] hover:to-[#a78bfa]",
      shadowColor: "hover:shadow-[0_20px_40px_rgba(124,162,255,0.4)]",
      textColor: "text-white",
      borderColor: "group-hover:border-[#7ca2ff]",
    },
  ];

  return (
    <div className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto bg-gray-50/50">
      {/* Title block matching the reference (User in black, Testimonials in blue) */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          User{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h2>
        <p className="mt-4 text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Lorem ipsum dolour sit a met, connecter adipescent elite Seed effector nil era, a Commode EU lorem. Lorem ipsum dolour sit a met, connecter adipescent elite Seed effector nil era, a commode EU lorem.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-10">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            className="group flex flex-col items-start cursor-default"
          >
            {/* The Speech Bubble container */}
            <div
              className={`relative w-full rounded-3xl p-8 transition-all duration-500 ease-out bg-gradient-to-tr from-transparent to-transparent ${t.bgColor} ${t.hoverBg} ${t.shadowColor} group-hover:-translate-y-2.5`}
            >
              {/* Double Quote Open badge - Top Left */}
              <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-500 shadow-md border border-gray-150 transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
                <span className="font-serif text-2xl font-bold leading-none mt-1">“</span>
              </div>

              {/* Speech bubble text */}
              <p className={`text-[15px] font-medium leading-relaxed ${t.textColor}`}>
                {t.text}
              </p>

              {/* Double Quote Close badge - Bottom Right */}
              <div className="absolute -bottom-5 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-500 shadow-md border border-gray-150 transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
                <span className="font-serif text-2xl font-bold leading-none mt-1">”</span>
              </div>

              {/* Speech bubble tail aligned with the avatar */}
              <div className="absolute left-14 -bottom-2.5 h-5 w-5 rotate-45 bg-inherit transition-transform duration-500 group-hover:scale-105" />
            </div>

            {/* Profile Avatar and Info */}
            <div className="mt-8 flex items-center gap-4 pl-4">
              <img
                src={t.avatar}
                alt={t.name}
                className={`h-16 w-16 rounded-full object-cover border-4 border-white shadow-md transition-all duration-300 ${t.borderColor} group-hover:scale-105`}
              />
              <div>
                <h4 className="text-lg font-black text-gray-900 leading-tight transition-colors duration-300 group-hover:text-blue-600">
                  {t.name}
                </h4>
                <p className="text-sm font-medium text-gray-400 mt-0.5">
                  {t.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserTestimonials;
