import { useGoogleLogin } from "@react-oauth/google";
import {API_OAUTH_URL} from "../config/config";

const oauth = () => {
    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            console.log("Client Login Access Token:", response);
            return response.access_token;
        },
        onError: (error) => {
            console.error("Client Login Failed:", error);
        },
        scope: API_OAUTH_URL,
    });

    return googleLogin;
};

export default oauth;
