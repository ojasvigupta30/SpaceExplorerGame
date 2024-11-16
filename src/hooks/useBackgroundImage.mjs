// hooks/useBackgroundImage.js
import { useState, useEffect } from 'react';



const useBackgroundImage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const apiKey = import.meta.env.VITE_apiKey;
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        const data = await response.json();
        if (data && data.url) {
          console.log('Background Image URL:', data.url); // Debugging: Check the URL
          setBackgroundImage(data.url);
        }
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchBackgroundImage();
  }, []);

  return backgroundImage;
};

export default useBackgroundImage;
