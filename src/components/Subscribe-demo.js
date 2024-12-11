import React, {useEffect, useState} from 'react';
import useGoogleAuth from "../hooks/useGoogleAuth";
import {fetchSubscriptions} from "../service/VideoService";

const SubscribePageDemo = () => {
    // subscribePageDemo 입니다 -> 구독페이지 추가하는 경우 흐름도를 확인하기 위한 용도

    const [accessToken, setAccessToken] = useState(undefined);

    const googleLogin = useGoogleAuth();

    const handleLogin = async () => {
        try {
            console.log(`handleLogin:`);
            const token = await googleLogin();
            setAccessToken(token);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchData = async () => {
        try {
            if(!accessToken) {
                console.log("token없다이!!");
                return;
            }
            const response = await fetchSubscriptions(accessToken);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [accessToken]);

    return (
        <div>
            subscribePageDemo
            <button style={{width:'200px', height:'200px'}}
                    onClick={() => handleLogin()}>subscribe 가져오기</button>
        </div>
    );
};

export default SubscribePageDemo;
