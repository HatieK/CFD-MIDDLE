import React from "react";
import MyInfo from "./MyInfo";
import MyCourse from "./MyCourse";
import MyPayment from "./MyPayment";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import tokenMethod from "../../utils/token";
import { PATHS } from "../../constants/path";

const StudentProfile = () => {
  // Một ví dụ khác dùng useNavigate,nếu chưa đăng nhập thì sẽ phải về home mà không được xem studentProfile
  // const isLogin = false;
  // if (!isLogin) {
  //   return <Navigate to="/" />;
  // }

  // if (!!tokenMethod.get()) {
  //   return <Navigate to={PATHS.HOME} />;
  // }
  return (
    <main className="mainwrapper profilepage">
      <div className="container">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar__info">
              <div className="useravatar">
                <div className="avatar">
                  <div className="img">
                    <img src="img/avatar_nghia.jpg" alt="avatar" />
                  </div>
                </div>
                <h3 className="title --t3">Trần Nghĩa</h3>
              </div>
            </div>
            <div className="sidebar__content">
              <h4>Giới thiệu</h4>
              <p className="description">
                Cheerful, cafeful,friendly. I like listening to music, traveling
                and coding, listening to music, traveling and coding.
              </p>
              <ul>
                <li>
                  <img src="img/icon-mail-outline.svg" alt="icon" />
                  <span>trannghia2018@gmail.com</span>
                </li>
                <li>
                  <img src="img/icon-phone-outline.svg" alt="icon" />
                  <span>098 9596 913</span>
                </li>
                <li>
                  <img src="img/icon-link.svg" alt="icon" />
                  <a href="#" target="_blank">
                    https://nghiatran.info
                  </a>
                </li>
              </ul>
              <div className="social">
                <a href="#">
                  <img src="img/icon-facebook-dark.svg" alt />
                </a>
                <a href="#">
                  <img src="img/icon-linkedin-dark.svg" alt />
                </a>
                <a href="#">
                  <img src="img/icon-youtube-dark.svg" alt />
                </a>
              </div>
            </div>
          </div>
          <div className="tabwrap">
            <div className="tab">
              <div className="tab__title">
                <NavLink end to="/profile">
                  Thông tin cá nhân
                </NavLink>
                <NavLink to="/profile/my-course">Khóa học của tôi</NavLink>
                <NavLink to="/profile/my-payment">Lịch sử thanh toán</NavLink>
              </div>
              <div className="tab__content">
                {/* Thông tin cá nhân */}
                {/* <MyInfo /> */}
                {/* Khoá học của tôi */}
                {/* <MyCourse /> */}
                {/* Lịch sử thanh thánh */}
                {/* <MyPayment /> */}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentProfile;
