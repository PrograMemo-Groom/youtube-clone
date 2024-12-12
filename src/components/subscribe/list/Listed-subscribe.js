import React, { useState } from 'react';
import styles from './Listed-subscribe.module.css';
import GridSubscribe from '../grid/Grid-subscribe';
import ManageSubscribe from '../manage/Manage-subscribe';

const ListedSubscribe = () => {

    const [view, setView] = useState("list");

    return (
        <div className={styles.container}>

            {/* manage로 뷰 바뀌는 부분(헤더까지 바뀜 */}
            {view === "manage" && <ManageSubscribe />}
            {view === "grid" && <GridSubscribe />}
            {view === "list" && (
                <>
                    <main>

                    </main>
                    <div>
                        <h3>최신순</h3>
                        <div className={styles.pageChangeButtons}>
                            <button
                                className={styles.manageButton}
                                onClick={() => setView("manage")}
                            >
                                관리
                            </button>
                            <button
                                className={styles.gridButton}
                                onClick={() => setView("grid")}
                            >
                                <img alt='격자형'/>
                            </button>
                            <button
                                className={styles.listButton}
                                onClick={() => setView("list")}
                            >
                                <img alt='리스트형'/>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>        
    );
};

export default ListedSubscribe;
