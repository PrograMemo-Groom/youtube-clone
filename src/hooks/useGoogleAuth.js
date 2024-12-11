import {useGoogleLogin} from "@react-oauth/google";
import {GOOGLE_OAUTH_URL} from "../config/config";

const useGoogleAuth = () => {
    const login = useGoogleLogin({
        onSuccess: (response) => {
            console.log("Client Login Authorization Code:", response);
            localStorage.setItem("GOOGLE_TOKEN", response.access_token);
            return Promise.resolve(response.access_token);
        },
        onError: (error) => {
            console.error("Google Login Failed:", error);
            return Promise.reject(error);
        },
        scope: GOOGLE_OAUTH_URL,
    });
    return login;
};

export default useGoogleAuth;