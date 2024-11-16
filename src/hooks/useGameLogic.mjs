import { useState, useEffect } from 'react';

const useGameLogic = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 550 });

  // Handle player movement
  const handlePlayerMovement = (event) => {
    if (event.key === 'ArrowLeft' && playerPosition.x > 0) {
      setPlayerPosition((prev) => ({ ...prev, x: prev.x - 10 }));
    } else if (event.key === 'ArrowRight' && playerPosition.x < 770) {
      setPlayerPosition((prev) => ({ ...prev, x: prev.x + 10 }));
    }
  };

  // useEffect to handle player movement
  useEffect(() => {
    window.addEventListener('keydown', handlePlayerMovement);
    return () => window.removeEventListener('keydown', handlePlayerMovement);
  }, [playerPosition]);

  return { playerPosition };
};

export default useGameLogic;
