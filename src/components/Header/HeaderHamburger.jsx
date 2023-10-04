import React from "react";
import { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";

const HeaderHamburger = () => {
  const { isShowNavbar, handleShowNavbar } = useMainContext();
  // console.log("🚀contextValueHeader---->", contextValue);
  // contextValue bao gồm isShowNavbar, handleShowNavbar

  useEffect(() => {
    if (!isShowNavbar) {
      //// isShowNavbar = false nghĩa là đang ẩn navbar ==> bật thì phải
      // thêm menuShow
      $("body").removeClass("menu-show");
    } else {
      // isShowNavbar = true nghĩa là đang hiện navbar ==> tắt thì phải
      // xóa menuShow
      $("body").addClass("menu-show");
    }
  }, [isShowNavbar]);

  const _toggleMenu = (e) => {
    e.stopPropagation();
    // if (isShowNavbar) {
    //   // isShowNavbar = true nghĩa là đang hiện navbar ==> tắt thì phải
    //   // xóa menuShow
    //   $("body").removeClass("menu-show");
    // } else {
    //   //// isShowNavbar = false nghĩa là đang ẩn navbar ==> bật thì phải
    //   // thêm menuShow
    //   $("body").addClass("menu-show");
    // }
    handleShowNavbar(!isShowNavbar);
  };
  return (
    <div
      onClick={_toggleMenu}
      className={`header__humburger ${!isShowNavbar ? "" : "--close"}`}
    >
      <div className="header__humburger-button">
        <span />
        <span />
        <span />
      </div>
      <div className="header__humburger-text">
        <span>Menu</span>
        <span>Đóng</span>
      </div>
    </div>
  );
};

export default HeaderHamburger;
