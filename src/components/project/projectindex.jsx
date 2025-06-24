'use client';

import React from 'react';
import styles from './style.module.css';

export default function ProjectHome({ index, title, setModal, url, description }) {
  return (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className={styles.project}
    >
      <h2>{title}</h2>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectLink}
        style={{ color: "inherit", textDecoration: "underline", cursor: "pointer" }}
      >
        {description}
      </a>
    </div>
  );
}