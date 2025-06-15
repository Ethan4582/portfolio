// "use client";

// import {useRevealer} from "@/hooks/useReveal";

// export default function Home() {
//   useRevealer(); 
//   // This hook triggers the reveal animation on page load
//   return (
//     <>
//     <div className="revealer"></div>
//       <div className="home">
//         <div className="header">
//           <h1>Hi, I’m Ashirwad Singh — a [your profession, e.g., web developer, designer] based in Mumbai, India. I craft digital experiences with creativity and precision.</h1>
//         </div>

//         <div className="hero-img">
//           <img src="/hero.png" alt="" />
//         </div>
//       </div>
//     </>
//   );
// }



"use client";

import {useRevealer} from "@/hooks/useReveal";

export default function Home() {
  useRevealer(); 
  return (
    <>
      <div className="revealer"></div>
      <div className="home">
        <div className="header">
          <h1>Hi, I'm Ashirwad Singh a web developer based in Mumbai, India. I craft digital experiences with creativity and precision.</h1>
        </div>
      </div>
    </>
  );
}
