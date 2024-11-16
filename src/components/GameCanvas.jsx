import React, { useEffect, useRef } from 'react';
import useGameLogic from '../hooks/useGameLogic';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const { playerPosition } = useGameLogic();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the player
    const drawPlayer = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      context.fillStyle = 'white';
      context.fillRect(playerPosition.x, playerPosition.y, 30, 30); // Draw player
    };

    drawPlayer(); // Draw the player initially

    // Redraw the player when playerPosition changes
  }, [playerPosition]);

  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};

export default GameCanvas;
