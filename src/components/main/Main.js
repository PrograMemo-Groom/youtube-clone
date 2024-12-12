import React from 'react';
import CategoryBar from "./category/CategoryBar";
import MainVideos from "./videos/MainVideos"
import Animation from "./category/pages/Animation";
import Appreciate from "./category/pages/Appreciate";
import Beauty from "./category/pages/Beauty";
import Comic from "./category/pages/Comic";
import Cook from "./category/pages/Cook";
import Custom from "./category/pages/Custom";
import Game from "./category/pages/Game";
import Live from "./category/pages/Live";
import Mix from "./category/pages/Mix";
import Music from "./category/pages/Music";
import News from "./category/pages/News";
import Rap from "./category/pages/Rap";
import Recently from "./category/pages/Recently";
import Tour from "./category/pages/Tour";

const Main = () => {
    return (
        <div>
            <CategoryBar/>
            <MainVideos/>
            <Music/>
            <Live/>
            <Mix/>
            <News/>
            <Game/>
            <Animation/>
            <Comic/>
            <Tour/>
            <Rap/>
            <Beauty/>
            <Cook/>
            <Recently/>
            <Appreciate/>
            <Custom/>


        </div>
    );
};
export default Main;
