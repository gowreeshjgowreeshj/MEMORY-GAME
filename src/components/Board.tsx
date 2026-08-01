'use client';

import React from 'react';
import { Card as CardType, Difficulty } from '../hooks/useMemoryGame';
import Card from './Card';

interface BoardProps {
  cards: CardType[];
  onCardClick: (index: number) => void;
  difficulty: Difficulty;
  themeItems: string[];
}

export const Board: React.FC<BoardProps> = ({
  cards,
  onCardClick,
  difficulty,
  themeItems,
}) => {
  const gridClass = difficulty === 'easy' 
    ? 'grid-cols-4 max-w-md' 
    : 'grid-cols-6 max-w-2xl';

  return (
    <div
      className={`grid ${gridClass} gap-2 sm:gap-3 md:gap-4 w-full mx-auto p-4 md:p-6 mb-8 transition-all duration-300 nm-flat`}
    >
      {cards.map((card, index) => {
        // Map card value (1-indexed) to corresponding emoji/symbol in the active theme
        const graphic = themeItems[card.value - 1] || String(card.value);
        return (
          <Card
            key={card.id}
            value={card.value}
            graphic={graphic}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => onCardClick(index)}
          />
        );
      })}
    </div>
  );
};

export default Board;
