import React from "react";

function Hero() {
  return (
    <div className="HeroSection grid place-items-center px-4">
      <div className="space-y-6 md:space-y-8">
        <p className="text-white text-center text-6xl">
          <span className="text-customTextHighlight">Elevate</span> your skills
          using WordEnlighten!
        </p>

        <p className="text-white text-center text-4xl">
          Simple, effective, and free
        </p>

        <p className="text-white text-center text-3xl">
          <span className="text-customTextHighlight">Start</span> your journey to global fluency today. Join us and
          transcend language barriers, one word at a time!
        </p>
      </div>
    </div>
  );
}

export default Hero;
