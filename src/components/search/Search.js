import React, {useEffect, useState} from 'react';
import styles from "./Search.module.css";
import {useLocation} from "react-router-dom";
import {fetchSearchVideos} from "../../service/VideoService";

const tag = '[SearchPage]';
const Search = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [nextToken, setNextToken] = useState("");
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get("q");

    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            setSearchResult(fetchSearchVideos(searchTerm).items);
            console.log("여기");
            setNextToken(searchResult.pageToken);
        }
    }, [fetchSearchVideos]);

    return (
        <div>
            <div>{nextToken}</div>

            <p>{nextToken && nextToken}</p>
            {searchResult?.map((item) => {
                <p>{item.title}</p>
            })}
        </div>
    );
};

export default Search;
