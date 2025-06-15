"use client";

import {useRevealer} from "@/hooks/useReveal";

const Work = () => {
  useRevealer(); // This hook triggers the reveal animation on page load
  return (
    <>
    <div className="revealer"></div>
      <div className="work">
        <h1>selected work</h1>

        <div className="projects">
          <img src="/image1.png" alt="" />
          <img src="/image2.png" alt="" />
          <img src="/image3.png" alt="" />
          <img src="/image4.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Work;
