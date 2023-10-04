import React from "react";
import useForm from "../../hooks/useForm";
import { regexRules, requireRules } from "../../utils/validate";
import Input from "../Input";
import Button from "../Button";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";
import { useState } from "react";
import ComponentLoading from "../ComponentLoading";
import { message } from "antd";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { handleShowModal, handleLogin } = useAuthContext();
  const { form, register, validate } = useForm(
    {
      password: "",
      email: "",
    },
    {
      email: [
        requireRules("Vui lòng nhập Email"),
        regexRules("email", "Vui lòng nhập đúng định dạng Email"),
      ],
      password: [requireRules("Vui lòng nhập mật khẩu ")],
    }
  );

  const _onSubmit = (e) => {
    e.preventDefault();
    console.log("submitForm with value", form);

    // Trước khi gửi dữ liệu di phải validate form có đúng dữ liệu hay không

    const errorObject = validate();

    // End Validate

    if (Object.keys(errorObject).length > 0) {
      console.log("submitError", errorObject);
    } else {
      setLoading(true);
      console.log("submitSuccess", form);
      handleLogin?.(form, () => {
        setTimeout(() => {
          // message.success("Submit ");
          setLoading(false);
        }, 2000);
      });
    }
  };
  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPE.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>

      <form onSubmit={_onSubmit} className="form">
        <div className="form-group">
          <Input
            label="Email"
            placeholder="Email"
            required
            {...register("email")}
          />
          {/* <p className="error">Email không được để trống</p> */}
        </div>
        <div className="form-group">
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            required
            {...register("password")}
          />
        </div>

        <Button className=" form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
