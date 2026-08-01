'use client';

import React from 'react';

interface CardProps {
  value: number;
  graphic: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({
  value,
  graphic,
  isFlipped,
  isMatched,
  onClick,
}) => {
  // Determine if the card should be visually in the "flipped/shown" state
  const isShown = isFlipped || isMatched;

  return (
    <div
      onClick={onClick}
      className="perspective-1000 w-full aspect-square cursor-pointer select-none active:scale-95 transition-transform duration-150"
      aria-label={`Card ${value}`}
    >
      <div
        className={`w-full h-full duration-500 transform-style-3d relative transition-transform ${
          isShown ? 'rotate-y-180' : ''
        }`}
      >
        {/* Card Back (Face Down) */}
        <div
          className={`backface-hidden absolute inset-0 rounded-2xl flex items-center justify-center border-4 border-white/30 card-back-vibrant transition-all duration-300 ${
            isShown ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
          style={{
            boxShadow: '6px 6px 16px rgba(99, 102, 241, 0.2), -6px -6px 16px rgba(255, 255, 255, 0.8)',
          }}
        >
          {/* Playful center dot/bubble */}
          <div 
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all bg-white/20 backdrop-blur-sm z-10 border border-white/40"
            style={{
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.25), inset -2px -2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <span className="text-white text-xl md:text-2xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">?</span>
          </div>
        </div>

        {/* Card Front (Face Up) */}
        <div
          className={`backface-hidden rotate-y-180 absolute inset-0 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 card-front-${value} ${
            isMatched
              ? 'border-emerald-300/60 opacity-85'
              : 'border-white/60'
          } ${
            !isShown ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
          style={{
            boxShadow: isMatched
              ? 'inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.5)'
              : '4px 4px 12px rgba(0,0,0,0.08), -4px -4px 12px rgba(255,255,255,0.7)',
          }}
        >
          {/* Display the Graphic */}
          <div
            className={`font-black text-4xl md:text-5xl select-none filter drop-shadow-md transition-all duration-300 ${
              isMatched ? 'scale-90 opacity-60' : 'scale-100 hover:scale-105'
            }`}
          >
            {graphic}
          </div>
          
          {/* Small checkmark for solved cards */}
          {isMatched && (
            <div className="absolute top-2 right-2 bg-emerald-450 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white/50 animate-in zoom-in duration-300">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
