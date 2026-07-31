'use client';

import React, { useEffect, useState } from 'react';

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  elapsedTime: number;
  onPlayAgain: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

export const WinModal: React.FC<WinModalProps> = ({
  isOpen,
  moves,
  elapsedTime,
  onPlayAgain,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      setMounted(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Generate 40 random confetti pieces with standard inline values
  const confettiPieces = Array.from({ length: 40 }).map((_, i) => {
    const left = `${Math.floor(Math.random() * 100)}%`;
    const delay = `${(Math.random() * 3).toFixed(1)}s`;
    const duration = `${(2.5 + Math.random() * 2.5).toFixed(1)}s`;
    const size = `${Math.floor(Math.random() * 10 + 6)}px`;
    // Select one of the pastel variables
    const pastelColor = `var(--pastel-${(i % 18) + 1})`;

    return {
      left,
      delay,
      duration,
      size,
      color: pastelColor,
      shape: i % 2 === 0 ? 'rounded-full' : 'rounded-sm',
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-md p-4 transition-all duration-300">
      {/* Confetti container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {confettiPieces.map((p, index) => (
          <div
            key={index}
            className={`absolute top-0 animate-confetti ${p.shape}`}
            style={{
              left: p.left,
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
            }}
          />
        ))}
      </div>

      {/* Modal Card */}
      <div
        className="w-full max-w-md p-8 md:p-10 flex flex-col items-center justify-center text-center relative z-10 transition-all duration-500 transform scale-100 animate-in fade-in zoom-in-95"
        style={{
          backgroundColor: '#eef2f7',
          boxShadow: '12px 12px 30px #c4c9d0, -12px -12px 30px #ffffff',
          borderRadius: '2rem',
        }}
      >
        {/* Crown/Trophy Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-[#eef2f7]"
          style={{
            boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
          }}
        >
          <span className="text-4xl animate-bounce">🏆</span>
        </div>

        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">
          You Won! 🎉
        </h2>
        <p className="text-slate-500 font-bold mb-8 text-sm md:text-base">
          Amazing memory! You matched all pairs!
        </p>

        {/* Stats Row */}
        <div className="w-full flex gap-4 mb-8">
          {/* Time Stat */}
          <div
            className="flex-1 p-4 rounded-2xl flex flex-col items-center justify-center bg-[#eef2f7]"
            style={{
              boxShadow: 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff',
            }}
          >
            <span className="text-xs font-bold text-slate-400 uppercase mb-1">Total Time</span>
            <span className="text-lg md:text-xl font-black text-[#a0c4ff]">
              {formatTime(elapsedTime)}
            </span>
          </div>

          {/* Moves Stat */}
          <div
            className="flex-1 p-4 rounded-2xl flex flex-col items-center justify-center bg-[#eef2f7]"
            style={{
              boxShadow: 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff',
            }}
          >
            <span className="text-xs font-bold text-slate-400 uppercase mb-1">Total Moves</span>
            <span className="text-lg md:text-xl font-black text-[#ffb7b2]">
              {moves} Pairs
            </span>
          </div>
        </div>

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="w-full py-4 text-lg font-black text-white bg-slate-800 rounded-2xl transition-all duration-200 shadow-md hover:bg-slate-700 active:scale-[0.98] select-none hover:shadow-lg"
          style={{
            backgroundImage: 'linear-gradient(135deg, #a0c4ff, #c7ceea)',
          }}
        >
          Play Again 🔄
        </button>
      </div>
    </div>
  );
};
export default WinModal;
