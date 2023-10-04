import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import validate, { regexRules } from "../../utils/validate";
import { requireRules } from "../../utils/validate";
import useForm from "../../hooks/useForm";

// rules là những giá trị trong ô input đó cần để validate
const rules = {
  name: [requireRules("Vui lòng nhập tên")],

  email: [
    requireRules("Vui lòng nhập Email"),
    regexRules("email", "Vui lòng nhập đúng định dạng Email"),
  ],

  // phone: [
  //   {
  //     require: true,
  //     message: "Vui lòng nhập Phone",
  //   },

  //   {
  //     regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
  //     message: "Vui lòng nhập đúng dịnh dạng Phone",
  //   },
  // ],
  phone: [
    requireRules("Vui lòng nhập Phone"),
    regexRules("phone", "Vui lòng nhập đúng định dạng Phone"),
  ],
  topic: [requireRules("Vui lòng nhập hỗ trợ")],
  content: [requireRules("Vui lòng nhập nội dung")],
};

const ContactForm = ({ handleSubmit }) => {
  const { form, error, register, validate } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      topic: "",
      content: "",
    },
    rules
  );

  const _onSubmit = () => {
    console.log("submitForm with value", form);

    // Trước khi gửi dữ liệu di phải validate form có đúng dữ liệu hay không

    const errorObject = validate();

    // End Validate

    if (Object.keys(errorObject).length > 0) {
      console.log("submitError", errorObject);
    } else {
      console.log("submitSuccess", form);
      handleSubmit?.(form);
    }
  };

  const _onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectTopic = (e) => {
    const { value } = e.target;
    console.log(e.target);
    console.log("value", value);
    setForm({ ...form, topic: value });
  };

  // const inputInitialProps = {
  //   error: error[name],
  //   value: form[name],
  //   onChange: (e) => setForm({ ...form, [name]: e.target.value }),
  // };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input
        // name="name"
        label="Họ và tên"
        required
        placeholder="Họ và tên"
        // value={form.name}
        // error={error.name}
        // onChange={_onChange}
        {...register("name")}
      />
      <Input
        label="Email"
        required
        placeholder="Email"
        // name="email"
        // value={form.email}
        // error={error.email}
        // onChange={_onChange}
        {...register("email")}
      />
      <Input
        // name="phone"
        label="Phone"
        required
        placeholder="Phone"
        // value={form.phone}
        // error={error.phone}
        // onChange={_onChange}
        {...register("phone")}
      />
      <Input
        label="Chủ đề cần hỗ trợ"
        required
        error={error.topic}
        // name="topic"
        // onChange={handleSelectTopic}
        // value={form.topic}
        renderInput={(inputProps) => {
          return (
            <Select
              // Options theo dạng mảng vì phải duyệt theo list mà cứ list thì
              // dùng array còn lại tùy vào kiểu dữ liệu truyền vào trong mảng
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJs" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
        {...register("topic")}
      />
      <Input
        label="Nội Dung"
        required
        onChange={_onChange}
        // error={error.content}
        // name="content"
        // value={form.content}
        {...register("content")}
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
      />
      <div className="btncontrol">
        <Button variant="primary" onClick={_onSubmit}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
