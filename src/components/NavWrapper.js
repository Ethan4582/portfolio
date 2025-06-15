"use client";
import { useEffect, useState } from "react";
import Nav from "./Nav";

export default function NavWrapper() {
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return showNav ? <Nav /> : null;
}