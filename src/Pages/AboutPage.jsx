import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaBookOpen, FaUsers, FaRocket } from 'react-icons/fa';
import HomeNavbar from '../Components/HomeNavbar';
import HomeFooter from '../Components/HomeFooter';
function AboutUsPage() {
  return (
    <div>
      <HomeNavbar />

      <div className=" text-gray-800">
        {/* Hero Section */}
        <div className="bg-blue-200 text-blue-900 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-2"
          >
            About AWM - ACE With Mock
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg"
          >
            Empowering learners with smart and seamless test preparation.
          </motion.p>
        </div>

        {/* Our Mission */}
        <div className=" bg-blue-100 max-w-5xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
            <p className="text-center text-gray-700 max-w-3xl mx-auto">
              At AWM, our mission is to make quality test preparation accessible and effective for every learner.
              Whether you're preparing for school exams or competitive entrances, we help you practice smarter with real-exam environments,
              instant feedback, and deep analytics.
            </p>
          </motion.div>
        </div>

        {/* What We Offer */}
        <div className="bg-blue-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-10"
            >
              What We Offer
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Practice Tests',
                  icon: <FaBookOpen className="text-4xl text-blue-600 mb-4" />,
                  desc: 'Structured tests by subject and topic to simulate real exams.'
                },
                {
                  title: 'Performance Analysis',
                  icon: <FaChartLine className="text-4xl text-blue-600 mb-4" />,
                  desc: 'Detailed feedback with score breakdowns and visual charts.'
                },
                {
                  title: 'Completely Free',
                  icon: <FaRocket className="text-4xl text-blue-600 mb-4" />,
                  desc: 'No paywalls. Practice anytime, anywhere.'
                },
                {
                  title: 'Subject Wise Tracking',
                  icon: <FaUsers className="text-4xl text-blue-600 mb-4" />,
                  desc: 'See strengths and weaknesses across subjects instantly.'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-blue-50 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-center items-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="bg-blue-100 max-w-5xl mx-auto px-4 py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className=" text-3xl font-bold mb-6 text-center"
          >
            Who We Serve
          </motion.h2>
          <div className="grid grid-cols-1 justify-center text-center md:grid-cols-2 gap-6">
            <ul className="list-disc list-inside space-y-2">
              <li>Competitive Exam Aspirants</li>
              <li>School & College Students</li>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li>Coaching Institutes</li>
              <li>Self-paced Learners</li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-blue-200 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-10 text-center"
            >
              Why To Choose AWM?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                'Real exam interface with accurate timing and navigation',
                'Instant results and detailed analytics after submission',
                'Easy to use on desktop and mobile — no app required'
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transition"
                >
                  <p className="text-gray-700 text-center">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 text-center bg-blue-700 text-white">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold mb-4"
          >
            Ready to improve your test performance?
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/home'}
            className="bg-blue-50 text-blue-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100"
          >
            Start Practicing Now
          </motion.button>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default AboutUsPage;
