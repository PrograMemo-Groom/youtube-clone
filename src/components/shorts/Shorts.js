import React, { useState }from 'react'
import styles from './Shorts.module.css';
import Video from './Video.js';
import Panel from './Panel.js';

function Shorts() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false); // 퇴장 애니메이션 위해 사용 - 애니 끝난후 dom삭제해야함.

  const handlePanelToggle = () => {
    if (isPanelOpen) {
      setTimeout(() => setShouldRender(false), 500);
    } else {
      setShouldRender(true);
    }
    setIsPanelOpen(!isPanelOpen);
  }
  return (
    <main className={styles.shortsContainer}>
      <section className={styles.sectionContainer}>
        <Video onPanelToggle={handlePanelToggle}/>
        {shouldRender && (
          <Panel
            onPanelToggle={handlePanelToggle}
            isPanelOpen={isPanelOpen}
          />
        )}
        {/* {isPanelOpen ? <Panel onPanelToggle={handlePanelToggle} /> : null} */}
      </section>
    </main>
  )
}

export default Shorts
