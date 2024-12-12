 // 전역적으로 사용할 스타일
 export const getStyle = (isDark) => {
    const darkMode_TextColor = "white";
    const darkMode_Background = "rgb(15, 15, 15)";

    const lightMode_TextColor = "black";
    const lightMode_Background = "white";

    return {
      backgroundColor: isDark ? darkMode_Background : lightMode_Background,
      color: isDark ? darkMode_TextColor : lightMode_TextColor,
    };
  };

  // 메뉴 아이템 스타일 
export const getMenuItemStyle = (isDark) => {
    const darkMode_itemBack = "rgb(38, 38, 38)";
    const lightMode_itemBack = "rgb(242, 242, 242)";

    return {
      backgroundColor: isDark ? darkMode_itemBack : lightMode_itemBack,
      color: isDark ? "white" : "black",
    };
  };