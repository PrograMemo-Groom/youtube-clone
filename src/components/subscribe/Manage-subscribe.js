import React, { useEffect, useState } from 'react';
import styles from './Manage-subscribe.module.css';
import {fetchSubscriptions} from "./service";


const ManageSubscribe = () => {
    //const [subscriptions, setSubscriptions] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await fetchSubscriptions();
    //         setSubscriptions(data || []);
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>모든 구독 채널</h1>
                {/* 구독채널 정렬 드롭다운 박스 : value, onChange 변경해줘야함 */}
                <select className={styles.sortDropdown} onChange="click"> 
                    <option value="bySpelling">가나다순</option>
                    <option value="byRelevance">관련성순</option>
                    <option value="byNewActivity">새 활동순</option>
                </select>
            </header>
            <main className={styles.main}>
                {/* {subscriptions.length > 0 ? (
                    subscriptions.map((channel) => (
                        <div key={channel.id} className={styles.channelCard}> */}
                        <div className={styles.channelCard}>
                            {/* <img
                                src={channel.profileImage}
                                alt={`${channel.title} Profile`}
                                className={styles.channelImage}
                            /> */}
                            <img alt='채널프로필 이미지 ~'/>
                            <div className={styles.channelDiscription}>
                                {/* <h3>{channel.title}</h3>
                                <p>@{channel.id}·구독자 {channel.subscriberCount}명</p>
                                <p>{channel.description}</p> */}
                                <h3>영상 제목</h3>
                                <p>@ididididid·구독자 90만명</p>
                                <p>영상 설명입니다아아아아</p>
                            </div>
                            {/* 구독알림설정 드롭다운박스 : api가져와서 변경 만이 필요,,*/}
                            <div class={styles.buttonDiv}>
                                <select className={styles.alarmDropdown} onChange="click"> 
                                    <option value="alarmAll">전체</option>
                                    <option value="alarmSet">맞춤설정</option>
                                    <option value="alarmOff">없음</option>
                                    <option value="subscribeOff">구독취소</option>
                                </select>
                            </div>
                        </div>
                    {/* ))
                ) : (
                    <p>구독한 채널이 없습니다</p>
                )} */}
            </main>
        </div>
    );
};

export default ManageSubscribe;