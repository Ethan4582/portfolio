import Copy from "@/components/Copy";
import { ReactLenis } from "lenis/react";

const About = () => {
  return (
    <>
      <ReactLenis root>
        <div
          className="about-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <Copy delay={0.5}>
              <h1>About Me</h1>
            </Copy>

            <div className="about-content">
              <div className="about-text">
                <Copy delay={0.5}>
                  <p>
                    I’m Ashirwad Singh, an India-based developer passionate about creating immersive and functional digital experiences. I build solutions that are not only visually appealing but also performant and accessible.
                  </p>
                </Copy>
                <Copy delay={0.5}>
                  <p>
                    My approach combines technical precision with creative problem-solving, allowing me to deliver projects that exceed expectations and provide genuine value.
                  </p>
                </Copy>
              </div>
              <div className="about-skills">
                {/* Add skills here if needed, wrapped in <Copy> as well */}
              </div>
            </div>
          </div>
        </div>
      </ReactLenis>
    </>
  );
};

export default About;