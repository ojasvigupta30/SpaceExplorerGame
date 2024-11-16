import React, { useEffect, useRef } from 'react';
import useGameLogic from '../hooks/useGameLogic';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const { playerPosition, bullets, shootBullet } = useGameLogic();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the player and bullets
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      context.fillStyle = 'white';
      context.fillRect(playerPosition.x, playerPosition.y, 30, 30); // Draw player

      // Draw bullets
      context.fillStyle = 'yellow';
      bullets.forEach((bullet) => {
        context.fillRect(bullet.x, bullet.y, 5, 10);
      });
    };

    draw(); // Initial draw

    // Redraw when playerPosition or bullets change
  }, [playerPosition, bullets]);

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

  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};

export default GameCanvas;
