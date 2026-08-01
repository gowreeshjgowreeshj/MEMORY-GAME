'use client';

import React from 'react';

interface GameStatsProps {
  moves: number;
  elapsedTime: number;
  resetGame: () => void;
  isGameStarted: boolean;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const GameStats: React.FC<GameStatsProps> = ({
  moves,
  elapsedTime,
  resetGame,
  isGameStarted,
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      {/* Timer and Moves Panel Row */}
      <div className="flex flex-1 w-full justify-around sm:justify-start gap-4">
        {/* Timer Panel */}
        <div className="flex-1 max-w-[180px] p-4 flex flex-col items-center justify-center transition-all duration-300 nm-concave-sm backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <svg
              className={`w-4 h-4 text-[#8ec5fc] ${isGameStarted ? 'animate-spin' : ''}`}
              style={{ animationDuration: '6s' }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-bold tracking-wider uppercase">Time</span>
          </div>
          <span className="text-2xl font-black text-slate-700 tracking-wider">
            {formatTime(elapsedTime)}
          </span>
        </div>

        {/* Moves Panel */}
        <div className="flex-1 max-w-[180px] p-4 flex flex-col items-center justify-center transition-all duration-300 nm-concave-sm backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <svg
              className="w-4 h-4 text-[#ff9a9e]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.64 8.38m5.95 5.99a5.96 5.96 0 01-5.84-5.99m0 0a14.99 14.99 0 01-6.17-12A14.99 14.99 0 0115.54 8.4"
              />
            </svg>
            <span className="text-xs font-bold tracking-wider uppercase">Moves</span>
          </div>
          <span className="text-2xl font-black text-slate-700">
            {moves}
          </span>
        </div>
      </div>

      {/* Playful Reset Button */}
      <button
        onClick={resetGame}
        className="w-full sm:w-auto px-6 py-4 flex items-center justify-center gap-2 text-slate-700 font-extrabold text-base hover:text-rose-500 transition-all duration-200 active:scale-95 nm-button backdrop-blur-md cursor-pointer"
      >
        <svg
          className="w-5 h-5 text-slate-500 hover:text-rose-500 transition-colors"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        <span>Reset Game</span>
      </button>
    </div>
  );
};
export default GameStats;
