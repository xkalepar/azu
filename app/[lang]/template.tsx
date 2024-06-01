"use client";
import { motion } from "framer-motion";
// import Loading from "./components/loading";
// import { Suspense } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  // const { scrollYProgress } = useScroll();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      // style={{ scaleX: scrollYProgress }}
    >
      {children}
    </motion.div>
    // <Suspense fallback={<div className=" flex-center h-full w-full"></div>}>
    //   {children}
    // </Suspense>
  );
};

export default Template;
