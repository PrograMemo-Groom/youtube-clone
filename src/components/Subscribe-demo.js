import React, {useEffect, useState} from 'react';
import useGoogleAuth from "../hooks/useGoogleAuth";
import {fetchSubscriptions} from "../service/VideoService";

const SubscribePageDemo = () => {
    // subscribePageDemo 입니다 -> 구독페이지 추가하는 경우 흐름도를 확인하기 위한 용도

    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("GOOGLE_TOKEN"));
    const googleLogin = useGoogleAuth();

    // 최초 인증 및 accessToken 만료시간 이후 재발급 받을 때 사용
    const handleGetCode = async () => {
        console.log(`handleLogin: Starting Google Login...`);
        await googleLogin();
    }

    useEffect(() => {
        accessToken && fetchData();
    }, [accessToken]);

    const fetchData = async () => {
        try {
            if(!accessToken) {
                console.log("token없다이!!발급버튼 눌러서 발급받아라이!!");
                return;
            }
            const response = await fetchSubscriptions(accessToken);
            console.log("내가 구독하는 video 갖고 왔다이!!!!! ",response);
        } catch (error) {
            console.log(error);
        }
    }
    /* authApi 를 사용하는 경우 아래의 코드 부분 활용해서 작업해야 함 */
    // const [refreshToken, setRefreshToken] = useState(null);
    // const [code, setCode] = useState(localStorage.getItem("GOOGLE_TOKEN"));
    // const handleLogin = async (code) => {
    //     try {
    //         // 인증 코드로 토큰 교환
    //         if (code) {
    //             const tokens = await authTokenAPI();
    //             console.log("Tokens received:", tokens);
    //
    //             // 상태 업데이트
    //             setAccessToken(tokens.access_token);
    //             setRefreshToken(tokens.refresh_token);
    //         } else {
    //             console.error("No authorization code received");
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    // useEffect(() => {
    //     code && handleLogin(code);
    // }, [code]);
    return (
        <div>
            subscribePageDemo
            <button style={{width:'200px', height:'200px'}}
                    onClick={() => handleGetCode()}>token 발급 받는다!!</button>
            {accessToken &&
                <button
                    style={{width:'200px', height:'200px'}}
                    // onClick={() => fetchData()}
                >token값 있으면 노출</button>
            }

        </div>
    );
};

export default SubscribePageDemo;
