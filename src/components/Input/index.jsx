import React from "react";

const Input = ({ label, required, error, renderInput, ...rest }) => {
  // require để quyết định dấu * có hiển thị hay không
  // label để quyết định nhãn có hiển thị hay không
  // error để quyết định thông báo lỗi hiển thị hay không
  //   ...rest là những prop còn lại trong ô input
  return (
    <div className="form-group">
      <label className="label">
        {label} {required && <span>*</span>}
      </label>

      {/* class css formerror (làm cho ô input có focus màu đỏ) để cho chúng ta biết ô input đó có lỗi hay không
      vì vậy ta sẽ đưa class này vào toán tử 3 ngôi để ô input có lỗi thì add thêm 
      class này vào, không thì thôi
      */}

      {/* Component Input nào có prop renderInput thì sẽ render ra thẻ select
nếu không thì sẽ render ra input
*/}

      {renderInput?.({ error, ...rest }) || (
        <input
          type="text"
          {...rest}
          className={`form__input ${error ? "formerror" : ""}`}
        />
      )}

      {/* error có lỗi là true thì lấy giá trị thẻ p in ra giao diện,
      error là false tức là không có lỗi thì không hiện thẻ p */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
