import React, { useEffect, useRef } from 'react';
import useGameLogic from '../hooks/useGameLogic';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const { playerPosition, bullets, enemies, shootBullet, score, isGameOver, restartGame } = useGameLogic();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the game elements
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Draw player
      context.fillStyle = 'white';
      context.fillRect(playerPosition.x, playerPosition.y, 30, 30);

      // Draw bullets
      context.fillStyle = 'yellow';
      bullets.forEach((bullet) => {
        context.fillRect(bullet.x, bullet.y, 5, 10);
      });

      // Draw enemies
      context.fillStyle = 'red';
      enemies.forEach((enemy) => {
        context.fillRect(enemy.x, enemy.y, 30, 30);
      });

      // Draw Game Over message
      if (isGameOver) {
        context.fillStyle = 'white';
        context.font = '48px Arial';
        context.fillText('Game Over', 300, 300);
      }
    };

    draw(); // Initial draw

    // Redraw when playerPosition, bullets, enemies, or isGameOver changes
  }, [playerPosition, bullets, enemies, isGameOver]);

  // Listen for spacebar to shoot
  const handleKeyDown = (event) => {
    if (event.key === ' ' && !isGameOver) {
      shootBullet();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shootBullet, isGameOver]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
      <div className="hud">
        <p>Score: {score}</p>
        {isGameOver && <button onClick={restartGame}>Restart</button>}
      </div>
    </div>
  );
};

export default GameCanvas;
