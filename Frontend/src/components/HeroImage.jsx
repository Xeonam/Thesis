import React from "react";
import featuresImage from "../assets/hero.png"; // This imports the image

function HeroImage() {
  return (
    <div className="mt-20 mx-60 my-40">
      <img
        src={featuresImage}
        alt="Toggl Features"
        className="rounded"
      />
    </div>
  );
}

export default HeroImage;
