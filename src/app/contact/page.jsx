"use client";

import {useRevealer} from "@/hooks/useReveal";

const Contact = () => {
  useRevealer();
  return (
    <>
    <div className="revealer"></div>
      <div className="contact">
        <div className="col">
          <h2>Contact Us</h2>
        </div>
        <div className="col">
          <div className="contact-copy">
            <h2>Email</h2>
            <h2>singhashirwad2003@gmail.com</h2>
          </div>
          <div className="contact-copy">
            <h2>Collaboration</h2>
            <h2>https://x.com/SinghAshir65848</h2>
          </div>
           <div className="contact-copy">
            <h2>Contact</h2>
            <h2>8421933430</h2>
          </div>
        </div>
        <div className="social">
          <a href="https://www.linkedin.com/in/ashirwad08singh/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://x.com/SinghAshir65848" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://github.com/Ethan4582" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://codeforces.com/profile/Blagosloveniye" target="_blank" rel="noopener noreferrer">
            Codeforces
          </a>
          <a href="https://leetcode.com/u/Ethan038/" target="_blank" rel="noopener noreferrer">
            LeetCode
          </a>
          <a href="https://www.codechef.com/users/ethant5698" target="_blank" rel="noopener noreferrer">
            CodeChef
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;
