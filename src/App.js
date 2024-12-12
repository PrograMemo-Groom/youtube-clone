import {Outlet, Route, Routes} from "react-router-dom";
import React from "react";
import MainPage from "./components/main/Main";
import styles from "./App.module.css";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/Sidebar";
import MyPage from "./components/myPage/MyPage";
import SearchPage from "./components/search/Search";
import Detail from "./components/detail/Detail";
import SubscribeDemo from "./components/Subscribe-demo";
import Shorts from "./components/shorts/Shorts";

const LayOut = () => {
    return (
        <>
            <Header />
            <SideBar />
            <div className={styles.container}>
                <Outlet /> {/* 현재 라우터에 따라 변경 되는 내용 */}
            </div>
            {/*<Footer />*/}
        </>
    )
}

function App() {
    console.log('App is running!');
    return (
        <div className={styles.app}>
            <Routes>
                <Route path="/" element={<LayOut/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path="main/*" element={<MainPage />} />
                    <Route path="myPage" element={<MyPage />}/>
                    <Route path="search" element={<SearchPage/>}/>
                    <Route path="detail" element={<Detail/>}/>
                    <Route path="subscribe" element={<SubscribeDemo/>}/>
                    {/*<Route path="subscribe" element={<SubscribeDemo/>}/>*/}
                    <Route path="shorts" element={<Shorts />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
