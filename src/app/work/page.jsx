"use client";

import { useEffect, useRef } from "react";
import { useRevealer } from "@/hooks/useReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import "./work.css";

const Work = () => {
  const previewImgRef = useRef(null);
  useRevealer();
  
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 750);
    });
    gsap.ticker.lagSmoothing(0);
    
    // Split text for project numbers
    function splitTextIntoSpans() {
      const elements = document.querySelectorAll(".mask h1");
      elements.forEach((element) => {
        const [firstDigit, secondDigit] = element.innerText;
        element.innerHTML = `
          <div class="digit-wrapper">
            <span class="first">${firstDigit}</span>
            <span class="second">${secondDigit}</span>
          </div>
        `;
      });
    }
    
    // Progress bar animation
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(".progress-bar", {
          scaleY: self.progress,
        });
      },
    });
    
    // Project name indicator animation
    const indicator = document.querySelector(".indicator");
    const indicatorStep = 18;
    const names = gsap.utils.toArray(".name");
    gsap.set(".indicator", { top: "0px" });
    
    // Image preview functionality
    const previewImg = previewImgRef.current;
    const imgElements = document.querySelectorAll(".img img");
    
    imgElements.forEach((img) => {  
      ScrollTrigger.create({  
        trigger: img,  
        start: "top 50%",  
        end: "bottom 50%",  
        onEnter: () => {
          previewImg.src = img.src;
        },
        onEnterBack: () => {
          previewImg.src = img.src;
        }
      });  
    });
    
    // Project animations
    let activeIndex = -1;
    let scrollVelocity = 0;
    let lastScrollTop = 0;
    
    const projects = gsap.utils.toArray(".project");
    
    // Project name indicator updates
    projects.forEach((project, index) => {
      ScrollTrigger.create({
        trigger: project,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          // Update indicator position
          gsap.to(indicator, {
            top: index * indicatorStep + "px",
            duration: 0.3,
            ease: "power2.out",
          });
          // Update active name
          names.forEach((name, i) => {
            name.classList.toggle("active", i === index);
          });
        },
        onLeaveBack: () => {
          // Update indicator position
          gsap.to(indicator, {
            top: (index - 1) * indicatorStep + "px",
            duration: 0.3,
            ease: "power2.out",
          });
          
          names.forEach((name, i) => {
            name.classList.toggle("active", i === index - 1);
          });
        }
      });
    });
    
    // Project number animations
    projects.forEach((project, i) => {
      const mask = project.querySelector(".mask");
      const digitWrapper = project.querySelector(".digit-wrapper");
      const firstDigit = project.querySelector(".first");
      const secondDigit = project.querySelector(".second");
      
      if (!mask || !digitWrapper || !firstDigit || !secondDigit) return;
      
      gsap.set([mask, digitWrapper, firstDigit, secondDigit], { y: 0 });
      gsap.set(mask, {
        position: "absolute",
        top: 0,
      });
      
      ScrollTrigger.create({
        trigger: project,
        start: "top bottom",
        end: "bottom top",
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          const projectRect = project.getBoundingClientRect();
          const windowCenter = window.innerHeight / 2;
          const nextProject = projects[i + 1];
          const velocityAdjustment = Math.min(scrollVelocity * 0.1, 100);
          const pushPoint = window.innerHeight * (0.85 + velocityAdjustment / window.innerHeight);
          
          if (projectRect.top <= windowCenter) {
            if (!mask.isFixed) {
              mask.isFixed = true;
              gsap.to(mask, {
                position: "fixed",
                top: "50vh",
              });
            }
            
            if (nextProject) {
              const nextRect = nextProject.getBoundingClientRect();
              if (nextRect.top <= pushPoint && activeIndex !== i + 1) {
                gsap.killTweensOf([mask, digitWrapper, firstDigit, secondDigit]);
                
                activeIndex = i + 1;
                gsap.to(mask, {
                  y: -80,
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: true,
                });
                
                // Get next project's elements
                const nextMask = nextProject.querySelector(".mask");
                const nextDigitWrapper = nextProject.querySelector(".digit-wrapper");
                const nextFirstDigit = nextProject.querySelector(".first");
                const nextSecondDigit = nextProject.querySelector(".second");
                
                if (nextMask && nextDigitWrapper && nextFirstDigit && nextSecondDigit) {
                  // Set initial positions for next project elements
                  gsap.set([nextMask, nextDigitWrapper, nextFirstDigit, nextSecondDigit], { y: 80 });
                  
                  // Animate current project elements up
                  gsap.to(digitWrapper, {
                    y: -80,
                    duration: 0.5,
                    delay: 0.1,
                    ease: "power2.out",
                    overwrite: true,
                  });
                  
                  gsap.to([firstDigit, secondDigit], {
                    y: -80,
                    duration: 0.5,
                    delay: 0.2,
                    ease: "power2.out",
                    overwrite: true,
                  });
                  
                  // Animate next project elements into position
                  gsap.to(nextMask, {
                    y: 0,
                    duration: 0.3,
                    delay: 0.4,
                    ease: "power2.out",
                    overwrite: true,
                  });
                  
                  gsap.to(nextDigitWrapper, {
                    y: 0,
                    duration: 0.5,
                    delay: 0.5,
                    ease: "power2.out",
                    overwrite: true,
                  });
                  
                  gsap.to([nextFirstDigit, nextSecondDigit], {
                    y: 0,
                    duration: 0.5,
                    delay: 0.6,
                    ease: "power2.out",
                    overwrite: true,
                  });
                }
              }
            }
          } else {
            mask.isFixed = false;
            gsap.set(mask, {
              position: "absolute",
              top: 0,
            });
          }
          
          if (self.direction === -1 && projectRect.top > windowCenter) {
            if (mask.isFixed) {
              mask.isFixed = false;
              gsap.set(mask, {
                position: "absolute",
                top: 0,
              });
            }
            
            if (i > 0 && activeIndex === i) {
              const prevProject = projects[i - 1];
              if (prevProject) {
                const prevMask = prevProject.querySelector(".mask");
                const prevWrapper = prevProject.querySelector(".digit-wrapper");
                const prevFirst = prevProject.querySelector(".first");
                const prevSecond = prevProject.querySelector(".second");
                
                if (prevMask && prevWrapper && prevFirst && prevSecond) {
                  gsap.killTweensOf([prevMask, prevWrapper, prevFirst, prevSecond]);
                  
                  activeIndex = i - 1;
                  gsap.to([prevMask, prevWrapper], {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: true,
                  });
                  
                  gsap.to(prevFirst, {
                    y: 0,
                    duration: 0.75,
                    ease: "power2.out",
                    overwrite: true,
                  });
                  
                  gsap.to(prevSecond, {
                    y: 0,
                    duration: 0.75,
                    delay: 0.1,
                    ease: "power2.out",
                    overwrite: true,
                  });
                }
              }
            }
          }
        },
        onEnter: () => {
          if (i === 0) {
            activeIndex = 0;
          }
        },
      });
    });
    
    // Track scroll velocity for animations
    window.addEventListener("scroll", () => {
      const st = window.pageYOffset;
      scrollVelocity = Math.abs(st - lastScrollTop);
      lastScrollTop = st;
    }, { passive: true });
    
    // Run initial setup
    splitTextIntoSpans();
    
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Project data
  const projects = [
    { id: "01", name: "Dev Rooms", images: [1, 2, 3, 4, 5], link: "dev-finder-amber-chi.vercel.app/" },
    { id: "02", name: "Chess", images: [ 9, 10, 11, 12, 13], link: "https://chess-com-v8tt.onrender.com/" },
    { id: "03", name: "Streamerzz", images: [ 14, 16, 17, 18 , 19, 20], link: "https://streamerzz-indol.vercel.app/" },
    { id: "04", name: "Nike  Page ", images: [ 21, 22, 23, 24, 25], link: "https://github.com/Ethan4582/Nike_landing-Page" }
    // { id: "05", name: "Echo Labs", images: [25, 26, 27, 28, 29, 30], link: "https://example.com/echolabs" },
    // { id: "06", name: "Vesper", images: [31, 32, 33, 34, 35, 36], link: "https://example.com/vesper" },
    // { id: "07", name: "Axon", images: [37, 38, 39, 40, 41, 42], link: "https://example.com/axon" },
  ];

  return (
    <>
      <div className="revealer"></div>
      
      <div className="whitespace w-1"></div>
      
      <div className="gallery">
        {projects.map((project, index) => (
          <div className="project" key={project.id}>
            <div className="index">
              <div className="mask">
                <h1>{project.id}</h1>
              </div>
            </div>
            <div className="images">
              {project.images.map((imgNum) => (
                <div className="img" key={imgNum}>
                  <img src={`/project_img/img${imgNum}.png`} alt={`Project ${project.name} image ${imgNum}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="whitespace w-2"></div>
      
      <div className="project-names">
        <div className="indicator">
          <div className="symbol"></div>
        </div>
        {projects.map((project, index) => (
          <div className={`name ${index === 0 ? 'active' : ''}`} key={project.id}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <p>{project.name}</p>
            </a>
          </div>
        ))}
      </div>
      
      <div className="preview-img">
        <img ref={previewImgRef} src="/project_img/img1.png" alt="Preview" />
      </div>
      
      <div className="progress-bar"></div>
      
      <div className="footer"><p>Portfolio 2024</p></div>
    </>
  );
};

export default Work;