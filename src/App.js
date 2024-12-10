import {Outlet, Route, Routes} from "react-router-dom";
import React from "react";
import MainPage from "./components/main/Main";
import styles from "./App.module.css";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/Sidebar";

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
        <Route path="/" element={<LayOut />}>
          <Route index element={<MainPage />} />
          {/*<Route path="search" element={<SearchPage />} />*/}
        </Route>
      </Routes>
    </div>
  );
}

export default App;