import React from 'react'
import styles from './Shorts.module.css';
import Video from './Video.js';
import Panel from './Panel.js';

function Shorts() {
  return (
    <main className={styles.Shorts_Container}>
      <section className={styles.section_Container}>
        <Video />
        <Panel />
      </section>
    </main>
  )
}

export default Shorts
