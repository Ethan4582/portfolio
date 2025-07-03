"use client";
import Link from "next/link";
import {useTransitionRouter} from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; // Add these imports

const Nav = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  
  // Add state to track nav visibility
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Control navbar visibility based on scroll direction
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Hide nav when scrolling down & show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) { 
        setVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  function triggerPageTransition() {
    document.documentElement.animate(
      [
        {
          clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)"
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
        }
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.9, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  const handleNaviagtion =(path)=>(e) => {
    if(path=== pathname) {
      e.preventDefault();
      return;
    }

    router.push(path, {
      onTransitionStart: triggerPageTransition,
    });
  }

  return (
    <div className={`nav ${visible ? "" : "nav-hidden"}`}>
      <div className="col">
        <div className="nav-logo">
          <Link href="/" onClick={handleNaviagtion("/")}>  <img src="/logo2.png" alt="" /></Link>
        </div>
      </div>
      <div className="col">
        <div className="nav-items">
          <div className="nav-item">
            <Link href="/work" onClick={handleNaviagtion("/work")}>work</Link>
          </div>
          <div className="nav-item">
            <Link href="/contact" onClick={handleNaviagtion("/contact")}>contact</Link>
          </div>
        </div>
        <div className="nav-container">
          <div className="nav-item">
            <a
              href="https://drive.google.com/file/d/1zBjZHEEnCsc_FOAgTyma9k1ptTdaq9SX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
          <div className="nav-item" onClick={handleNaviagtion("/certification")}>
            <Link href="/certification">certification</Link>
          </div>
        </div>
        <div className="nav-copy">
          <p> Mumbai, India  </p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
