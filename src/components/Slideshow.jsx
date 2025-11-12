import React, { useState, useEffect } from "react";
import "./Slideshow.css";

// Images and associated thoughts/messages
const slides = [
  { src: "/images/os6.jpg", text: "The best way to find yourself is to lose yourself in the service of others." },
  { src: "/images/os6.jpg", text: "Happiness is not so much in having as sharing.We make a living by what we get,but we make a life by what we gave." },
  { src: "/images/os6.jpg", text: "Your little help can make a big difference." },
  { src: "/images/os6.jpg", text: "God has given us two hands:one to receive with and the other to give with." },
];

function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // change slide every 4 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      <img src={slides[current].src} alt="slideshow" className="slide" />
      <div className="overlay">
        <p key={current} className="fade-text">{slides[current].text}</p>
      </div>
    </div>
  );
}

export default Slideshow;
