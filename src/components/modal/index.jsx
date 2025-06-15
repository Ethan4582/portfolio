import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image   from 'next/image';
import styles  from './style.module.css';
import gsap    from 'gsap';

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter:   { scale: 1, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed:  { scale: 0, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
};

const getProjectURL = (idx) => {
  switch (idx) {
    case 0:
      return 'https://www.credly.com/badges/b89022c7-f87c-4c40-8ee3-0b50e69ab80f';
    case 1:
      return 'https://www.credly.com/badges/da73279c-138f-4954-bf2f-5aeba4dd5875';
    default:
      return '#';
  }
};

export default function ProjectModal({ modal, projects }) {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor         = useRef(null);
  const cursorLabel    = useRef(null);

  useEffect(() => {
    // setup GSAP quickTo's...
    const xMoveContainer = gsap.quickTo(modalContainer.current, 'left', { duration: 0.8, ease: 'power3' });
    const yMoveContainer = gsap.quickTo(modalContainer.current, 'top',  { duration: 0.8, ease: 'power3' });
    const xMoveCursor    = gsap.quickTo(cursor.current,         'left', { duration: 0.5, ease: 'power3' });
    const yMoveCursor    = gsap.quickTo(cursor.current,         'top',  { duration: 0.5, ease: 'power3' });
    const xMoveLabel     = gsap.quickTo(cursorLabel.current,    'left', { duration: 0.45, ease: 'power3' });
    const yMoveLabel     = gsap.quickTo(cursorLabel.current,    'top',  { duration: 0.45, ease: 'power3' });

    const onMouseMove = (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveLabel(pageX);
      yMoveLabel(pageY);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        className={styles.modalContainer}
      >
        <div style={{ top: index * -100 + '%' }} className={styles.modalSlider}>
          {projects.map((project, idx) => {
            // prefer project.url, otherwise fallback
            const urlToOpen = project.url ?? getProjectURL(idx);

            return (
              <div
                key={idx}
                className={styles.modal}
                style={{ backgroundColor: project.color, cursor: 'pointer' }}
                onClick={() => {
                  if (urlToOpen && urlToOpen !== '#') {
                    window.open(urlToOpen, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                {project.src && (
                  <Image
                    src={project.src}
                    width={300}
                    height={200}
                    alt={project.title || 'Project image'}
                    style={{ objectFit: 'contain', width: '400px', height: 'auto' }}
                  />
                )}
                <span
                  className={styles.viewButton}
                  style={{
                    position: 'absolute',
                    right: '2rem',
                    top: '2rem',
                    zIndex: 2,
                    pointerEvents: 'none' // label itself needn’t handle events
                  }}
                >
                  View
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        className={styles.cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      />

      <motion.div
        ref={cursorLabel}
        className={styles.cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      >
        View
      </motion.div>
    </>
  );
}
