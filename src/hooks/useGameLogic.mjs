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
      prevBullets
        .map((bullet) => ({ ...bullet, y: bullet.y - 5 })) // Move bullets up
        .filter((bullet) => bullet.y > 0) // Keep bullets on screen
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
        .map((enemy) => ({ ...enemy, y: enemy.y + enemy.speed })) // Move enemies down
        .filter((enemy) => enemy.y < 600) // Keep enemies on screen
    );
  };

  // Check for collisions between bullets and enemies
  const checkCollisions = () => {
    let remainingEnemies = [...enemies];
    let remainingBullets = [...bullets];

    remainingBullets = remainingBullets.filter((bullet) => {
      let bulletHit = false;
      remainingEnemies = remainingEnemies.filter((enemy) => {
        const hit = bullet.x > enemy.x && bullet.x < enemy.x + 30 && bullet.y > enemy.y && bullet.y < enemy.y + 30;
        if (hit) {
          bulletHit = true;
          setScore((prevScore) => prevScore + 1); // Increase score
        }
        return !hit; // Remove enemy if hit
      });
      return !bulletHit; // Remove bullet if it hits an enemy
    });

    // Only update state after all calculations are done
    setEnemies(remainingEnemies);
    setBullets(remainingBullets);
  };

  // useEffect to handle player movement
  useEffect(() => {
    window.addEventListener('keydown', handlePlayerMovement);
    return () => window.removeEventListener('keydown', handlePlayerMovement);
  }, []);

  // useEffect to update bullets and check collisions
  useEffect(() => {
    const bulletInterval = setInterval(() => {
      updateBullets();
    }, 50);
    return () => clearInterval(bulletInterval);
  }, []); // Bullet movement is independent

  // useEffect to spawn and update enemies
  useEffect(() => {
    const enemySpawnInterval = setInterval(spawnEnemy, 2000);
    const enemyUpdateInterval = setInterval(updateEnemies, 50);
    return () => {
      clearInterval(enemySpawnInterval);
      clearInterval(enemyUpdateInterval);
    };
  }, []);

  // useEffect to check collisions separately
  useEffect(() => {
    const collisionInterval = setInterval(() => {
      checkCollisions();
    }, 50);
    return () => clearInterval(collisionInterval);
  }, [bullets, enemies]);

  return { playerPosition, bullets, enemies, shootBullet, score };
};

export default useGameLogic;
