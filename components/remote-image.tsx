import Image, { ImageProps } from "next/image";
import { FC } from "react";

interface RemoteImageProps extends Omit<ImageProps, "src"> {
  src: string; // this will be the remote URL
}

const RemoteImage: FC<RemoteImageProps> = ({ src, ...props }) => {
  const proxiedSrc = `/api/image-proxy?url=${encodeURIComponent(src)}`;

  return (
    <Image
      {...props}
      alt={props?.alt ?? `image-${props?.key ?? 3}`}
      src={proxiedSrc}
    />
  );
};

export default RemoteImage;
