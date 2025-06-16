'use client';

import styles from '../page.module.css'
import { useState } from 'react';
import Project from '../../components/project';
import Modal from '../../components/modal';
import {useRevealer} from "@/hooks/useReveal";

const projects = [
  {
    title: "MongoDB Associate Database Administrator (Atlas)",
    src: "/altas.png",
    color: "#000000",
    url: "https://www.credly.com/badges/b89022c7-f87c-4c40-8ee3-0b50e69ab80f"
  },
  {
    title: "MongoDB Associate Database Administrator",
    src: "/DBA.png",
    color: "#8C8C8C",
    url: "https://www.credly.com/badges/da73279c-138f-4954-bf2f-5aeba4dd5875"
  }
]

export default function Certification() {
  const [modal, setModal] = useState({active: false, index: 0});

  return (
    useRevealer(),
    <>
      <div className="revealer"></div>
      <main className={styles.main}>
        <div className={styles.body}>
          {
            projects.map((project, index) => (
              <Project
                index={index}
                title={project.title}
                setModal={setModal}
                url={project.url}
                key={index}
              />
            ))
          }
        </div>
        <Modal modal={modal} projects={projects}/>
      </main>
    </>
  )
}
