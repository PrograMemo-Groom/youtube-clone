import React, { useState } from "react";
import CreatorReserveTap from "./creatorReserveTap/CreatorReserveTap";
import ShortsTap from "./shortsTap/ShortsTap";
import RelatedVideo from "./relatedVideo/RelatedVideo";
import MainVideo from "./mainVideo/MainVideo";
import "./Detail.css";
import { ThemeContext } from "../context/context";
import { getMenuItemStyle, getStyle } from "./themes/useThemeStyles";

function Detail() {
  const [isDark, setIsDark] = useState(false);

  const setTheme = getStyle(isDark);
  const setMenuTheme = getMenuItemStyle(isDark);

  const darkMode = () => {
    setIsDark(!isDark);
  };
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <button className='button' onClick={darkMode} style={{ height: "20px" }}>
  dark mode
</button>




      <div style={setTheme} className='detail-container'>
        <div className='main-section'>
          <MainVideo />
        </div>
        <div style={setTheme} className='side-section'>
          <CreatorReserveTap />
          <ShortsTap />
          <RelatedVideo />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Detail;
