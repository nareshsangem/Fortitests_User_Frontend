// import React from 'react';
// import {
//   FaLaptopCode,
//   FaChartLine,
//   FaBookOpen,
//   FaBrain,
//   FaLanguage,
//   FaCheckCircle,
// } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// const services = [
//   {
//     icon: <FaCheckCircle size={28} className="text-green-600" />,
//     title: 'Completely Free with Ads',
//     description: (
//       <span>
//         <strong>Free access</strong> to all exams. Ads won’t disturb during exams.
//       </span>
//     ),
//     tag: 'Free',
//     tagColor: 'bg-green-600',
//   },
//   {
//     icon: <FaLaptopCode size={28} className="text-blue-600" />,
//     title: 'Mock Tests for Govt Exams',
//     description: 'Curated tests for UPSC, SSC, Banking, Railways & more.',
//   },
//   {
//     icon: <FaChartLine size={28} className="text-blue-600" />,
//     title: 'Instant Results',
//     description: 'Get subject-wise results with performance insights.',
//   },
//   {
//     icon: <FaBookOpen size={28} className="text-blue-600" />,
//     title: 'Smart Practice',
//     description: 'Track weak areas with intelligent recommendations.',
//   },
//   {
//     icon: <FaBrain size={28} className="text-blue-600" />,
//     title: 'Adaptive Difficulty',
//     description: 'Questions adjust based on your performance.',
//   },
//   {
//     icon: <FaLanguage size={28} className="text-blue-600" />,
//     title: 'Bilingual Support',
//     description: 'Practice in English or Hindi as per your comfort.',
//   },
// ];

// const plans = [
//   {
//     title: 'Monthly Plan',
//     price: '₹29',
//     duration: 'per month',
//   },
//   {
//     title: '6 Months Plan',
//     price: '₹99',
//     duration: 'for 6 months',
//   },
//   {
//     title: 'Yearly Plan',
//     price: '₹199',
//     duration: 'per year',
//   },
// ];

// function LandingServicesAndPricing() {
//   const handleUpgradeClick = () => {
//     toast.info('Please login to explore');
//   };

//   return (
//     <div className="bg-blue-50 py-16 px-4">
//       {/* Services */}
//       <div className="max-w-7xl mx-auto text-center mb-16">
//         <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Services</h2>
//         <p className="text-gray-600 mb-10">
//           Basic access is <span className="font-semibold text-green-700">free with ads</span>
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative"
//             >
//               {service.tag && (
//                 <span
//                   className={`absolute top-2 right-2 text-xs text-white px-2 py-1 rounded ${service.tagColor}`}
//                 >
//                   {service.tag}
//                 </span>
//               )}
//               <div className="mb-4 flex justify-center">{service.icon}</div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
//               <p className="text-gray-600 text-sm">{service.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Pricing */}
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-blue-800 mb-4">Upgrade Plans</h2>
//         <p className="text-gray-600 mb-10">Get an ad-free experience and exclusive features</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-xl shadow border border-blue-200 hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-bold text-blue-700 mb-2">{plan.title}</h3>
//               <p className="text-3xl font-bold text-gray-900">{plan.price}</p>
//               <p className="text-gray-600 mb-4 text-sm">{plan.duration}</p>
//               <button
//                 onClick={handleUpgradeClick}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
//               >
//                 Upgrade Now
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingServicesAndPricing;
