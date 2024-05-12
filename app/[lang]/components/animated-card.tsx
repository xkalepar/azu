"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
interface Props {
  children: React.ReactNode;
  className?: string;
  XorY?: "x" | "y";
  intialY?: number;
  intialX?: number;
}

const AnimatedCard = ({
  children,
  className,
  XorY = "y",
  intialX = 20,
  intialY = 20,
}: Props) => {
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
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (XorY === "x") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ x: intialX, opacity: 0 }}
        animate={isVisible ? { x: 0, opacity: 1 } : { x: intialX, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        {children}
      </motion.div>
    );
  } else {
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: intialY, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: intialY, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      {children}
    </motion.div>;
  }
};

export default AnimatedCard;
