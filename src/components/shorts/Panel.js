import React from 'react'
import styles from './Panel.module.css';
import Explain from './explain/Explain.js';
import Comment from './comment/Comment.js';

const Panel = ({onPanelToggle, isPanelOpen, content, short}) => {
  return (
    <div className={`${styles.panelContainer} ${isPanelOpen ? styles.slideIn : styles.slideOut}`}>
        <div className={styles.contentsContainer}>
          <header className={styles.contentsHeader}>
            {content === "explain" && <p>설명</p>}
            {content === "comment" && <p>댓글</p>}
            <button className={styles.closeBnt}>
              <img 
                src={`${process.env.PUBLIC_URL}/closeicon.png`}
                onClick={onPanelToggle}
                alt="close"
              />
            </button>
          </header>
          <div>
            {content === "explain" && 
            <Explain short={short} />
            }

            {content === "comment" && <Comment />}
            {/* <Comment /> */}
            {/* <Explain /> */}
          </div>
        </div>
    </div>
  )
}

export default Panel
