'use client';

import React from 'react';
import { Card as CardType, Difficulty } from '../hooks/useMemoryGame';
import Card from './Card';

interface BoardProps {
  cards: CardType[];
  onCardClick: (index: number) => void;
  difficulty: Difficulty;
}

export const Board: React.FC<BoardProps> = ({ cards, onCardClick, difficulty }) => {
  const gridClass = difficulty === 'easy' 
    ? 'grid-cols-4 max-w-md' 
    : 'grid-cols-6 max-w-2xl';

  return (
    <div
      className={`grid ${gridClass} gap-2 sm:gap-3 md:gap-4 w-full mx-auto p-4 md:p-6 mb-8 transition-all duration-300`}
      style={{
        backgroundColor: '#eef2f7',
        boxShadow: '8px 8px 20px #d1d9e6, -8px -8px 20px #ffffff',
        borderRadius: '2rem',
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          value={card.value}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
