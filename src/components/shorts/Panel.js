import React from 'react'
import styles from './Panel.module.css';
import Explain from './explain/Explain.js';
import Comment from './comment/Comment.js';

const Panel = ({onPanelToggle, isPanelOpen}) => {
  return (
    <div className={`${styles.panelContainer} ${isPanelOpen ? styles.slideIn : styles.slideOut}`}>
        <div className={styles.contentsContainer}>
          <header className={styles.contentsHeader}>
            <p>설명</p>
            <button className={styles.closeBnt}>
              <img 
                src={`${process.env.PUBLIC_URL}/closeicon.png`}
                onClick={onPanelToggle}
                alt="close"
              />
            </button>
          </header>
          <div>
            {/* <Comment /> */}
            <Explain />
          </div>
        </div>
    </div>
  )
}

export default Panel
