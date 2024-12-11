import React, { useEffect, useState } from 'react';
import styles from './Manage-subscribe.module.css';
import instance from '../../api/api';
import requests from '../../api/endpoint';

const tag = '[Service]';
const fetchSubscriptions = async () => {
    try {
        //구독 목록 가져오기
        const {data: {items}} = await instance.get(requests.fetchSubscriptions, {
            params: {
                part: "snippet",
                mine: "true",
                maxResults: "10"  //변경하기 !

            }
        });

        //아이디 넘겨서 체널 디테일 가져오기
        const channelDetails = await Promise.all(
            items.map(item => fetchChannelDetails(item.snippet.resourceId.channelId))
        );

        return channelDetails.filter(Boolean);

    } catch (e) {
        console.log(tag, "Subscriptions can't get response data", e);
    }
}

const fetchChannelDetails = async (channelId) => {
    try {
        //채널 아이디에 따른 디테일 가져오기
        const {data} = await instance.get(requests.fetchChannelDetails, {
            params: {
                part: 'statistics,snippet',
                id: channelId,
            }
        })
        const channel = data.items[0];
        return {
            id: channel.id,
            title: channel.snippet.title,
            description: channel.snippet.description,
            profileImage: channel.snippet.thumbnails.default.url,
            subscriberCount: channel.statistics.subscriberCount,
        }
    } catch (e) {
        console.log(tag, "Error fetching channel details", e);
        return null;
    }
}

const ManageSubscribe = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSubscriptions();
            setSubscriptions(data || []);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <header>
                <h1>모든 구독 채널</h1>
                <button></button>
            </header>
            <main>
                {subscriptions.length > 0 ? (
                    subscriptions.map((channel) => (
                        <div key={channel.id} className={styles.channelCard}>
                            <img
                                src={channel.profileImage}
                                alt={`${channel.title} Profile`}
                                className={styles.channelImage}
                            />
                            <h3>{channel.title}</h3>
                            <p>{channel.description}</p>
                            <p>Subscribers: {channel.subscriberCount}</p>
                        </div>
                    ))
                ) : (
                    <p>구독한 채널이 없습니다</p>
                )}
            </main>
        </div>
    );
};

export default ManageSubscribe;
