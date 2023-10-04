import React from "react";
import tokenMethod from "../../utils/token";
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";

const PrivateRoute = ({ reDirectPath = "" }) => {
  const { handleShowModal } = useAuthContext();
  const navigate = useNavigate();
  if (!!!tokenMethod.get()) {
    handleShowModal?.(MODAL_TYPE.login);
    if (reDirectPath) {
      return <Navigate to={reDirectPath} />;
    } else {
      navigate(-1);
    }
  }
  return <Outlet />;
};

export default PrivateRoute;
