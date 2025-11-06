import React, { useState, useEffect } from "react";

const images = [
  "/images/food-donation.jpg",
  "/images/education.jpg",
  "/images/children-smile.jpg",
  "/images/medical-help.jpg",
];

function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      <img src={images[current]} alt="slideshow" className="slide" />
    </div>
  );
}

export default Slideshow;
