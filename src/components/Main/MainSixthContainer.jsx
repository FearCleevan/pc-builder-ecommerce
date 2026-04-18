// client/src/components/Main/MainSixthContainer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainSixthContainer.module.css';

import Products1 from '../../assets/Products1.png';

const editorialItems = [
  {
    id: 1,
    tag: 'Hot Right Now',
    title: 'Next-Gen Gaming\nGraphics Cards',
    sub: 'RTX 5000 & RX 9000 Series',
    cta: 'Shop GPUs',
    route: '/products?category=gpu',
    bg: 'linear-gradient(135deg, #1a0505 0%, #3d0a0a 100%)',
    accent: '#ff2c2c',
    size: 'large',
  },
  {
    id: 2,
    tag: 'New Arrivals',
    title: 'Flagship\nProcessors',
    sub: 'Intel Core Ultra & AMD Ryzen 9',
    cta: 'Explore CPUs',
    route: '/products?category=cpu',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3d 100%)',
    accent: '#4d79ff',
    size: 'small',
  },
  {
    id: 3,
    tag: 'Build Essentials',
    title: 'High-Performance\nMemory & Storage',
    sub: 'DDR5 RAM & NVMe Gen5 SSDs',
    cta: 'Shop Memory',
    route: '/products?category=ram',
    bg: 'linear-gradient(135deg, #001a0f 0%, #003d1f 100%)',
    accent: '#00c97a',
    size: 'small',
  },
  {
    id: 4,
    tag: 'Premium Picks',
    title: 'Pro Gaming\nPeripherals',
    sub: 'Mechanical keyboards, mice, headsets',
    cta: 'Browse Peripherals',
    route: '/products?category=keyboard',
    bg: 'linear-gradient(135deg, #1a1000 0%, #3d2800 100%)',
    accent: '#ffa726',
    size: 'small',
  },
];

const MainSixthContainer = () => {
  const navigate = useNavigate();

  const large = editorialItems.find(i => i.size === 'large');
  const smalls = editorialItems.filter(i => i.size === 'small');

  return (
    <section className={styles.editorial}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Explore Collections</span>
          <h2 className={styles.title}>Gear Up for Every Build</h2>
        </div>

        <div className={styles.grid}>
          {/* Large left card */}
          <button
            type="button"
            className={`${styles.card} ${styles.cardLarge}`}
            style={{ background: large.bg, '--accent': large.accent }}
            onClick={() => navigate(large.route)}
          >
            <div className={styles.cardImage}>
              <img src={Products1} alt={large.title} draggable="false" />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.tag} style={{ color: large.accent, borderColor: large.accent }}>{large.tag}</span>
              <h3 className={styles.cardTitle}>{large.title.replace('\\n', '\n')}</h3>
              <p className={styles.cardSub}>{large.sub}</p>
              <span className={styles.cta} style={{ background: large.accent }}>
                {large.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </div>
          </button>

          {/* Right column — 3 stacked small cards */}
          <div className={styles.rightCol}>
            {smalls.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.card} ${styles.cardSmall}`}
                style={{ background: item.bg, '--accent': item.accent }}
                onClick={() => navigate(item.route)}
              >
                <div className={styles.cardBody}>
                  <span className={styles.tag} style={{ color: item.accent, borderColor: item.accent }}>{item.tag}</span>
                  <h3 className={styles.cardTitle}>{item.title.replace('\\n', '\n')}</h3>
                  <p className={styles.cardSub}>{item.sub}</p>
                  <span className={styles.cta} style={{ background: item.accent }}>
                    {item.cta}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSixthContainer;
