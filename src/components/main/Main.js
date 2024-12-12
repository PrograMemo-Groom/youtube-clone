import React, {useState} from 'react';
import CategoryBar from "./category/CategoryBar";
import MainVideos from "./videos/MainVideos";


const Main = () => {
    const [fetchFunction, setFetchFunction] = useState("fetchMainVideos");

    const handleCategoryChange = (fetchFunctionName) => {
        setFetchFunction(fetchFunctionName);
    };

    return (
        <div>
            <CategoryBar onCategoryChange={handleCategoryChange} />
            <MainVideos fetchFunction={fetchFunction} />
        </div>
    );
};

export default Main;
