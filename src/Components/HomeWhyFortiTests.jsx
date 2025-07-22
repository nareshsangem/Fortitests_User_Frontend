import React from "react";
import { motion } from "framer-motion";
import {
  FaLockOpen,
  FaClock,
  FaChartBar,
  FaMobileAlt,
  FaFilePdf,
  FaBookOpen,
  FaTasks,
  FaGlobeAsia,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaLockOpen className="text-green-600 text-3xl" />,
    title: "100% Free Forever",
    description: "No subscriptions or hidden charges. All tests are completely free for all users.",
  },
  {
    icon: <FaClock className="text-blue-600 text-3xl" />,
    title: "Real Exam Interface",
    description: "Practice with a timer, question palette, and review marking just like the real exam.",
  },
  {
    icon: <FaChartBar className="text-purple-600 text-3xl" />,
    title: "Instant Results & Analysis",
    description: "Get your score and subject-wise performance instantly with insightful charts.",
  },
  {
    icon: <FaFilePdf className="text-red-500 text-3xl" />,
    title: "Download PDF Reports",
    description: "Save your entire test attempt as a PDF with answers and explanations — great for revision.",
  },
  {
    icon: <FaBookOpen className="text-yellow-600 text-3xl" />,
    title: "All Govt Exam Categories",
    description: "Covers SSC, RRB, Banking, TSPSC, Railways, Police, and more — all neatly categorized.",
  },
  {
    icon: <FaTasks className="text-indigo-600 text-3xl" />,
    title: "Multiple Test Types",
    description: "Choose from Previous Papers, Full Mock Tests, and Subject-Wise Tests based on your need.",
  },
  {
    icon: <FaMobileAlt className="text-pink-600 text-3xl" />,
    title: "Use on Any Device",
    description: "Fully responsive interface that works great on mobile, tablet, and desktop devices.",
  },
  {
    icon: <FaGlobeAsia className="text-teal-600 text-3xl" />,
    title: "Practice Anytime, Anywhere",
    description: "No login barriers. Begin your preparation instantly from anywhere.",
  },
];

export default function WhyFortiTests() {
  return (
    <section className="bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why This AWM?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover what makes this platform to preferred for government job aspirants.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {benefits.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 rounded-2xl shadow-md p-6 border-t-4 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
