import React, { useState, useRef } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

const BeforeAfterSlider3D = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Natural / Before',
  afterLabel = 'Glamour Couture / After',
  title = 'Royal Bridal Transformation',
  subtitle = 'Airbrush Couture & Radiant Skin Prep'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="relative group max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-amber-200/40 dark:border-pink-500/30 transition-all duration-300">
      <div className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 dark:border-slate-800">
        <div>
          <h3 className="font-serif font-bold text-lg md:text-xl text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <div className="text-xs font-medium px-3 py-1.5 rounded-full bg-amber-50 dark:bg-pink-950/60 text-amber-700 dark:text-pink-300 border border-amber-200 dark:border-pink-800/40 flex items-center gap-1.5">
          <MoveHorizontal className="w-4 h-4 animate-pulse" />
          <span>Drag slider to compare</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[400px] md:h-[520px] select-none cursor-ew-resize overflow-hidden"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER Image (Full background) */}
        <img
          src={afterImage}
          alt="After Transformation"
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
        <div className="absolute top-4 right-4 bg-pink-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm pointer-events-none">
          {afterLabel}
        </div>

        {/* BEFORE Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before Transformation"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            draggable="false"
          />
          <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm pointer-events-none">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_12px_rgba(0,0,0,0.6)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-amber-500 dark:border-pink-500 shadow-xl flex items-center justify-center text-slate-700 dark:text-slate-200">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider3D;
