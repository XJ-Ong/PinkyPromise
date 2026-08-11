"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function ProductImage({
  src,
  alt,
  className,
  width = 96,
  height = 96,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full min-w-0 items-center justify-center bg-slate-100 ${className ?? ""}`}
        role="img"
        aria-label={`${alt} image unavailable`}
        data-testid="product-image-fallback"
      >
        <ImageOff className="h-6 w-6 text-slate-300" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}