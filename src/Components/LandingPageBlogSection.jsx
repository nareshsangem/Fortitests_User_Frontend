import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import blog1 from "../assets/blog1.jpeg";
import blog2 from "../assets/blog2.jpeg";
import blog3 from "../assets/blog3.jpeg";
import blog4 from "../assets/blog4.jpeg";
import blog5 from "../assets/blog5.jpeg";
const insights = [
  {
    id: 1,
    image: blog1,
    title: "The Power of Mock Tests: Practice with Purpose",
    text: "Mock tests simulate real exam conditions and boost your confidence with detailed post-test analysis.",
    published: "Jan 5, 2025",
  },
  {
    id: 2,
    image: blog2,
    title: "My SSC Journey: From Beginner to Top Scorer",
    text: "How consistent mock tests, error reviews, and performance tracking helped me score 178 in Tier-1.",
    published: "Feb 12, 2025",
  },
  {
    id: 3,
    image: blog3,
    title: "TSPSC 2025: Tackle the Latest Pattern with Confidence",
    text: "Our TSPSC mock series reflects new patterns and trains you for real-time performance and accuracy.",
    published: "Mar 3, 2025",
  },
  {
    id: 4,
    image: blog4,
    title: "How This Platform Helps You Learn from Mistakes",
    text: "Use analytics to spot your weak areas, learn from past errors, and improve with targeted retests.",
    published: "Mar 22, 2025",
  },
  {
    id: 5,
    image: blog5,
    title: "Building Confidence Before Exam Day: A Real User’s Story",
    text: "Through consistent mocks and realistic practice, one student overcame anxiety and faced exams head-on.",
    published: "May 10, 2025",
  },
];


const LandingPageBlogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % insights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % insights.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);

  const getVisibleIndexes = () => {
    const len = insights.length;
    if (isMobile) return [currentIndex];
    const center = currentIndex;
    const left = (center - 1 + len) % len;
    const right = (center + 1) % len;
    return [left, center, right];
  };

  const visibleIndexes = getVisibleIndexes();

  return (
    <div className="text-center max-w-[2560px] mx-auto px-4 py-12 bg-gradient-to-r from-sky-50 to-indigo-100" id="blog">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-indigo-800 font-sans">Explore Our Latest Insights</h2>
        <p className="text-gray-600 text-lg font-sans mt-2">
          Stay informed with expert articles, tips & updates.
        </p>
      </div>

      <div className="relative flex items-center justify-center">
        <button onClick={prev} className="absolute left-0 z-10 p-2 bg-white shadow rounded-full">
          <ChevronLeft />
        </button>

        {isMobile ? (
          <div className="relative w-[412px] h-[508px] flex rounded-lg justify-center items-center overflow-hidden">
            <div
              key={insights[currentIndex].id}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[507px] bg-blue-50 border-2 border-blue-100 rounded-lg shadow-md ease-in-out flex flex-col overflow-hidden"
            >
              <img
                src={insights[currentIndex].image}
                alt={insights[currentIndex].title}
                className="w-full h-[60%] object-cover rounded-t-md"
              />
              <div className="flex flex-col justify-between flex-grow p-3">
                <div>
                  <h3 className="text-lg font-bold text-left text-black line-clamp-2">
                    "{insights[currentIndex].title}"
                  </h3>
                  <p className="text-gray-700 text-left font-semibold text-sm mt-1">
                    Published: {insights[currentIndex].published}
                  </p>
                  <p className="text-gray-700 text-left text-sm line-clamp-5">
                    {insights[currentIndex].text}
                  </p>
                </div>
                <a href="/blogs" className="text-blue-600 text-left font-medium hover:underline mt-2">
                  Continue Reading →
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4 w-full overflow-hidden">
            {visibleIndexes.map((index) => {
              const card = insights[index];
              const isCenter = index === currentIndex;

              let width = "w-[30%]";
              let height = "h-[480px]";
              if (isCenter) {
                width = "w-[33%]";
                height = "h-[500px]";
              }

              return (
                <div
                  key={card.id}
                  className={`bg-blue-50 border-2 border-blue-100 shadow-md rounded-lg ease-in-out hover:scale-[1.01] flex-shrink-0 flex flex-col overflow-hidden ${width} ${height}`}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-[60%] object-cover rounded-t-md hover:scale-105 transition-transform duration-700"
                  />
                  <div className="flex flex-col justify-between flex-grow p-3">
                    <div className="overflow-hidden">
                      <h3 className="text-xl font-bold text-left text-black line-clamp-2">
                        "{card.title}"
                      </h3>
                      <p className="text-gray-700 text-left font-semibold text-md mt-1">
                        Published: {card.published}
                      </p>
                      <p className="text-gray-700 text-left text-sm line-clamp-4">
                        {card.text}
                      </p>
                    </div>
                    <a href="/blogs" className="text-blue-600 text-left font-medium hover:underline mt-2">
                      Continue Reading →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button onClick={next} className="absolute right-0 z-10 p-2 bg-white shadow rounded-full">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default LandingPageBlogSection;
