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
    themeId,
    setThemeId,
    currentTheme,
    GAME_THEMES,
  } = useMemoryGame();

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8 px-4 md:py-12 md:px-8 bg-transparent select-none text-slate-800">
      <div className="w-full max-w-2xl flex flex-col items-center animate-in fade-in duration-500">
        
        {/* Header Block */}
        <header className="text-center mb-6">
          <div 
            className="inline-flex items-center justify-center p-3 rounded-full mb-3 nm-flat backdrop-blur-md"
          >
            <span className="text-3xl animate-pulse">🧠</span>
          </div>
          <h1 
            className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text mb-2 animate-in fade-in slide-in-from-top duration-700"
            style={{
              backgroundImage: 'linear-gradient(135deg, #4f46e5, #ec4899)',
            }}
          >
            Mind Matcher
          </h1>
          <p className="text-sm md:text-base font-bold text-slate-500">
            A vibrant, colorful graphic memory game
          </p>
        </header>

        {/* Difficulty Selector Container */}
        <div className="w-full max-w-[360px] flex flex-col items-center gap-1.5 mb-5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Difficulty</span>
          <div 
            className="w-full p-1.5 flex justify-between gap-2 text-sm font-black text-slate-600/90 nm-concave-sm backdrop-blur-md border border-white/20"
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
                  className={`flex-1 py-1.5 px-3 rounded-lg transition-all duration-300 text-center active:scale-[0.97] capitalize cursor-pointer font-bold ${
                    isActive ? `${activeColorClass} font-black` : 'text-slate-400 hover:text-slate-600'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? '2px 2px 4px rgba(0, 0, 0, 0.05), -2px -2px 4px rgba(255, 255, 255, 0.8)'
                      : 'none',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme Selector Container */}
        <div className="w-full max-w-xl mb-6 flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Graphic Theme</span>
          <div 
            className="w-full p-1.5 flex justify-between gap-1.5 text-xs sm:text-sm font-bold text-slate-600 nm-flat-sm backdrop-blur-md border border-white/30"
          >
            {GAME_THEMES.map((theme) => {
              const isActive = themeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setThemeId(theme.id)}
                  className={`flex-1 py-2 px-1.5 sm:px-3 rounded-lg transition-all duration-300 text-center active:scale-[0.97] cursor-pointer flex items-center justify-center gap-1.5 ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/30'
                  }`}
                >
                  <span className="text-sm sm:text-base">{theme.icon}</span>
                  <span className="hidden sm:inline">{theme.name}</span>
                </button>
              );
            })}
          </div>
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
          <Board 
            cards={cards} 
            onCardClick={handleCardClick} 
            difficulty={difficulty} 
            themeItems={currentTheme.items} 
          />
        ) : (
          <div className="w-full aspect-square flex items-center justify-center text-slate-400 font-bold text-lg">
            Shuffling cards... 🃏
          </div>
        )}

        {/* Footer Instructions Panel */}
        <footer 
          className="w-full p-5 mt-4 text-center text-xs md:text-sm text-slate-500/90 font-bold nm-concave-sm backdrop-blur-md border border-white/20"
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <span className="text-indigo-600 font-extrabold uppercase tracking-widest text-[10px]">How to Play</span>
            <span>Click cards to flip and reveal graphics. Find matching pairs to complete the board.</span>
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
