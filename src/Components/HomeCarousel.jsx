import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://via.placeholder.com/1200x400?text=Mock+Test+Series',
    link: '/tests/mock-series',
    alt: 'Mock Test Series',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/1200x400?text=Practice+Daily+Quizzes',
    link: '/quizzes/daily',
    alt: 'Daily Quizzes',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/1200x400?text=Upgrade+to+Premium',
    link: '/upgrade',
    alt: 'Upgrade to Premium',
  },
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const goToSlide = (index) => {
    const newIndex = (index + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(nextSlide, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div
      className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg group"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <a
            href={slide.link}
            key={slide.id}
            className="min-w-full block"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
            />
          </a>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md hidden group-hover:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md hidden group-hover:block"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
