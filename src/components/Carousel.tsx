"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CarouselCard from './CarouselCard';

interface CarouselItemData {
  image: string;
  title: string;
  description: string;
  cta?: { label: string; onClick: () => void };
}

interface SlidesToShow {
  base: number;
  sm?: number;
  md?: number;
  lg?: number;
  [breakpoint: string]: number | undefined;
}

interface CarouselProps {
  items: CarouselItemData[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  infinite?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  slidesToShow?: SlidesToShow;
  ariaLabel?: string;
}

const breakpoints = [
  { width: 1024, key: 'lg' },
  { width: 768, key: 'md' },
  { width: 640, key: 'sm' },
];

function getSlidesToShow(slides: SlidesToShow | undefined): number {
  if (!slides) return 1;
  if (typeof window === 'undefined') return slides.base;
  const w = window.innerWidth;
  for (let bp of breakpoints) {
    if (w >= bp.width && slides[bp.key]) return slides[bp.key]!;
  }
  return slides.base;
}

const Carousel = React.forwardRef<unknown, CarouselProps>(
  (
    {
      items,
      autoPlay = false,
      autoPlayInterval = 4000,
      infinite = false,
      showArrows = true,
      showDots = true,
      slidesToShow = { base: 1, sm: 2, md: 3, lg: 3 },
      ariaLabel = 'Carousel',
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const [currentIndex, setCurrentIndex] = useState(infinite ? slidesToShow.base : 0);
    const [slideCount, setSlideCount] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translate, setTranslate] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);

    useEffect(() => {
      function handleResize() {
        setSlideCount(getSlidesToShow(slidesToShow));
      }
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [slidesToShow]);

    useEffect(() => {
      if (!infinite) return;
      setCurrentIndex((prev) => {
        const min = slideCount;
        const max = items.length + slideCount - 1;
        if (prev < min) return min;
        if (prev > max) return max;
        return prev;
      });
    }, [slideCount, items.length, infinite]);
    useEffect(() => {
      if (!isAutoPlay) return;
      function play() {
        autoPlayRef.current = setInterval(() => {
          handleNext();
        }, autoPlayInterval);
      }
      play();
      return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
    });
    useEffect(() => {
      function onVisibility() {
        if (document.hidden && autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        } else if (!document.hidden && isAutoPlay) {
          autoPlayRef.current = setInterval(() => {
            handleNext();
          }, autoPlayInterval);
        }
      }
      document.addEventListener('visibilitychange', onVisibility);
      return () => { document.removeEventListener('visibilitychange', onVisibility); };
    }, [isAutoPlay, autoPlayInterval]);
    const fullItemList = infinite
      ? [
          ...items.slice(-slideCount),
          ...items,
          ...items.slice(0, slideCount),
        ]
      : items;
    const totalSlides = fullItemList.length;
    const handleTransitionEnd = () => {
      setTransitioning(false);
      if (!infinite) return;
      let index = currentIndex;
      if (currentIndex >= items.length + slideCount) {
        index = slideCount;
        setCurrentIndex(index);
      } else if (currentIndex < slideCount) {
        index = items.length + (currentIndex - slideCount);
        setCurrentIndex(index);
      }
    };
    const handlePrev = useCallback(() => {
      if (!infinite && currentIndex === 0) return;
      setTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }, [infinite, currentIndex]);
    const handleNext = useCallback(() => {
      if (!infinite && currentIndex >= items.length - slideCount) return;
      setTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, [infinite, currentIndex, items.length, slideCount]);
    const goTo = (idx: number) => {
      setTransitioning(true);
      setCurrentIndex(infinite ? idx + slideCount : idx);
    };
    React.useImperativeHandle(ref, () => ({
      next: handleNext,
      prev: handlePrev,
      goTo,
      pause: () => setIsAutoPlay(false),
      play: () => setIsAutoPlay(true),
      current: currentIndex,
    }));
    function onDragStart(e: React.PointerEvent) {
      setIsDragging(true);
      setStartX(e.clientX || (e as any).touches?.[0]?.clientX);
    }
    function onDragMove(e: React.PointerEvent) {
      if (!isDragging) return;
      const x = e.clientX || (e as any).touches?.[0]?.clientX;
      setTranslate(x - startX);
    }
    function onDragEnd() {
      setIsDragging(false);
      if (Math.abs(translate) > 50) {
        if (translate > 0) {
          handlePrev();
        } else {
          handleNext();
        }
      }
      setTranslate(0);
    }
    function onKeyDown(e: React.KeyboardEvent) {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    }
    const slideWidth = 100 / slideCount;
    let realIndex = currentIndex;
    if (infinite) {
      realIndex = currentIndex;
    }
    const transition = transitioning && !isDragging ? "transform 0.35s cubic-bezier(0.4,0,0.2,1)" : '';
    const stepPercent = 100 / totalSlides;
    const style = {
      transform: `translateX(calc(${-realIndex * stepPercent}% + ${translate}px))`,
      transition,
      willChange: 'transform',
    };
    return (
      <section
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={-1}
        className="relative w-full overflow-hidden"
        onKeyDown={onKeyDown}
        ref={containerRef}
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => autoPlay && setIsAutoPlay(true)}
      >
        {showArrows && (
          <>
            <button
              className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200 disabled:opacity-40 border-2 border-gray-300"
              onClick={handlePrev}
              aria-label="Previous slide"
              disabled={!infinite && currentIndex === 0}
              style={{left: 12}} // inner margin
            >
              <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6l-6 8 6 8" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200 disabled:opacity-40 border-2 border-gray-300"
              onClick={handleNext}
              aria-label="Next slide"
              disabled={!infinite && currentIndex >= items.length - slideCount}
              style={{right: 12}}
            >
              <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6l6 8-6 8" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </>
        )}
        <div
          className="flex flex-row w-full select-none touch-pan-x items-center py-8"
          style={{
            ...style,
            width: `calc(${totalSlides * slideWidth}%)`,
          }}
          ref={trackRef}
          onPointerDown={onDragStart}
          onPointerMove={isDragging ? onDragMove : undefined}
          onPointerUp={onDragEnd}
          onPointerLeave={isDragging ? onDragEnd : undefined}
          onTransitionEnd={handleTransitionEnd}
        >
          {fullItemList.map((item, i) => {
            // Find which is the active/center card
            const slideIdx = (i - (infinite ? slideCount : 0) + items.length) % items.length;
            const active = slideIdx === ((currentIndex - (infinite ? slideCount : 0) + items.length) % items.length);
            const side = Math.abs(slideIdx - ((currentIndex - (infinite ? slideCount : 0) + items.length) % items.length));
            return (
              <div
                key={item.title + i}
                className="box-border px-3 flex-shrink-0 flex justify-center items-center"
                style={{
                  width: `calc(100% / ${slideCount})`,
                  scrollSnapAlign: 'center',
                  zIndex: active ? 30 : 20 - side,
                  transform: active
                    ? 'scale(1.08) translateY(-12px)'
                    : side === 1
                    ? 'scale(0.95)'
                    : 'scale(0.9)',
                  opacity: active ? 1 : side === 1 ? 0.7 : 0.45,
                  boxShadow: active
                    ? '0 8px 24px 0 rgba(120,120,180,0.13), 0 2px 16px 0 rgba(120,120,120,0.14)'
                    : '',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s, box-shadow 0.25s',
                }}
                role="group"
                aria-label={`Slide ${slideIdx + 1} of ${items.length}`}
                tabIndex={0}
              >
                <CarouselCard {...item} />
              </div>
            );
          })}
        </div>
        {showDots && (
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                aria-controls={containerRef.current?.id || undefined}
                aria-current={((currentIndex - slideCount + items.length) % items.length) === idx ? 'true' : undefined}
                className={`w-3 h-3 rounded-full border border-gray-400 bg-gray-200 transition-colors focus:outline-none ${((currentIndex - slideCount + items.length) % items.length) === idx ? 'bg-accent-blue' : 'bg-gray-200'}`}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
);

Carousel.displayName = 'Carousel';
export default Carousel;
