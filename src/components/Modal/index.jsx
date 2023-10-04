import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ReactDOM from "react-dom";

const Modal = () => {
  const { showModal, handleCloseModal } = useAuthContext();
  return ReactDOM.createPortal(
    <>
      <div className={`modal modallogin  ${!!showModal ? "open" : ""}`}>
        <div className="modal__wrapper">
          <div className="modal__wrapper-close" onClick={handleCloseModal}>
            <img src="/img/close_icon.svg" alt="CFD Register" />
          </div>

          {showModal === MODAL_TYPE.login && <LoginForm />}

          {showModal === MODAL_TYPE.register && <RegisterForm />}
        </div>
        <div className="modal__overlay" onClick={handleCloseModal} />
      </div>
    </>,
    document.body
  );
};

export default Modal;
