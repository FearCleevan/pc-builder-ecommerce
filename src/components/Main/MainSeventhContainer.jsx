// client/src/components/Main/MainSeventhContainer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import styles from './MainSeventhContainer.module.css';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    ),
    text: 'Budget-based recommendations',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
    ),
    text: 'Real-time compatibility checking',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    text: 'Performance optimization',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    ),
    text: 'Estimated wattage & PSU sizing',
  },
];

const MainSeventhContainer = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.cta}>
      {/* Background noise pattern */}
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <FaRobot size={13} style={{ marginRight: 6 }} />
            Intelligent PC Builder
          </span>
          <h2 className={styles.heading}>
            Build the perfect PC.<br />
            <span className={styles.accent}>Guided by AI.</span>
          </h2>
          <p className={styles.desc}>
            Our smart builder walks you through every component, checks compatibility in real time,
            and ensures your build is optimized for performance and budget.
          </p>

          <ul className={styles.featureList}>
            {features.map((f, i) => (
              <li key={i} className={styles.featureItem}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={() => navigate('/pcbuilder')}>
              <FaRobot size={16} />
              Start Building Now
            </button>
            <button className={styles.ghostBtn} onClick={() => navigate('/products')}>
              Browse All Parts
            </button>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.orb}>
            <div className={styles.orbRing} />
            <div className={styles.orbRing2} />
            <FaRobot size={48} className={styles.orbIcon} />
          </div>
          <div className={styles.floatChip} />
          <div className={styles.floatBar} />
          <div className={styles.floatBar2} />
        </div>
      </div>
    </section>
  );
};

export default MainSeventhContainer;
