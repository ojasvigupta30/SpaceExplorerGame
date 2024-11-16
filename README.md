# Space Explorer Shooting Game

Welcome to the **Space Explorer Shooting Game**! A thrilling, fast-paced, browser-based shooting game where you control a spaceship to fend off incoming alien enemies. Your mission is to survive as long as you can while scoring as many points as possible!

## Table of Contents

- [Overview](#overview)
- [Game Mechanics](#game-mechanics)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [How to Play](#how-to-play)
- [Features](#features)
- [Challenges Faced](#challenges-faced)
- [Future Enhancements](#future-enhancements)
- [Credits](#credits)

## Overview

This project is a space-themed shooting game built using React, JavaScript, and Canvas API. The game features an interactive canvas element where players can move their spaceship left and right, shoot bullets, and aim to destroy alien enemies. The game also pulls a background image from the NASA API to create an immersive space experience.

## Game Mechanics

- **Player Movement**: Use the left and right arrow keys to move your spaceship within the canvas boundaries.
- **Shooting**: Press the spacebar to shoot bullets and eliminate incoming aliens.
- **Enemy Waves**: Aliens spawn at random positions and move downwards. If an alien reaches the bottom, the game ends.
- **Scoring**: Earn points for each alien you destroy.
- **Game Over**: When an alien reaches the bottom of the screen, the game displays a "Game Over" message, and you can restart.

## Technologies Used

- **React**: Used for creating components and managing game state.
- **JavaScript**: Core game logic for player movement, bullet handling, and enemy behavior.
- **Canvas API**: For rendering the game elements (spaceship, bullets, and aliens) on the screen.
- **NASA API**: To fetch daily space images for a dynamic background.
- **Vite**: Used as the development and build tool for the project.
- **HTML & CSS**: Basic structure and styling for the game interface.


## How to Play

1. **Launch the Game**: Open the game in your browser by navigating to the local development server URL.
2. **Move Your Spaceship**: Use the left and right arrow keys to move your spaceship.
3. **Shoot Bullets**: Press the spacebar to shoot bullets at the incoming aliens.
4. **Score Points**: Destroy aliens to increase your score.
Game Over: If an alien reaches the bottom of the canvas, the game is over, and you can restart by clicking the Restart button.

## Features

- **Dynamic Background**: Space background fetched from the NASA API, making each session visually unique.
- **Smooth Player Controls**: Responsive spaceship movement with boundary checks.
- **Interactive Gameplay**: Shooting mechanics and enemy spawning for an engaging experience.
- **Score Tracking**: Real-time score display to keep players motivated.
- **Game Over State**: Clear indication when the game ends, with the option to restart.
- **Stylish UI**: Custom fonts and a vibrant design for a futuristic look.

## Live Demo

**[Space Shooter Explorer Game](https://space-shooter-explorer-game.onrender.com/)**


## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ojasvigupta30/SpaceExplorerGame


2. **Install Dependencies**:
   ```bash
   npm install

3. **Set Up API Key**:
   - Create an apiKey.mjs file in the hooks folder and add your NASA API key.
   ```bash
   export default 'YOUR_NASA_API_KEY';

4. **Start the Development Server**:
   ```bash
   npm run dev

## Challenges Faced

- **Image Loading**: Ensuring images (spaceship and alien) load correctly before rendering them.
- **Optimizing Performance**: Handling multiple intervals for updating bullets, enemies, and checking collisions efficiently.
- **NASA API Integration**: Managing async API calls and handling errors gracefully.
- **Collision Detection**: Developing a reliable method to detect collisions between bullets and aliens.


## Future Enhancements

- **Power-Ups**: Adding special power-ups for the player, such as rapid fire or shields.
- **Difficulty Levels**: Introducing progressive difficulty as the player's score increases.
- **Leaderboard**: Implementing a leaderboard to compare scores with other players.
- **Sound Effects**: Adding background music and sound effects for shooting and collisions.


## Credits

1. **Background Images**: Courtesy of NASA API.


