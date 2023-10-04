import React from "react";
// import PageLoading from "../../components/PageLoading";
import Headers from "../../components/Header";
import Navbar from "../../components/Navbar";
import Overlay from "../../components/Overlay";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import { Outlet } from "react-router-dom";
import MainContextProvider from "../../context/MainContext";
import AuthContextProvider from "../../context/AuthContext";

// Tạo MainLayout vì đây là thành phần mà bất cứ trang nào cũng có
const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        {/* <PageLoading /> */}
        <Headers />
        <Navbar />
        <Overlay />
        <Outlet />
        <Footer />
        <Modal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
