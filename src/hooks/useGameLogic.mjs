import { useState, useEffect } from 'react';

const useGameLogic = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 550 });
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);

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

  // Spawn new enemies
  const spawnEnemy = () => {
    const newEnemy = { x: Math.random() * 770, y: 0, speed: 2 + Math.random() * 2 };
    setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
  };

  // Update enemy positions
  const updateEnemies = () => {
    setEnemies((prevEnemies) =>
      prevEnemies
        .map((enemy) => ({ ...enemy, y: enemy.y + enemy.speed }))
        .filter((enemy) => enemy.y < 600)
    );
  };

  // Check for collisions between bullets and enemies
  const checkCollisions = () => {
    let updatedEnemies = [...enemies];
    let updatedBullets = [...bullets];

    bullets.forEach((bullet, bulletIndex) => {
      enemies.forEach((enemy, enemyIndex) => {
        if (
          bullet.x > enemy.x &&
          bullet.x < enemy.x + 30 &&
          bullet.y > enemy.y &&
          bullet.y < enemy.y + 30
        ) {
          // Collision detected
          updatedEnemies.splice(enemyIndex, 1); // Remove enemy
          updatedBullets.splice(bulletIndex, 1); // Remove bullet
          setScore((prevScore) => prevScore + 1); // Increase score
        }
      });
    });

    setEnemies(updatedEnemies);
    setBullets(updatedBullets);
  };

  // useEffect to handle player movement
  useEffect(() => {
    window.addEventListener('keydown', handlePlayerMovement);
    return () => window.removeEventListener('keydown', handlePlayerMovement);
  }, []);

  // useEffect to update bullets
  useEffect(() => {
    const interval = setInterval(() => {
      updateBullets();
      checkCollisions();
    }, 50);
    return () => clearInterval(interval);
  }, [bullets, enemies]);

  // useEffect to spawn enemies and update their positions
  useEffect(() => {
    const enemyInterval = setInterval(spawnEnemy, 2000);
    const updateInterval = setInterval(updateEnemies, 50);
    return () => {
      clearInterval(enemyInterval);
      clearInterval(updateInterval);
    };
  }, []);

  return { playerPosition, bullets, enemies, shootBullet, score };
};

export default useGameLogic;
