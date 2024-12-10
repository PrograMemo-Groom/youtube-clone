import React, {useEffect, useRef, useState} from 'react';
import styles from "./Search.module.css";
import {useLocation} from "react-router-dom";

const tag = '[SearchPage]';
const Search = () => {
    const [search, setSearch] = useState('');
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get("q");

    useEffect(() => {
        setSearch(searchTerm);
        console.log(tag, searchTerm);
    }, []);

    return (
        <div className={styles.container}>
            {search && search}
        </div>
    );
};

export default Search;
