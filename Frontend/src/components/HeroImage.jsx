import React from "react";
import featuresImage from "../assets/hero.png"; // This imports the image

function HeroImage() {
  return (
    <div className="my-20 mx-60">
      <img
        src={featuresImage}
        alt="Toggl Features"
        className="rounded-[4em]"
      />
    </div>
  );
}

export default HeroImage;
