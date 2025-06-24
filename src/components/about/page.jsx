



import { motion } from "framer-motion";

const About = () => {
  return (
  <>
       {/* About Section with scroll animation */}
      <motion.div 
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>I'm a passionate web developer specializing in creating immersive and functional digital experiences. With expertise in modern frontend frameworks and backend technologies, I build solutions that are not only visually appealing but also performant and accessible.</p>
              <p>My approach combines technical precision with creative problem-solving, allowing me to deliver projects that exceed expectations and provide genuine value.</p>
            </div>
            <div className="about-skills">
              <h3>Skills</h3>
              <ul>
                <li>React & Next.js</li>
                <li>GSAP & Framer Motion</li>
                <li>MongoDB</li>
                <li>Node.js</li>
                <li>Responsive Design</li>
                <li>API Development</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
  
  </>
  )
}

export default About


