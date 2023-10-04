import React from "react";
import { MODAL_TYPE } from "../../constants/general";
import useForm from "../../hooks/useForm";
import { useAuthContext } from "../../context/AuthContext";
import { regexRules, requireRules } from "../../utils/validate";
import Input from "../Input";
import { PATHS } from "../../constants/path";
import Button from "../Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import ComponentLoading from "../ComponentLoading";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const { handleShowModal, handleCloseModal, handleRegister } =
    useAuthContext();
  const { form, register, validate } = useForm(
    { name: "", confirmPassword: "", password: "", email: "" },
    {
      name: [requireRules("Vui lòng nhập tên")],

      email: [
        requireRules("Vui lòng nhập Email"),
        regexRules("email", "Vui lòng nhập đúng định dạng Email"),
      ],
      password: [requireRules("Vui lòng nhập mật khẩu ")],
      confirmPassword: [
        requireRules("Vui lòng nhập xác nhận mật khẩu "),
        (value, values) => {
          if (values.password && value !== values.password) {
            return "Confirm Password is incorrect";
          }
          return false;
        },
      ],
    }
  );

  const _onSubmit = (e) => {
    e.preventDefault();

    // Trước khi gửi dữ liệu di phải validate form có đúng dữ liệu hay không

    const errorObject = validate();

    // End Validate

    if (Object.keys(errorObject).length > 0) {
      console.log("submitError", errorObject);
    } else {
      console.log("submitSuccess", form);
      if (typeof handleRegister === "function") {
        setLoading(true);
        handleRegister(form, () => {
          setLoading(false);
          // xử lý loading
        });
      }
    }
  };
  return (
    <div
      className="modal__wrapper-content mdregister active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onClick={() => handleShowModal(MODAL_TYPE.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>

      <form onSubmit={_onSubmit} className="form">
        <Input
          label="Email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <Input
          label="Họ và tên"
          placeholder="Họ và tên"
          required
          {...register("name")}
        />
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          required
          {...register("password")}
        />
        <Input
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          required
          {...register("confirmPassword")}
        />
        {/* <div className="form-group">
          <input
            defaultValue
            type="email"
            className="form__input"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            defaultValue
            type="password"
            className="form__input"
            placeholder="Mật khẩu"
          />
        </div>
        <div className="form-group">
          <input
            defaultValue
            type="password"
            className="form__input"
            placeholder="Xác nhận mật khẩu"
          />
        </div> */}
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <Link
            className="color--primary"
            to={PATHS.PRIVACY}
            onClick={handleCloseModal}
          >
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className=" form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
