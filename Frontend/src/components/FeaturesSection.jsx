import React from "react";
import translateIcon from "../assets/animations/translate_animation.json";
import learnIcon from "../assets/animations/learn_animation.json";
import signUpIcon from "../assets/animations/sign_up_animation.json";
import Lottie from "lottie-react";

const FeatureCard = ({title, text, bgColor, animation }) => (
  <div
    className={`flex flex-col items-center p-4 ${bgColor} rounded-lg shadow`}
  >
    <Lottie animationData={animation} className="w-1/2" />
    <h3 className="text-lg font-semibold py-2">{title}</h3>
    <p className="text-sm text-center">{text}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-[#FDF1EC]">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">
          Why <span className="text-customTextHighlight">choose</span> WordEnlighten?
        </h2>
      </div>
      <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Fast, Free Translations"
          bgColor="bg-[#FDEAE2]"
          text="Master English to Hungarian translations effortlessly with our free
            tool. Experience lightning-fast, reliable translations at no cost and
            bridge language gaps instantly."
            animation={translateIcon}
        ></FeatureCard>
        <FeatureCard
          title="Effective Flashcard Learning"
          bgColor="bg-[#FFEBBD]"
          text="Reinforce your language learning with targeted flashcards. Practice
          vocabulary and phrases with a system designed to boost retention and
          accelerate your learning journey."
          animation={learnIcon}
        ></FeatureCard>

        <FeatureCard
          title="Quick & Easy Sign-Up"
          bgColor="bg-[#F7D8F3]"
          text="Jump right into learning with our streamlined registration process. It
          takes only moments to sign up and start your path to language
          proficiency."
          animation={signUpIcon}
        ></FeatureCard>
      </div>
    </section>
  );
};

export default FeaturesSection;
