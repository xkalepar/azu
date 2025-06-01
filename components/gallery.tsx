"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TreePine } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

type Props = {
  images: string[];
  arAlt: string;
  enAlt: string;
};

const Gallery = ({ arAlt, enAlt, images }: Props) => {
  const { lang } = useParams();
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}

        {/* Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={image}
                    alt={`${lang === "ar" ? arAlt : enAlt} ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority={index < 4}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={cn(
                      "absolute bottom-4 text-white",
                      lang === "ar" ? "right-4" : "left-4"
                    )}
                  >
                    <p className="text-sm font-medium">{`${
                      lang === "ar" ? arAlt : enAlt
                    }-${index + 1}`}</p>
                  </div>
                </div>
                <div
                  className={cn(
                    "absolute top-4  w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0",
                    lang === "ar" ? "left-4" : "right-4"
                  )}
                >
                  <TreePine className="h-4 w-4 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
