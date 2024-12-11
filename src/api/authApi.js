import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI, TOKEN_URL} from "../config/config";
import axios from "axios";

export const authTokenAPI = async () => {
    const userCode = localStorage.getItem("GOOGLE_TOKEN");
    console.log("code 들어왔나?", userCode);
    try {
        const responseToken = await axios.post(TOKEN_URL, {
            code: userCode,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
        }, {
            headers : {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        const {access_token, refresh_token} = responseToken.data;
        console.log("Access token:", access_token);
        console.log("Refresh token:", refresh_token);
        return {access_token, refresh_token};
    } catch (error) {
        console.error("Error during token exchange:", error.response?.data || error.message);
    }
}

