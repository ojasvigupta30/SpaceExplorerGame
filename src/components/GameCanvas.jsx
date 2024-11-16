import React, { useEffect, useRef } from 'react';
import useGameLogic from '../hooks/useGameLogic';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const {
    playerPosition,
    bullets,
    enemies,
    shootBullet,
    score,
    isGameOver,
    restartGame,
    backgroundImage,
    spaceship,
    alien,
  } = useGameLogic();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the game elements
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Draw spaceship
      context.drawImage(spaceship, playerPosition.x, playerPosition.y, 40, 40);

      // Draw bullets
      context.fillStyle = 'yellow';
      bullets.forEach((bullet) => {
        context.fillRect(bullet.x, bullet.y, 5, 10);
      });

      // Draw alien enemies
      enemies.forEach((enemy) => {
        context.drawImage(alien, enemy.x, enemy.y, 40, 40);
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
  }, [playerPosition, bullets, enemies, isGameOver, spaceship, alien]);

  // Listen for spacebar to shoot
  const handleKeyDown = (eve) => {
    if (eve.key === ' ' && !isGameOver) {
      shootBullet();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shootBullet, isGameOver]);

  return (
    <div
      className="game-container"
      style={{
        position: 'relative',
        width: '800px',
        height: '600px',
        border: '2px solid white',
        margin: '0 auto',
      }}
    >
      {/* Background Image with Reduced Opacity */}
      {backgroundImage && (
        <div
          className="background-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3, // Adjust opacity here
            zIndex: 0, // Keep it behind the game elements
          }}
        ></div>
      )}

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      ></canvas>

      {isGameOver && (
        <button
          onClick={restartGame}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#ff4757',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          Restart
        </button>
      )}

      <div
        className="score-container"
        style={{
          marginTop: '20px',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default GameCanvas;
