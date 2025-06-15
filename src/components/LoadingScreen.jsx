"use client";

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef();
  const counter3Ref = useRef();

  // Dynamically generate only the counter-3 sequence
  useEffect(() => {
    const counter3 = counter3Ref.current;
    if (!counter3) return;

    // Clear any existing digits
    counter3.innerHTML = '';
    
    // Append two full cycles of 0-9
    for (let cycle = 0; cycle < 2; cycle++) {
      for (let n = 0; n <= 9; n++) {
        const div = document.createElement('div');
        div.className = 'num';
        div.textContent = n;
        counter3.appendChild(div);
      }
    }
    // Final 0
    const finalZero = document.createElement('div');
    finalZero.className = 'num';
    finalZero.textContent = '0';
    counter3.appendChild(finalZero);
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Build a timeline for precise sequencing
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    // Counters
    const animate = (el, dur, offset = '+=0') => {
      const nums = el.querySelectorAll('.num');
      if (!nums.length) return;
      const h = nums[0].clientHeight;
      const dist = (nums.length - 1) * h;
      tl.to(el, { y: -dist, duration: dur }, offset);
    };

    // start counter1 at 4s, duration 2s
    animate(container.querySelector('.counter-1'), 2, 4);
    // counter2 immediately
    animate(container.querySelector('.counter-2'), 6, 0);
    // counter3
    animate(counter3Ref.current, 5, 0);

    // Digit lift at 6s
    tl.to('.digit', { top: '-150px', stagger: 0.25, duration: 1 }, 6);

    // Loader bars
    tl.from('.loader-1', { width: 0, duration: 6 }, 0)
      .from('.loader-2', { width: 0, duration: 2 }, 1.9)
      .to('.loader', { background: 'none', duration: 0.1 }, 6)
      .to('.loader-1', { rotate: 90, y: -50, duration: 0.5 }, 6)
      .to('.loader-2', { x: -75, y: 70, duration: 0.2 }, 6)
      .to('.loader', { scale: 40, duration: 1 }, 7)
      .to('.loader', { rotate: 45, x: 2000, y: 500, duration: 1 }, 7)
      // Final fade out after everything
      .to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        onComplete: onComplete,
      }, 8.5);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="loader">
        <div className="loader-1 bar" />
        <div className="loader-2 bar" />
      </div>

      <div className="counter">
        <div className="counter-1 digit">
          <div className="num">0</div>
          <div className="num num1offset1">1</div>
        </div>
        <div className="counter-2 digit">
          <div className="num">0</div>
          <div className="num num1offset2">1</div>
          {[2,3,4,5,6,7,8,9,0].map(n => (
            <div key={n} className="num">{n}</div>
          ))}
        </div>
        <div className="counter-3 digit" ref={counter3Ref} />
      </div>
    </div>
  );
};

export default LoadingScreen;
