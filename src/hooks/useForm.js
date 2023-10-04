import React from "react";
import validate from "../utils/validate";
import { useState } from "react";

const useForm = (initialValue, rules) => {
  // State chứa giá trị ban đầu của ô input
  const [form, setForm] = useState(initialValue);
  // State chứa giá trị error của ô input
  const [error, setError] = useState({});
  const register = (registerField) => {
    return {
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const _validate = () => {
    const errObject = validate(rules, form);
    setError(errObject);
    return errObject;
  };
  return {
    form,
    error,
    register,
    validate: _validate,
  };
};

export default useForm;
