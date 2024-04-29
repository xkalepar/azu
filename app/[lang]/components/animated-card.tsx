"use client";
import { motion, useScroll } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";

const AnimatedCard = ({ children }: { children: React.ReactNode }) => {
  //   const { scrollY } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      if (
        window.scrollY + window.innerHeight >=
        ref.current.offsetTop + ref.current.offsetHeight / 2
      ) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
