import { Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../Store/Hooks";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { toggleTheme } from "../Store/Slice/LayoutSlice";
import { TiWeatherSunny } from "react-icons/ti";
import { RxMoon } from "react-icons/rx";

const AuthLayout = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.layout.theme);
  const isMoon = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <div 
          className="theme-toggle cursor-pointer flex items-center justify-center relative w-10 h-10 bg-main-background/50 backdrop-blur-md rounded-full border border-border-color shadow-sm hover:shadow-md transition-all hover:scale-105" 
          onClick={() => dispatch(toggleTheme())} 
        >
           <span className={`icon absolute text-primary-text transition-all duration-500 ease-in-out ${ isMoon ? "opacity-100 rotate-0" : "opacity-0 -rotate-90" }`} > <RxMoon size={22} /> </span>
           <span className={`icon absolute text-primary-text transition-all duration-500 ease-in-out ${ isMoon ? "opacity-0 rotate-90" : "opacity-100 rotate-0" }`} > <TiWeatherSunny size={22} /> </span>
        </div>
      </div>
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 auth-shape-1"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, -40, 0],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 auth-shape-2"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[20%] left-[20%] w-[700px] h-[700px] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 auth-shape-3"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
