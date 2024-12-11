import {useGoogleLogin} from "@react-oauth/google";
import {GOOGLE_OAUTH_URL} from "../config/config";

const useGoogleAuth = () => {
    const login = useGoogleLogin({
        onSuccess: (response) => {
            console.log("Client Login Access Token:", response);
            return response.code;
        },
        onError: (error) => {
            console.error("Client Login Failed:", error);
        },
        scope: GOOGLE_OAUTH_URL,
        flow: "auth-code",
    });
    return login;
};

export default useGoogleAuth;

