import React, { useEffect, useRef } from 'react';
import useGameLogic from '../hooks/useGameLogic';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const { playerPosition, bullets, enemies, shootBullet, score } = useGameLogic();

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
      console.log("Enemies drawn on canvas:", enemies); // Debug: Check if enemies are drawn
    };

    draw(); // Initial draw

    // Redraw when playerPosition, bullets, or enemies change
  }, [playerPosition, bullets, enemies]);

  // Listen for spacebar to shoot
  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      shootBullet();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shootBullet]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
      <div className="hud">
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default GameCanvas;
