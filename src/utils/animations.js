// src/utils/animations.js
import gsap from 'gsap';

export const animateTable = () => {
  gsap.from('.student-row', {
    duration: 0.6,
    opacity: 0,
    y: 30,
    stagger: 0.1,
    ease: 'power3.out',
  });

  gsap.utils.toArray('.table-cell').forEach((cell) => {
    cell.addEventListener('mouseenter', () => {
      gsap.to(cell, {
        scale: 1.1,
        color: '#4CAF50',
        textShadow: '0px 0px 8px rgba(76, 175, 80, 0.9)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    cell.addEventListener('mouseleave', () => {
      gsap.to(cell, {
        scale: 1,
        color: '#fff',
        textShadow: 'none',
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });
};
