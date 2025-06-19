
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// "use client";

// import {useRevealer} from "@/hooks/useReveal";

// const Studio = () => {
//   return (
//     useRevealer(),
//     <>
//     <div className="revealer"></div>
//       <div className="studio">
//         <div className="col">
//           <h2>Our Story</h2>
//         </div>
//         <div className="col">
//           <h2>
//             At Nuvoro, we believe creativity isn't just a skill, a mindset.
//             Born from a passion for bold ideas and beautifully crafted
//             storytelling, we're a collective of designers, strategists, and
//             dreamers who thrive at the intersection of art and innovation.
//             Today, we collaborate with visionary clients around the world to
//             shape identities.
//           </h2>
//           <div className="about-img">
//             <img src="/studio.jpg" alt="" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


// export default Studio;







const RedirectToHome = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
};

export default RedirectToHome;