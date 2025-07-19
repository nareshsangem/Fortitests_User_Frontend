import React, { useState } from "react";
import "./LandingPageTestimonialCss.css"
import { FaQuoteLeft } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import testimonial1 from "../Assets/testimonial1.jpeg";
import testimonial2 from "../Assets/testimonial2.jpeg";
import testimonial3 from "../Assets/testimonial3.jpeg";

const testimonials = [
  {
    id: 1,
    image: testimonial1,
    quote: "Mock Tests Built My Confidence",
    author:
      "“I took over 20 mock tests before my real exam, and I felt like I had already done it before. The detailed feedback after each test helped me master timing and avoid repeated mistakes.”",
  },
  {
    id: 2,
    image: testimonial2,
    quote: "All-In-One Dashboard",
    author:
      "“After each test, FortiTests saved my results and progress in one place. I could revisit past attempts, view my scores per subject, and even see how my timing improved. Having that kind of data without any paid subscription was a game-changer for my preparation.”",
  },
  {
    id: 3,
    image: testimonial3,
    quote: "Instant Results",
    author:
      "“The moment I clicked ‘Submit Test’, I received a detailed result with correct answers, explanation (where available), and my total score. There was no delay or signup wall. That instant feedback helped me revise smarter, not harder.”",
  },
];

export default function LandingPageTestimonial() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < testimonials.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div className="testimonial-container  overflow-hidden">
      <div className="testimonial-image-con hover:scale-105 transition-transform duration-5000">
        <img
          src={testimonials[current].image}
          alt="user"
          className="testimonial-image"
        />
      </div>
      <div className="testimonial-content hover:scale-105 transition-transform duration-5000">
        <FaQuoteLeft className="quote-icon" />
        <h1>{testimonials[current].quote}</h1>
        <p>{testimonials[current].author}</p>
        <div className="arrow-container">
          <FaArrowLeftLong
            className={`arrow ${current === 0 ? "arrow-disabled" : ""}`}
            onClick={handlePrev}
          />
          <FaArrowRightLong
            className={`arrow ${
              current === testimonials.length - 1 ? "arrow-disabled" : ""
            }`}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
