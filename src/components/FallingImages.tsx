
import { useEffect, useCallback } from 'react';

const images = [
  '/lovable-uploads/a0921049-6d45-4fce-a4b5-d9f659c0b0bc.png',
  '/lovable-uploads/22743658-2a24-490f-ae2a-59890d7638ec.png',
  '/lovable-uploads/6e3c1677-3275-46d4-81fa-55ada64eeb18.png',
  '/lovable-uploads/9a84e2cc-a098-4b3a-bbcb-ab5f35e0883d.png',
  '/lovable-uploads/58d06192-53ee-46b2-8026-58484b822377.png',
  '/lovable-uploads/69dd3a3a-ec95-46cb-804d-656890f62e4e.png'
];

const FallingImages = () => {
  const createImage = useCallback(() => {
    // Create multiple images at once for higher density
    for (let i = 0; i < 3; i++) {
      const img = document.createElement('img');
      img.src = images[Math.floor(Math.random() * images.length)];
      img.className = 'floating-image';
      img.style.setProperty('--fall-duration', `${3 + Math.random() * 4}s`);
      img.style.setProperty('--rotation', `${Math.random() * 360}deg`);
      img.style.left = `${Math.random() * window.innerWidth}px`;
      img.style.width = '48px';
      img.style.height = '48px';
      
      document.body.appendChild(img);

      img.addEventListener('animationend', () => {
        img.remove();
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(createImage, 1000); // Reduced interval to 1 second
    return () => clearInterval(interval);
  }, [createImage]);

  return null;
};

export default FallingImages;
