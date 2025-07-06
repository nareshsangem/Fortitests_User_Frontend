import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const carouselItems = [
  {
    title: "Ace Government Exams with FortiTests!",
    subtitle: "Mock tests for SSC, Banking, Railways & more",
    image: "/banners/banner1.jpg",
  },
  {
    title: "Real Exam Experience",
    subtitle: "SarkariPariksha-style UI with timer & review options",
    image: "/banners/banner2.jpg",
  },
  {
    title: "Track Your Progress",
    subtitle: "Detailed subject-wise performance & leaderboard",
    image: "/banners/banner3.jpg",
  },
];

function CarouselHero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("user_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleTakeTestClick = () => {
    if (isLoggedIn) {
      navigate("/tests");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="mt-16">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={5000}
        transitionTime={600}
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[300px] sm:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white px-4 text-center">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2">{item.title}</h2>
              <p className="text-md sm:text-lg mb-4">{item.subtitle}</p>
              <button
                onClick={handleTakeTestClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-md transition"
              >
                Take Test
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselHero;
