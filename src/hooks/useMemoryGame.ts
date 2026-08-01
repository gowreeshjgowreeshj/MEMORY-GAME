'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GAME_THEMES, Theme } from '../utils/themes';

export interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_CONFIG = {
  easy: { cardsCount: 16, pairsCount: 8 },
  medium: { cardsCount: 36, pairsCount: 18 },
  hard: { cardsCount: 48, pairsCount: 24 },
};

// Fisher-Yates shuffle algorithm
const shuffle = (array: number[]): number[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateBoard = (difficulty: Difficulty): Card[] => {
  const { pairsCount } = DIFFICULTY_CONFIG[difficulty];
  const numbers: number[] = [];
  for (let i = 1; i <= pairsCount; i++) {
    numbers.push(i, i);
  }
  const shuffledNumbers = shuffle(numbers);
  return shuffledNumbers.map((val, index) => ({
    id: index,
    value: val,
    isFlipped: false,
    isMatched: false,
  }));
};

export const useMemoryGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [themeId, setThemeId] = useState<string>('animals');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Keep track of the active timer to clear it cleanly
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize and regenerate board whenever difficulty changes
  useEffect(() => {
    setCards(generateBoard(difficulty));
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    if (isGameStarted && !isWon) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isGameStarted, isWon]);

  // Reset Game
  const resetGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCards(generateBoard(difficulty));
    setFlippedIndices([]);
    setMoves(0);
    setIsGameStarted(false);
    setElapsedTime(0);
    setIsProcessing(false);
    setIsWon(false);
  }, [difficulty]);

  // Change Difficulty (resets all stats)
  const changeDifficulty = useCallback((newDifficulty: Difficulty) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDifficulty(newDifficulty);
    setFlippedIndices([]);
    setMoves(0);
    setIsGameStarted(false);
    setElapsedTime(0);
    setIsProcessing(false);
    setIsWon(false);
  }, []);

  // Card click handler
  const handleCardClick = useCallback((index: number) => {
    // Prevent interaction under lock conditions
    if (isProcessing || isWon) return;
    
    const clickedCard = cards[index];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    if (flippedIndices.includes(index) || flippedIndices.length >= 2) return;

    // Start timer on first card flip
    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    // Flip the selected card
    const updatedCards = [...cards];
    updatedCards[index] = { ...clickedCard, isFlipped: true };
    setCards(updatedCards);

    const nextFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(nextFlippedIndices);

    // If this is the second card being flipped
    if (nextFlippedIndices.length === 2) {
      const [firstIdx, secondIdx] = nextFlippedIndices;
      setMoves((prev) => prev + 1);

      // Match check
      if (cards[firstIdx].value === clickedCard.value) {
        // MATCH FOUND
        setCards((prevCards) => {
          const matchingCards = [...prevCards];
          matchingCards[firstIdx] = { ...matchingCards[firstIdx], isMatched: true };
          matchingCards[secondIdx] = { ...matchingCards[secondIdx], isMatched: true };
          
          // Check for victory
          const allMatched = matchingCards.every((card) => card.isMatched);
          if (allMatched) {
            setIsWon(true);
            setIsGameStarted(false);
          }
          return matchingCards;
        });
        setFlippedIndices([]);
      } else {
        // MISMATCH
        setIsProcessing(true);
        setTimeout(() => {
          setCards((prevCards) => {
            const resetCards = [...prevCards];
            resetCards[firstIdx] = { ...resetCards[firstIdx], isFlipped: false };
            resetCards[secondIdx] = { ...resetCards[secondIdx], isFlipped: false };
            return resetCards;
          });
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 1000); // 1 second display before flipping back
      }
    }
  }, [cards, flippedIndices, isGameStarted, isProcessing, isWon]);

  const currentTheme = GAME_THEMES.find((t) => t.id === themeId) || GAME_THEMES[0];

  return {
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
  };
};
