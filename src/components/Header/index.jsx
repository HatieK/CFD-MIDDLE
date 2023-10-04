import React, { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";
import HeaderHamburger from "./HeaderHamburger";
import HeaderLogo from "./HeaderLogo";
import HeaderAuthentic from "./HeaderAuthentic";
import { useLocation } from "react-router-dom";
import { PATHS } from "../../constants/path";

const Header = () => {
  const { pathname } = useLocation();
  // Xử lý khi scroll chỉ có trang homepage và trang about
  // thay đổi background header
  const isTransparent = [PATHS.HOMEPAGE, PATHS.ABOUT].includes(pathname);

  useEffect(() => {
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        if (isTransparent) {
          header.removeClass("--bgwhite");
        }
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }
    window.addEventListener("scroll", scrollBgHeader);

    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTransparent]);
  return (
    <header
      className={`header --transparent ${!isTransparent ? "--bgwhite" : ""}`}
    >
      <div className="container-fluid">
        <HeaderHamburger />
        <HeaderLogo />
        <HeaderAuthentic />
      </div>
    </header>
  );
};

export default Header;
