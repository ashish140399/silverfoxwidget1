import { LazyLoadImage } from "react-lazy-load-image-component";

function IconImage({
  src,
  className,
  alt,
  height,
  width,
}: {
  src: any;
  className?: string;
  alt?: string;
  height?: number;
  width?: number;
}) {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      effect="blur"
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = "/tokens/unknown.svg";
      }}
    />
  );
}

export default IconImage;
