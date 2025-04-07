import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styling/landing.css';
import { gsap } from 'gsap';

const LandingPage = () => {
  const wordRefs = useRef([]);

  useEffect(() => {
    // Animate page title and subtitle
    gsap.from('.landing-title', { opacity: 0, y: -50, duration: 1 });
    gsap.from('.landing-subtitle', { opacity: 0, y: 30, delay: 0.5, duration: 1 });
    gsap.from('.btn-group button', {
      opacity: 0,
      scale: 0.9,
      stagger: 0.2,
      delay: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
    });

    // Animate floating words after a small delay to ensure DOM is ready
    setTimeout(() => {
      wordRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-20, 20)',
          x: 'random(-30, 30)',
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });
    }, 100);
  }, []);

  const floatingWords = ['Learn', 'Grow', 'Results', 'Future', 'Success'];

  return (
    <div className="landing-container">
      <div className="floating-words">
        {floatingWords.map((word, index) => (
          <span
            key={index}
            className="floating-word"
            ref={(el) => (wordRefs.current[index] = el)}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="overlay">
        <h1 className="landing-title">Student Result Management System</h1>
        <p className="landing-subtitle">Manage results efficiently and effortlessly</p>
        <div className="btn-group">
          <Link to="/home" className="btn btn-primary">Admin Login</Link>
          <Link to="#" className="btn btn-outline-light">Student Login</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


