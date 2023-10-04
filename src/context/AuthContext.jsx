import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { authService } from "../services/authService";
import { message } from "antd";
import tokenMethod, { localToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/path";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(""); //register || login || ""
  const [profile, setProfile] = useState("");

  const handleShowModal = (modalType) => {
    setShowModal(modalType || "");
    // console.log("🚀1111---->", 1111);
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowModal("");
  };
  const handleLogin = async (loginData, callback) => {
    // xử lý payload
    const payload = { ...loginData };
    // xử lý api login
    try {
      const res = await authService.login(payload);

      ////////
      console.log("🚀res---->", res);
      if (res?.data?.data) {
        const { token: accessToken, refreshToken } = res.data.data || {};

        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        // lấy thông tin profile
        handleGetProfile();

        // Đóng modal & thông báo login success
        handleCloseModal();
        message.success("Login success");
      } else {
        console.log("🚀111111---->", 111111);
        message.error("Login Fail");
      }
    } catch (error) {
      console.log("🚀error---->", error);
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    const { name, email, password } = registerData || {};
    // payload
    const payload = {
      firstName: name,
      lastName: "",
      email,
      password,
    };
    console.log("🚀payload---->", payload);
    // api register
    try {
      const res = await authService.register(payload);
      console.log("🚀res---->", res);
      if (res?.data?.data?.id) {
        // handle login
        handleLogin({
          email,
          password,
        });
        message.success("Đăng Ký Thành Công");
      } else {
        message.error("Đăng Ký Không Được");
      }
    } catch (error) {
      console.log("🚀error---->", error);
      message.error("Đăng Ký Thất Bại");
    } finally {
      callback?.();
    }
  };

  const handleLogout = () => {
    tokenMethod.remove();
    navigate(PATHS.HOME);
    message.success("LogOut Success");
  };

  const handleGetProfile = async () => {
    try {
      const res = await authService.getProfile();

      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("🚀error---->", error);
      handleLogout();
    }
  };
  useEffect(() => {
    if (!!tokenMethod.get()?.accessToken) {
      handleGetProfile();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        showModal,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogout,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
