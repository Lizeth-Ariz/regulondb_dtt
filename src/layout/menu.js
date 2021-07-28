import React from "react";
import MainMenu from "./components/menu/menu_main";
import MenuData from "./conf/menu/menu.conf";

const menuData = MenuData.menu;

const Menu = () => {
  return (
    <nav style={{ float: "none" }}>
      <MainMenu menuData={menuData} />
    </nav>
  );
};

export default Menu;
