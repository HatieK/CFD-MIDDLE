import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";
import tokenMethod from "../../utils/token";
import { useState } from "react";
import { PATHS } from "../../constants/path";
import { Link } from "react-router-dom";

const HeaderAuthentic = () => {
  const { handleShowModal, handleLogout, profile } = useAuthContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const { profileImage, firstName } = profile;
  const _onShowDropdown = (e) => {
    e?.stopPropagation();
    setShowDropDown(true);
  };
  const _onCloseDropDown = (e) => {
    e?.stopPropagation();
    setShowDropDown(false);
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      _onCloseDropDown();
    });
    return () => {
      document.removeEventListener("click", () => {
        _onCloseDropDown();
      });
    };
  }, []);

  if (!!tokenMethod.get()) {
    return (
      <div className="header__logged">
        <div className="userlogged">
          <div
            className="userlogged__avatar user"
            data-dropdown="userlogged__dropdown"
            onClick={_onShowDropdown}
          >
            <div className="userlogged__avatar-img user__img">
              <img
                src={
                  profileImage ||
                  "data:image/jpeg;base64,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"
                }
                alt="Avatar teacher"
              />
            </div>
            <i className="userlogged__avatar-icon">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
              </svg>
            </i>
          </div>
          <div
            className={`
        userlogged__dropdown dropdown ${showDropDown ? "active" : ""}
          `}
          >
            <div className="userlogged__dropdown-info">
              <div className="user__img">
                <img
                  src={
                    profileImage ||
                    "data:image/jpeg;base64,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"
                  }
                  alt="Avatar teacher"
                />
              </div>
              <Link to={PATHS.PROFILE.INDEX} className="user__info">
                <p className="title --t4">
                  <strong>{firstName}</strong>
                </p>
                <span className="email">Thông tin tài khoản</span>
              </Link>
            </div>
            <div className="userlogged__dropdown-list">
              <Link to={PATHS.PROFILE.MY_COURSE}>Khóa học của tôi</Link>
              <Link to={PATHS.PROFILE.MY_PAYMENT}>Lịch sử thanh toán</Link>
              <Link to={PATHS.CONTACT}>Hỗ trợ</Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Đăng xuất{" "}
                <i>
                  <img src="img/iconlogout.svg" alt />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* chưa đăng nhập sẽ hiện giao diện này */}
      <div class="header__auth">
        <div
          // href="javascript:void(0)"
          class="btn btn--transparent btnmodal"
          data-modal="mdlogin"
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleShowModal(MODAL_TYPE.register);
            }}
          >
            Đăng ký /&nbsp;
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleShowModal(MODAL_TYPE.login);
            }}
          >
            Đăng nhập
          </span>
        </div>
      </div>
      {/* user logged sau khi user login sẽ hiện ra giao diện 
      ở dưới
      */}
    </>
  );
};

export default HeaderAuthentic;
