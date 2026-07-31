'use client';

import React from 'react';

interface CardProps {
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({
  value,
  isFlipped,
  isMatched,
  onClick,
}) => {
  // Determine if the card should be visually in the "flipped/shown" state
  const isShown = isFlipped || isMatched;

  // Inline styling for different pastel card backgrounds
  const cardFrontStyle: React.CSSProperties = {
    backgroundColor: `var(--pastel-${value})`,
  };

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
          className={`backface-hidden absolute inset-0 rounded-2xl flex items-center justify-center border-4 border-slate-100/50 card-back-pattern transition-all duration-300 ${
            isShown ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
          style={{
            boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
          }}
        >
          {/* Playful center dot/bubble */}
          <div 
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all bg-[#eef2f7]"
            style={{
              boxShadow: 'inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff',
            }}
          >
            <span className="text-[#a0c4ff] text-xl md:text-2xl font-black">?</span>
          </div>
        </div>

        {/* Card Front (Face Up) */}
        <div
          className={`backface-hidden rotate-y-180 absolute inset-0 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 ${
            isMatched
              ? 'border-emerald-300/60 opacity-80'
              : 'border-white/60'
          } ${
            !isShown ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
          style={{
            ...cardFrontStyle,
            boxShadow: isMatched
              ? 'inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.7)'
              : '4px 4px 10px rgba(0,0,0,0.06), -4px -4px 10px rgba(255,255,255,0.9)',
          }}
        >
          {/* Display the Number */}
          <div
            className={`font-black text-3xl md:text-4xl select-none text-slate-800/80 transition-all ${
              isMatched ? 'scale-90 opacity-60' : 'scale-100'
            }`}
          >
            {value}
          </div>
          
          {/* Small checkmark for solved cards */}
          {isMatched && (
            <div className="absolute top-2 right-2 bg-emerald-400 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
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
                  strokeWidth="3"
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
