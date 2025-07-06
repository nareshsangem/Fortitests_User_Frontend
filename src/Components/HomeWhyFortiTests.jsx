import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaChartLine, FaMobileAlt } from "react-icons/fa";

const benefits = [
  {
    icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
    title: "Govt Exam Focused",
    description: "Tailored tests for SSC, UPSC, Banking, Railways & more.",
  },
  {
    icon: <FaClock className="text-green-600 text-3xl" />,
    title: "Real Exam Experience",
    description: "Timed tests, negative marking, and instant result analysis.",
  },
  {
    icon: <FaChartLine className="text-purple-600 text-3xl" />,
    title: "Smart Analytics",
    description: "Track your subject-wise performance & improve consistently.",
  },
  {
    icon: <FaMobileAlt className="text-pink-600 text-3xl" />,
    title: "Practice Anywhere",
    description: "Fully mobile-optimized and supports low-network use cases.",
  },
];

export default function WhyFortiTests() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why FortiTests?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover what makes FortiTests the preferred platform for government job aspirants.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {benefits.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
