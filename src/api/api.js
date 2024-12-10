import axios from "axios";
import {API_KEY, API_URL} from "../config/config";

const instance = axios.create({
    baseURL: API_URL,
    params : {
        key: API_KEY,
        language: "ko-KR",
    }
});

export default instance;