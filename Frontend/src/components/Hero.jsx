import React from "react";
import helloIcon from "../assets/animations/hero_animation.json";
import Lottie from "lottie-react";

function Hero() {
  return (
    <div className="HeroSection grid place-items-center px-4">
      <div className="space-y-6 md:space-y-8">
        <p className="text-white text-center text-6xl">
          <span className="text-customTextHighlight">Elevate</span> your skills
          using <span className="text-customNavbarText">WordEnlighten</span>!
        </p>

        <p className="text-white text-center text-4xl italic ">
          Simple, effective, and free
        </p>

        <p className="text-white text-center text-3xl">
          <span className="text-customTextHighlight">Start</span> your journey
          to global fluency today. 
        </p>

        <p className="text-white text-center text-3xl">
          <span className="text-customTextHighlight">Join</span> us and transcend language barriers, one
          word at a time!</p>
      </div>
      <div className="absolute right-0 bottom-28 z-10 overflow-hidden">
        <Lottie animationData={helloIcon} className="w-52" />
      </div>
      
    </div>
  );
}

export default Hero;
