import React from "react";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaFilePdf,
  FaBookOpen,
  FaRedo,
  FaMobileAlt,
  FaClock,
  FaLockOpen,
  FaTasks,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChartBar className="text-blue-600 text-3xl" />,
    title: "Subject-wise Analysis",
    desc: "Detailed score report by subjects to help improve focus.",
  },
  {
    icon: <FaFilePdf className="text-red-500 text-3xl" />,
    title: "Instant PDF Report",
    desc: "Download printable reports with correct/wrong answers.",
  },
  {
    icon: <FaBookOpen className="text-yellow-600 text-3xl" />,
    title: "Previous Year Papers",
    desc: "Practice actual past exams for better preparation.",
  },
  {
    icon: <FaRedo className="text-indigo-600 text-3xl" />,
    title: "Unlimited Attempts",
    desc: "Practice as many times as you like — no limits.",
  },
  {
    icon: <FaMobileAlt className="text-pink-600 text-3xl" />,
    title: "Responsive on All Devices",
    desc: "Take tests from mobile, tablet, or desktop smoothly.",
  },
  {
    icon: <FaClock className="text-green-600 text-3xl" />,
    title: "Test with Timer & Navigation",
    desc: "Real test interface with timer, question navigation, and review.",
  },
  {
    icon: <FaChartBar className="text-purple-600 text-3xl" />,
    title: "Visual Performance Chart",
    desc: "Track your performance with colorful charts.",
  },
  {
    icon: <FaLockOpen className="text-teal-600 text-3xl" />,
    title: "Completely Free ",
    desc: "Sign up and Login - Just start practice!",
  },
];

const LandingpageWhyUs = () => {
  return (
    <section id='why-us' className="bg-gradient-to-br from-indigo-100 via-blue-200 to-purple-100 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Why AWM?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover why thousands of learners choose us for government exam preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{item.title}</h3>
            <p className="text-sm text-gray-600 text-center">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LandingpageWhyUs;
