import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  // const location = useLocation();
  // console.log("🚀location---->", location);
  const { pathname } = useLocation();

  const [isShowNavbar, setIsShowNavbar] = useState(false);
  useEffect(() => {
    const myTimeOut = setTimeout(
      () =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        }),
      100
    );
    setIsShowNavbar(false);
    return () => {
      clearTimeout(myTimeOut);
    };
  }, [pathname]);
  const handleShowNavbar = (isShow) => {
    setIsShowNavbar(isShow);
  };
  //   console.log("🚀children---->", children);
  return (
    <MainContext.Provider value={{ isShowNavbar, handleShowNavbar }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

export const useMainContext = () => useContext(MainContext);

/*
không có menu-show có -- close ==>tắt navbar
không có -- close  có menu-show ==>bật navbar

Mới vào giao diện thì navbar đang tắt tức là isShowNavbar = false
thì ta sẽ phải thêm vào class menu-show để bật navbar
xong sẽ chạy xuống thực thi hàm handleShowNavbar truyền vào là !false là true
khi true thì className của div onClick là "" 
hoàn tất sẽ bật được navbar


Đang bật navbar thì isShowNavbar = true
thì ta sẽ phải xóa class menu-show để tắt navbar
xong sẽ chạy xuống thực thi hàm handleShowNavbar truyền vào là !true là false
khi false thì className của div onClick là "--close 
hoàn tất sẽ btắt được navbar
*/
