import React, { useState }from 'react'
import styles from './Shorts.module.css';
import Video from './Video.js';
import Panel from './Panel.js';

// 예시데이터
import exampledata from './exampleData.json';

function Shorts() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false); // 퇴장 애니메이션 위해 사용 - 애니 끝난후 dom삭제해야함.

  // 컨텐츠 다르게 렌더링하기위해..
  const [panelContent, setPanelContent] = useState(null);

  const handlePanelToggle = (content) => {
    if (isPanelOpen) {
      setTimeout(() => setShouldRender(false), 400);
    } else {
      setShouldRender(true);
      setPanelContent(content);
    }
    setIsPanelOpen(!isPanelOpen);
  }
  return (
    <main className={styles.shortsContainer}>
      {exampledata.shorts.map((short) => (
        <section className={styles.sectionContainer}
        key={short.id}>
          <Video onPanelToggle={handlePanelToggle}
            exampledata={exampledata.shorts}
            short={short}/>
          {shouldRender && (
            <Panel
              onPanelToggle={handlePanelToggle}
              isPanelOpen={isPanelOpen}
              content={panelContent}
              exampledata={exampledata.shorts}
              short={short}
            />
          )}
          {/* {isPanelOpen ? <Panel onPanelToggle={handlePanelToggle} /> : null} */}
        </section>
      ))}
    </main>
  )
}

export default Shorts
