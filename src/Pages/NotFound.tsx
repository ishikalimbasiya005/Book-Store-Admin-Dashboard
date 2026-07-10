import Lottie from "lottie-react";
import notFoundAnimation from "../animation/not-found-animation.json";

// Handle Vite ESM/CJS interop for lottie-react
const LottieComponent = (Lottie as { default?: typeof Lottie }).default || Lottie;

const NotFound = () => {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: 0, padding: 0 }}>
      <LottieComponent animationData={notFoundAnimation} />
      <h2 className="text-[40px] letter-spacing-[1px] text-primary-text!">Ooops! Something Went Wrong</h2>
      <p className="text-[18px] text-primary-text!">We couldn't find the page you're looking for</p>
    </div>
  );
};

export default NotFound;