import React, { useEffect, useState } from 'react';
import styles from './Manage-subscribe.module.css';
import useGoogleAuth from "../../../hooks/useGoogleAuth";
import { fetchSubscriptions } from "../../../service/SubscribeService";

const ManageSubscribe = () => {
    const [accessToken] = useState(() => localStorage.getItem("GOOGLE_TOKEN"));
    const [subscriptions, setSubscriptions] = useState([]);
    const googleLogin = useGoogleAuth();
    
    // 최초 인증 및 accessToken 만료시간 이후 재발급 받을 때 사용
    const handleGetCode = async () => {
        console.log(`handleLogin: 구글 로그인 다시 하는 중 ㅠㅠ`);
        await googleLogin();
    };
    
        useEffect(() => {
            accessToken && fetchData();
        }, [accessToken]);

        const fetchData = async () => {
            try {
                if(!accessToken) {
                    console.log("token없다이!!발급버튼 눌러서 발급받아라이!!");
                    return;
                }
                const response = await fetchSubscriptions(accessToken);  // 구독 비디오오오
                console.log("내가 구독하는 video 갖고 왔다이!!!!! ",response);
                if (Array.isArray(response)) {
                    console.log('내가 가져온 동영상들 배열성공 !!');
                    const flattenedResponse = response.flatMap(sub => sub); //이중배열을 풀어보자
                    const sortedResponse = flattenedResponse.sort((a, b) => {  // 영상들만 최신순 정렬하자
                        return new Date(b.publishTime) - new Date(a.publishTime);
                    });
                    setSubscriptions(sortedResponse);
                } else {
                    console.error("받아온게 배열이 아님.. 이거임:", response);
                }
            } catch (error) {
                console.log('fetchData 에러 :', error);
            }
        }

    return (
        <>
        <button
            style={{width:'200px', height:'20px'}}
            onClick={() => {handleGetCode();}}>
                token 발급 받는다!!
        </button>
        <button
            style={{width:'200px', height:'20px'}}
            onClick={() => {fetchData()}}>
                누르면 데이터를 가져오ㅏ
        </button>
        {accessToken &&
            <button style={{width:'200px', height:'20px'}}>
                token값 있으면 노출
        </button>}

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
                {subscriptions.length > 0 ? (
                    subscriptions.map((channel) => (
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