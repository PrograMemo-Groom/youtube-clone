import React from 'react';
import { Routes, Route } from "react-router-dom";
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
            <Routes>
                <Route index element={<MainVideos />} />
                <Route path="animation" element={<Animation />} />
                <Route path="appreciate" element={<Appreciate />} />
                <Route path="beauty" element={<Beauty />} />
                <Route path="comic" element={<Comic />} />
                <Route path="cook" element={<Cook />} />
                <Route path="custom" element={<Custom />} />
                <Route path="game" element={<Game />} />
                <Route path="live" element={<Live />} />
                <Route path="mix" element={<Mix />} />
                <Route path="music" element={<Music />} />
                <Route path="news" element={<News />} />
                <Route path="rap" element={<Rap />} />
                <Route path="recently" element={<Recently />} />
                <Route path="tour" element={<Tour />} />
            </Routes>
        </div>
    );
};
export default Main;
