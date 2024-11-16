import { useState, useEffect } from 'react';

const useGameLogic = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 550 });
  const [bullets, setBullets] = useState([]);

  // Handle player movement
  const handlePlayerMovement = (event) => {
    if (event.key === 'ArrowLeft' && playerPosition.x > 0) {
      setPlayerPosition((prev) => ({ ...prev, x: prev.x - 10 }));
    } else if (event.key === 'ArrowRight' && playerPosition.x < 770) {
      setPlayerPosition((prev) => ({ ...prev, x: prev.x + 10 }));
    }
  };

  // Shoot a bullet
  const shootBullet = () => {
    const newBullet = { x: playerPosition.x + 12.5, y: playerPosition.y };
    setBullets((prevBullets) => [...prevBullets, newBullet]);
  };

  // Update bullet positions
  const updateBullets = () => {
    setBullets((prevBullets) =>
      prevBullets.map((bullet) => ({ ...bullet, y: bullet.y - 5 })).filter((bullet) => bullet.y > 0)
    );
  };

  // useEffect to handle player movement
  useEffect(() => {
    window.addEventListener('keydown', handlePlayerMovement);
    return () => window.removeEventListener('keydown', handlePlayerMovement);
  }, [playerPosition]);

  // useEffect to update bullets
  useEffect(() => {
    const interval = setInterval(updateBullets, 50);
    return () => clearInterval(interval);
  }, [bullets]);

  return { playerPosition, bullets, shootBullet };
};

export default useGameLogic;
