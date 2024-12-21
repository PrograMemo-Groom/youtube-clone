import React, { useEffect, useState } from 'react';
import styles from './Manage-subscribe.module.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchSubscribeList} from "../../../store/actions/subscribeAction";

const ManageSubscribe = () => {
    const [accessToken] = useState(() => localStorage.getItem("GOOGLE_TOKEN"));
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.subscribe);
    
    useEffect(() => {
        accessToken && dispatch(fetchSubscribeList(accessToken));
    }, [dispatch,accessToken]);


    return (
        <>
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>모든 구독 채널</h1>
                {/* 구독채널 정렬 드롭다운 박스 : value, onChange 변경해줘야함 */}
                <select className={styles.sortDropdown}> 
                    <option value="bySpelling">가나다순</option>
                    <option value="byRelevance">관련성순</option>
                    <option value="byNewActivity">새 활동순</option>
                </select>
            </header>
            <main className={styles.main}>
                {list.length > 0 ? (
                    list.map((channel) => (
                        <div key={channel.id} className={styles.channelCard}>
                            <img
                                src={channel.channelAvatar}
                                alt='체널 아바타사진'
                                className={styles.channelImage}
                            />
                            <div className={styles.channelDescription}>
                                <h3>{channel.channelTitle}</h3>
                                <p>@{channel.id}·구독자 {channel.subscriberCount}명</p>
                                <p>{channel.channelDescription}</p>
                            </div>
                            {/* 구독알림설정 드롭다운박스 : api가져와서 변경 만이 필요,,*/}
                            <div className={styles.buttonDiv}>
                                <select className={styles.alarmDropdown}> 
                                    <option value="alarmAll">전체</option>
                                    <option value="alarmSet">맞춤설정</option>
                                    <option value="alarmOff">없음</option>
                                    <option value="subscribeOff">구독취소</option>
                                </select>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>구독한 채널이 없습니다</p>
                )} 
            </main>
        </div>
        </>
    );
};

export default ManageSubscribe;