"use client";

import { useState } from "react";
import About from "@/components/about/page";
import ProjectHome from "@/components/project/projectindex";
import Modal from "@/components/modal";
import { useRevealer } from "@/hooks/useReveal";
import { motion } from "framer-motion";
import Footer from "@/components/footer/page";
import Copy from "@/components/Copy";
import { ReactLenis } from "lenis/react";
import Image from "next/image";

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
	useRevealer();

	return (
		<ReactLenis root>
			<div className="revealer"></div>

			{/* Hero Section with image and overlapping text */}
			<div className="home-hero">
				<Image
					src="/p3.png" // Place your image in /public/profile.jpg or change the path
					alt="Ashirwad Singh"
					fill
					style={{ objectFit: "cover", zIndex: 1 }}
					className="hero-image"
					priority
				/>
				<div className="hero-text">
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