"use client";

import { useEffect, useRef, useState } from "react";
import "./footer.css";

const Explosion = () => {
  const explosionContainerRef = useRef(null);
  const footerRef = useRef(null);
  const [explosionTriggered, setExplosionTriggered] = useState(false);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);
  const lastTriggerRef = useRef(0);

  const config = {
    gravity: 0.25,
    friction: 0.99,
    imageSize: 180,
    horizontalForce: 30,
    verticalForce: 22,
    rotationSpeed: 12,
    resetDelay: 500,
    cooldown: 3000, // Prevent rapid retriggering
  };

  const imageParticleCount = 20;
  const imagePaths = Array.from(
    { length: imageParticleCount },
    (_, i) => `/project_img/img${i + 1}.png`
  );

  class Particle {
    constructor(element) {
      this.element = element;
      this.x = 0;
      this.y = 0;
      this.vx = (Math.random() - 0.5) * config.horizontalForce;
      this.vy = -config.verticalForce - Math.random() * 10;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
      this.active = true;
    }
    
    update() {
      if (!this.active) return;
      
      this.vy += config.gravity;
      this.vx *= config.friction;
      this.vy *= config.friction;
      this.rotationSpeed *= config.friction;

      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      if (this.element) {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
      }
      
      // Deactivate particles that go too far down
      if (this.y > window.innerHeight * 0.8) {
        this.active = false;
      }
    }
  }

  const createParticles = () => {
    if (!explosionContainerRef.current) return;

    explosionContainerRef.current.innerHTML = "";
    particlesRef.current = [];

    imagePaths.forEach((path) => {
      const particle = document.createElement("img");
      particle.src = path;
      particle.classList.add("explosion-particle-img");
      particle.style.width = `${config.imageSize}px`;
      particle.style.height = "auto";
      particle.style.position = "absolute";
      particle.style.bottom = "0";
      particle.style.left = "50%";
      particle.style.transform = "translateX(-50%)";
      explosionContainerRef.current.appendChild(particle);
      
      particlesRef.current.push(new Particle(particle));
    });
  };

  const explode = () => {
    if (explosionTriggered) return;
    
    // Prevent too frequent explosions
    const now = Date.now();
    if (now - lastTriggerRef.current < config.cooldown) return;
    lastTriggerRef.current = now;
    
    setExplosionTriggered(true);
    console.log("💥 Explosion triggered!");

    createParticles();

    const animate = () => {
      let activeParticles = 0;
      
      particlesRef.current.forEach((particle) => {
        particle.update();
        if (particle.active) activeParticles++;
      });

      if (activeParticles > 0) {
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setExplosionTriggered(false);
        }, config.resetDelay);
      }
    };

    // Cancel any existing animation
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    
    animationIdRef.current = requestAnimationFrame(animate);
  };

  const checkFooterPosition = () => {
    if (!footerRef.current) return;

    const footerRect = footerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Trigger when footer is at least 20% visible
    if (!explosionTriggered && footerRect.top < viewportHeight * 0.8) {
      explode();
    }
  };

  useEffect(() => {
    // Preload images
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });

    // Set footer reference
    footerRef.current = explosionContainerRef.current?.closest('footer');
    console.log("Footer element found:", footerRef.current);

    createParticles();

    let checkTimeout;
    const handleScroll = () => {
      clearTimeout(checkTimeout);
      checkTimeout = setTimeout(checkFooterPosition, 50);
    };

    window.addEventListener("scroll", handleScroll);
    checkFooterPosition(); // Initial check

    const handleResize = () => {
      setExplosionTriggered(false);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(checkTimeout);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <div className="explosion-container" ref={explosionContainerRef}></div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>Ashirwad Singh</h3>
          <p>Web Developer</p>
        </div>
        <div className="footer-right">
          <div className="social-links">
            <a
              href="https://github.com/Ethan4582"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ashirwad08singh"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <p className="copyright">&copy; 2024 • All Rights Reserved</p>
        </div>
      </div>
      <Explosion />
    </footer>
  );
};

export default Footer;