"use client";

import { useState, useEffect } from "react"; // Add useEffect
import About from "@/components/about/page";
import ProjectHome from "@/components/project/projectindex";
import Modal from "@/components/modal";
import { useRevealer } from "@/hooks/useReveal";
import { motion } from "framer-motion";
import Footer from "@/components/footer/page";
import Copy from "@/components/Copy";
import { ReactLenis } from "lenis/react";
import Image from "next/image";

import { TextAnimate } from "@/components/header-text";
// Project data
const projects = [
	{
		title: "Dev Finder ",
		src: "/project_img/img2.png",
		color: "#1A1A1A",
		url: "https://dev-finder-amber-chi.vercel.app/",
	},
	{
		title: "Chess",
		src: "/project_img/img9.png",
		color: "#1A1A1A",
		url: "https://chess-com-v8tt.onrender.com/",
	},
	{
		title: "Streamerzz",
		src: "/project_img/img16.png",
		color: "#1A1A1A",
		url: "https://streamerzz-indol.vercel.app/",
	},
	{
		title: "Nike Page",
		src: "/project_img/img21.png",
		color: "#1A1A1A",
		url: "https://github.com/Ethan4582/Nike_landing-Page",
	},
];

export default function Home() {
	const [modal, setModal] = useState({ active: false, index: 0 });
	const [animationReady, setAnimationReady] = useState(false); // Add this state
	useRevealer();

	// Add this effect to delay the animation until after revealer effect
	useEffect(() => {
		// Adjust this timing to match your revealer transition duration
		const timer = setTimeout(() => {
			setAnimationReady(true);
		}, 1000); // Adjust timing based on your revealer animation duration

		return () => clearTimeout(timer);
	}, []);

	return (
		<ReactLenis root>
			<div className="revealer"></div>

			 <div className="home-about">
   <div className="home-about-container">
      <div className="home-about-image">
         <Image 
            src="/p1.png" // Replace with your image path
            alt="Ashirwad Singh"
            width={500}
            height={500}
            className="profile-image"
            priority
         />
      </div>
      <div className="home-about-text">
        <TextAnimate
   as="h1"
   by="word"
   animation="blurInUp"
   delay={0.4}
   duration={0.6}
   startOnView={animationReady}
   once={true}
>
   Hi, I&apos;m Ashirwad — I build fast, functional, and user-focused web
   experiences.
</TextAnimate>
      </div>
   </div>
</div>

			<Copy delay={0.5}>
				<About />
			</Copy>

			{/* Projects Section using the ProjectHome component */}
			<motion.div
				className="projects-section"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, amount: 0.1 }}
				transition={{ duration: 0.6 }}
			>
				<div className="container">
					<Copy delay={0.5}>
						<h2>Selected Work</h2>
					</Copy>
					<div className="projects-container">
						{projects.map((project, index) => (
							<Copy delay={0.5} key={index}>
								<ProjectHome
									index={index}
									title={project.title}
									setModal={setModal}
									url={project.url}
									description="Deployed"
								/>
							</Copy>
						))}
					</div>
				</div>
			</motion.div>

			{/* Modal component for project hover */}
			<Modal modal={modal} projects={projects} />

			<Copy delay={0.5}>
				<Footer />
			</Copy>
		</ReactLenis>
	);
}