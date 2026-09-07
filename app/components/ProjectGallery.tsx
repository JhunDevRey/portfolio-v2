"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";

export function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(i);
  };

  const step = (delta: number) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev + delta + images.length) % images.length);
  };

  return (
    <>
      <Image
        src={images[index]}
        alt={`${alt} screenshot ${index + 1} of ${images.length}`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={step(-1)}
            className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/60"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={step(1)}
            className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/60"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="absolute inset-x-0 bottom-2 z-10 flex items-center justify-center gap-1.5">
            {images.map((image, i) => (
              <button
                key={image}
                type="button"
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                onClick={goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
