'use client';

import React from 'react';
import { useMemoryGame } from '../hooks/useMemoryGame';
import Board from '../components/Board';
import GameStats from '../components/GameStats';
import WinModal from '../components/WinModal';

export default function Home() {
  const {
    cards,
    moves,
    elapsedTime,
    isWon,
    resetGame,
    handleCardClick,
    isGameStarted,
    difficulty,
    changeDifficulty,
  } = useMemoryGame();

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8 px-4 md:py-12 md:px-8 bg-[#eef2f7] select-none text-slate-800">
      <div className="w-full max-w-2xl flex flex-col items-center">
        
        {/* Header Block */}
        <header className="text-center mb-6">
          <div 
            className="inline-flex items-center justify-center p-3 rounded-full mb-3 bg-[#eef2f7]"
            style={{
              boxShadow: '6px 6px 12px #d1d9e6, -6px -6px 12px #ffffff',
            }}
          >
            <span className="text-3xl animate-pulse">🧠</span>
          </div>
          <h1 
            className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text mb-2 animate-in fade-in slide-in-from-top duration-700"
            style={{
              backgroundImage: 'linear-gradient(135deg, #a0c4ff, #ffafcc)',
            }}
          >
            Mind Matcher
          </h1>
          <p className="text-sm md:text-base font-bold text-slate-400">
            A playful pastel neumorphic memory game
          </p>
        </header>

        {/* Neumorphic Difficulty Selector */}
        <div 
          className="w-full max-w-[360px] p-2 mb-6 flex justify-between gap-2 text-sm font-black text-slate-600/90"
          style={{
            backgroundColor: '#eef2f7',
            boxShadow: 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff',
            borderRadius: '1.25rem',
          }}
        >
          {(['easy', 'medium', 'hard'] as const).map((level) => {
            const isActive = difficulty === level;
            const label = level.charAt(0).toUpperCase() + level.slice(1);
            
            // Custom font colors for active difficulty levels
            const activeColorClass = 
              level === 'easy' ? 'text-emerald-500' :
              level === 'medium' ? 'text-sky-500' :
              'text-rose-500';

            return (
              <button
                key={level}
                onClick={() => changeDifficulty(level)}
                className={`flex-1 py-2 px-3 rounded-xl transition-all duration-300 text-center active:scale-[0.97] capitalize cursor-pointer font-bold ${
                  isActive ? `${activeColorClass} font-black` : 'text-slate-400 hover:text-slate-600'
                }`}
                style={{
                  boxShadow: isActive
                    ? '3px 3px 6px #d1d9e6, -3px -3px 6px #ffffff'
                    : 'none',
                  backgroundColor: isActive ? '#eef2f7' : 'transparent',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Game Dashboard Stats */}
        <GameStats
          moves={moves}
          elapsedTime={elapsedTime}
          resetGame={resetGame}
          isGameStarted={isGameStarted}
        />

        {/* Game Board Grid */}
        {cards.length > 0 ? (
          <Board cards={cards} onCardClick={handleCardClick} difficulty={difficulty} />
        ) : (
          <div className="w-full aspect-square flex items-center justify-center text-slate-400 font-bold text-lg">
            Shuffling cards... 🃏
          </div>
        )}

        {/* Footer Instructions Panel */}
        <footer 
          className="w-full p-5 mt-4 text-center text-xs md:text-sm text-slate-400/90 font-bold"
          style={{
            backgroundColor: '#eef2f7',
            boxShadow: 'inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff',
            borderRadius: '1.25rem',
          }}
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <span className="text-slate-500 font-extrabold uppercase tracking-wide text-xs">How to Play</span>
            <span>Click cards to flip and reveal numbers. Find matches to complete the board.</span>
            <span>The timer starts on your first card flip! 🚀</span>
          </div>
        </footer>

        {/* Win Modal Overlay */}
        <WinModal
          isOpen={isWon}
          moves={moves}
          elapsedTime={elapsedTime}
          onPlayAgain={resetGame}
        />
      </div>
    </main>
  );
}
