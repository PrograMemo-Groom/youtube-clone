import React, { useEffect, useState } from 'react';
import styles from './Manage-subscribe.module.css';
import {fetchSubscriptions} from "../../../service/SubscribeService";


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
                {channelData.map((channel, index) => (
                        <div className={styles.channelCard}>
                            <img
                                src={channel.profileImage}
                                alt={`${channel.title} Profile`}
                                className={styles.channelImage}
                            />
                            <div className={styles.channelDescription}>
                                <h3>{channel.title}</h3>
                                <p>@{channel.id}·구독자 {channel.subscriberCount}명</p>
                                <p>{channel.description}</p>
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
                ))}
                    {/* ))
                ) : (
                    <p>구독한 채널이 없습니다</p>
                )} */}
            </main>
        </div>
    );
};

export default ManageSubscribe;


const channelData = [{
    title: "MochaMilk",
    id: "MochaMilk",
    subscriberCount: "167만",
    profileImage: "https://yt3.googleusercontent.com/ytc/AIdro_mOjBZTu180Gt9tDIvv5TjwC_TJE0Gj39r0XrhkbdDaVR8=s176-c-k-c0x00ffffff-no-rj-mo",
    description: "모카와 우유의 일상을 함께 봐주셔서 감사합니다 :) • 모카 생년월일: 2011.10.22 견종: 폼피츠 성별: 남 • 우유 생년월일: 2016.11.07 견종: 사모예드 성별: 여 _________________________________________________________ Thank you for watching MochaMilk's daily vlog :) • Mocha Birth: 2011.10.22",
    } , {
    title: "MochaMilk",
    id: "MochaMilk",
    subscriberCount: "167만",
    profileImage: "https://yt3.googleusercontent.com/ytc/AIdro_mOjBZTu180Gt9tDIvv5TjwC_TJE0Gj39r0XrhkbdDaVR8=s176-c-k-c0x00ffffff-no-rj-mo",
    description: "모카와 우유의 일상을 함께 봐주셔서 감사합니다 :) • 모카 생년월일: 2011.10.22 견종: 폼피츠 성별: 남 • 우유 생년월일: 2016.11.07 견종: 사모예드 성별: 여 _________________________________________________________ Thank you for watching MochaMilk's daily vlog :) • Mocha Birth: 2011.10.22",
    } , {
    title: "MochaMilk",
    id: "MochaMilk",
    subscriberCount: "167만",
    profileImage: "https://yt3.googleusercontent.com/ytc/AIdro_mOjBZTu180Gt9tDIvv5TjwC_TJE0Gj39r0XrhkbdDaVR8=s176-c-k-c0x00ffffff-no-rj-mo",
    description: "모카와 우유의 일상을 함께 봐주셔서 감사합니다 :) • 모카 생년월일: 2011.10.22 견종: 폼피츠 성별: 남 • 우유 생년월일: 2016.11.07 견종: 사모예드 성별: 여 _________________________________________________________ Thank you for watching MochaMilk's daily vlog :) • Mocha Birth: 2011.10.22",
    }
]