import { useState, useEffect } from 'react';
import spaceshipImage from '../assets/spaceship.png'; // Path to spaceship image
import alienImage from '../assets/alien.gif'; // Path to alien image
import useBackgroundImage from './useBackgroundImage'; // Import the background from api hook

const useGameLogic = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 550 });
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const backgroundImage = useBackgroundImage(); // Use the custom hook

  // Load images for the spaceship and alien
  const spaceship = new Image();
  spaceship.src = spaceshipImage;

  const alien = new Image();
  alien.src = alienImage;

  // Handle player movement with boundary checks
  const handlePlayerMovement = (eve) => {
    if (eve.key === 'ArrowLeft' && playerPosition.x > 0) {
      setPlayerPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 10) }));
    } else if (eve.key === 'ArrowRight' && playerPosition.x < 770) {
      setPlayerPosition((prev) => ({ ...prev, x: Math.min(770, prev.x + 10) }));
    }
  };

  // Shoot a bullet
  const shootBullet = () => {
    if (!isGameOver) {
      const newBullet = { x: playerPosition.x + 17.5, y: playerPosition.y };
      setBullets((prevBullets) => [...prevBullets, newBullet]);
    }
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
    if (!isGameOver) {
      const newEnemy = { x: Math.random() * 770, y: 0, speed: 2 + Math.random() * 2 };
      setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
    }
  };

  // Update enemy positions and check for game over
  const updateEnemies = () => {
    setEnemies((prevEnemies) => {
      const updatedEnemies = prevEnemies.map((enemy) => ({
        ...enemy,
        y: enemy.y + enemy.speed,
      }));

      // Check if any enemy reaches the bottom
      const gameOver = updatedEnemies.some((enemy) => enemy.y >= 550);
      if (gameOver) {
        setIsGameOver(true);
      }

      return updatedEnemies.filter((enemy) => enemy.y < 600); // Keep enemies on screen
    });
  };

  // Check for collisions between bullets and enemies
  const checkCollisions = () => {
    let remainingEnemies = [...enemies];
    let remainingBullets = [...bullets];

    remainingBullets = remainingBullets.filter((bullet) => {
      let bulletHit = false;
      remainingEnemies = remainingEnemies.filter((enemy) => {
        const hit =
          bullet.x > enemy.x &&
          bullet.x < enemy.x + 40 &&
          bullet.y > enemy.y &&
          bullet.y < enemy.y + 40;
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

  // Restart the game
  const restartGame = () => {
    setPlayerPosition({ x: 400, y: 550 });
    setBullets([]);
    setEnemies([]);
    setScore(0);
    setIsGameOver(false);
  };

  // useEffect to handle player movement
  useEffect(() => {
    window.addEventListener('keydown', handlePlayerMovement);
    return () => window.removeEventListener('keydown', handlePlayerMovement);
  }, []);

  // useEffect to update bullets and check collisions
  useEffect(() => {
    if (!isGameOver) {
      const bulletInterval = setInterval(updateBullets, 50);
      return () => clearInterval(bulletInterval);
    }
  }, [isGameOver]);

  // useEffect to spawn and update enemies
  useEffect(() => {
    if (!isGameOver) {
      const enemySpawnInterval = setInterval(spawnEnemy, 2000);
      const enemyUpdateInterval = setInterval(updateEnemies, 50);
      return () => {
        clearInterval(enemySpawnInterval);
        clearInterval(enemyUpdateInterval);
      };
    }
  }, [isGameOver]);

  // useEffect to check collisions separately
  useEffect(() => {
    if (!isGameOver) {
      const collisionInterval = setInterval(checkCollisions, 50);
      return () => clearInterval(collisionInterval);
    }
  }, [bullets, enemies, isGameOver]);

  return {
    playerPosition,
    bullets,
    enemies,
    shootBullet,
    score,
    isGameOver,
    restartGame,
    spaceship,
    alien,
    backgroundImage,
  };
};

export default useGameLogic;
