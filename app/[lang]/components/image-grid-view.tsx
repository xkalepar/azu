import AnimatedCard from "./animated-card";
import RemoteImage from "@/components/remote-image";
type props = {
  list: string[];
  className?: string;
};
/*
 * list of images parse them in grid view
 */
const ImageGridView = ({ list, className }: props) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {list.map((img, idx) => {
        const src = img;
        const alt = `gallery image -${idx}`;
        return (
          <div
            key={idx}
            className="rounded shadow overflow-hidden bg-white flex flex-col"
          >
            <AnimatedCard
              intialX={idx % 2 === 0 ? 20 : -20}
              XorY="x"
              className="relative w-full aspect-[4/3]"
            >
              <RemoteImage
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
                priority={idx < 4}
              />
            </AnimatedCard>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGridView;
