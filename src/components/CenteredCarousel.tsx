"use client";
import React, { useMemo, useRef, useEffect, useState } from "react";

interface CarouselItem {
  id?: string | number;
  image?: string;
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
}

function Dot({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      aria-label={label}
      aria-current={active ? "true" : undefined}
      onClick={onClick}
      className={
        "h-2.5 w-2.5 rounded-full border border-slate-300 mx-1 " +
        (active ? "bg-slate-700" : "bg-white hover:bg-slate-200")
      }
    />
  );
}

function ArrowButton({ direction = "left", onClick, disabled }: { direction: "left" | "right"; onClick: () => void; disabled: boolean }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      aria-label={isLeft ? "Previous slide" : "Next slide"}
      onClick={onClick}
      disabled={disabled}
      className={
        "absolute top-1/2 -translate-y-1/2 z-10 grid place-items-center h-10 w-10 rounded-full shadow-md bg-white/95 backdrop-blur " +
  (isLeft ? "-left-14" : "-right-14") +
        (disabled ? " opacity-40 cursor-not-allowed" : " hover:bg-white")
      }
    >
      <span className="text-xl leading-none select-none">
        {isLeft ? "\u2039" : "\u203A"}
      </span>
    </button>
  );
}

function Card({ item }: { item: CarouselItem }) {
  return (
  <article className="w-full h-full rounded-full shadow-md bg-white/[0.03] dark:bg-black/[0.03] backdrop-blur-xl border border-black ring-1 ring-white/10 px-8 py-10 flex flex-col justify-center items-center glass-card">
      {item.image && (
        <img
          alt={item.title || ""}
          src={item.image}
          className="w-full h-40 object-cover rounded-xl mb-4"
          loading="lazy"
        />
      )}
      {item.title && (
        <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
      )}
      {item.description && (
        <p className="text-sm italic text-slate-600/70 mt-1">{item.description}</p>
      )}
      {item?.cta?.label && (
        <a
          href={item?.cta?.href || "#"}
          className="inline-flex mt-4 items-center justify-center px-3 py-1.5 text-sm font-medium bg-slate-800 text-white rounded-lg hover:bg-slate-900"
        >
          {item.cta.label}
        </a>
      )}
    </article>
  );
}

export function CenteredCarousel({
  items = [],
  cardWidth = 320,
  gap = 16,
  autoPlay = false,
  autoPlayInterval = 4500,
  infinite = true,
  showArrows = true,
  showDots = true,
}: {
  items: CarouselItem[];
  cardWidth?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  infinite?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const play = () => setIndex((i) => (infinite ? (i + 1) % items.length : Math.min(i + 1, items.length - 1)));
    timerRef.current = setInterval(play, autoPlayInterval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, autoPlayInterval, infinite, items.length]);

  // Pause on hover
  const onMouseEnter = () => timerRef.current && clearInterval(timerRef.current);
  const onMouseLeave = () => {
    if (!autoPlay) return;
    timerRef.current = setInterval(
      () => setIndex((i) => (infinite ? (i + 1) % items.length : Math.min(i + 1, items.length - 1))),
      autoPlayInterval
    );
  };

  const canPrev = infinite || index > 0;
  const canNext = infinite || index < items.length - 1;

  const prev = () => {
    if (!canPrev) return;
    setIndex((i) => (i - 1 + items.length) % items.length);
  };
  const next = () => {
    if (!canNext) return;
    setIndex((i) => (i + 1) % items.length);
  };

  // Compute translateX so that the active card is centered in the viewport.
  const translatePX = useMemo(() => {
    const slot = cardWidth + gap;
    const activeLeft = index * slot;
    const activeCenter = activeLeft + cardWidth / 2;
    return `calc(50% - ${activeCenter}px)`;
  }, [index, cardWidth, gap]);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials carousel"
      className="relative w-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {showArrows && (
        <>
          <ArrowButton direction="left" onClick={prev} disabled={!canPrev && !infinite} />
          <ArrowButton direction="right" onClick={next} disabled={!canNext && !infinite} />
        </>
      )}

      <div className="overflow-hidden w-full">
        <div
          ref={trackRef}
          className="flex items-stretch will-change-transform transition-transform duration-500 ease-out"
          style={{
            gap: `${gap}px`,
            transform: `translateX(${translatePX})`,
            padding: "24px 0",
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.id ?? i}
              className="flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
              role="group"
              aria-label={`Slide ${i + 1} of ${items.length}`}
            >
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>

      {showDots && (
        <div className="mt-3 flex items-center justify-center">
          {items.map((_, i) => (
            <Dot key={i} active={i === index} onClick={() => setIndex(i)} label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      )}
    </section>
  );
}
