"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfileImageProps {
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ProfileImage({
  fill,
  width,
  height,
  className = "",
  sizes,
  priority,
}: ProfileImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-emerald-900/60 to-slate-900 ${className}`}
        style={fill ? { position: "absolute", inset: 0 } : { width, height }}
      >
        <span className="text-emerald-400 font-bold select-none" style={{ fontSize: fill ? "clamp(2rem,25%,5rem)" : (width ?? 96) * 0.35 }}>
          JD
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src="/profile-new.jpg"
        alt="Jatin Dave"
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src="/profile-new.jpg"
      alt="Jatin Dave"
      width={width ?? 96}
      height={height ?? 96}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
