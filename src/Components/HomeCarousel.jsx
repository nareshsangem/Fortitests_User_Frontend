import React from 'react';
import { ArrowRight } from 'lucide-react';
import hero_img from "../assets/hero66.png"
export default function HomeCarousel() {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-sky-100 pt-16 md:pt-16 pb-12 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-8 text-center md:text-left md:w-60%">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 leading-tight">
            Crack Government Exams with <br className="hidden sm:block" /> Free Mock Tests
          </h1>

          <p className="text-gray-600 text-md">
            Take real exam-like mock tests for SSC, RRB, TSPSC, Banking, and more.
          </p>
          <p className="text-base md:text-md text-gray-600 mt-2 max-w-xl animate-fadeInUp delay-200">
            Get exam-level practice with instant feedback, deep insights, and downloadable reports.
          </p>

          <div className="mt-8 flex justify-center md:justify-start animate-fadeInUp delay-300">
            <a
              href="/exams"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              Start Practicing <ArrowRight size={20} />
            </a>
            <a
              href="/exams"
              className="ml-4 border  border-blue-600 text-blue-600 hover:bg-blue-100 px-5 py-2 rounded-xl font-medium transition-all"
            >
              Browse Exams
            </a>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className=" flex justify-center md:justify-end ">
          <img
            src={hero_img}
            alt="Student practicing mock tests"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full  "
          />
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease both;
          }
          .animate-fadeInUp.delay-100 {
            animation-delay: 0.1s;
          }
          .animate-fadeInUp.delay-200 {
            animation-delay: 0.2s;
          }
          .animate-fadeInUp.delay-300 {
            animation-delay: 0.3s;
          }
          .animate-scaleIn {
            animation: scaleIn 0.7s ease both;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </section>
  );
}
