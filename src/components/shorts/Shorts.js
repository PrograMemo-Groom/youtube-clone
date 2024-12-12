import React, { useState }from 'react'
import styles from './Shorts.module.css';
import Video from './Video.js';
import Panel from './Panel.js';

function Shorts() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePanelToggle = () => {
    setIsPanelOpen(!isPanelOpen);
  }
  return (
    <main className={styles.shortsContainer}>
      <section className={styles.sectionContainer}>
        <Video onPanelToggle={handlePanelToggle}/>
        {isPanelOpen ? <Panel /> : null}
      </section>
    </main>
  )
}

export default Shorts
