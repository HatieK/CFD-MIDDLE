const REGEX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};

const validate = (rules, values) => {
  let errObj = {};
  for (const ruleKey in rules) {
    // FUNCTION

    // for in duyệt qua từng key trong object rules
    //  ruleKey = name và email (name và email là array) tương đương với key trong object rules
    for (const rule of rules[ruleKey]) {
      // For of duyệt qua từng giá trị của array đó (ở đây array là name và email)
      //  rule là required: true,message: "Vui lòng nhập tên",

      if (typeof rule === "function") {
        const message = rule(values[ruleKey], values);
        if (!!message) {
          errObj[ruleKey] = message || "Xác thực lỗi";
          break;
        }
      }
      // case: required
      if (rule.require) {
        // check required
        if (!!!values[ruleKey]) {
          // console.log("values[ruleKey]", values[ruleKey]);
          // values[ruleKey] = form.name nếu form.name = "" là false thì chạy
          // code ở dưới
          errObj[ruleKey] = rule.message || "Vui lòng nhập";
          break;
        }
      }

      if (rule.regex instanceof RegExp) {
        // rule.regex instanceof RegExp kiểm tra xem rule.regex nó đang có dạng regular expression hay không
        // check regex
        console.log("🚀rule.regex---->", rule.regex);

        if (!rule.regex.test(values[ruleKey])) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      } else if (rule.regex in REGEX) {
        //ví dụ rule.regex = email
        // thì rule.regex in REGEX sẽ kiểm tra email này có tồn tại trong Object REGEX hay ko
        if (!REGEX[rule.regex].test(values[ruleKey])) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      }
    }
  }

  return errObj;
};

export const requireRules = (message) => {
  return {
    // require tự tạo để check giá trị ô input require = true thì sẽ xuất ra lỗi
    //     // false thì sẽ ko check giá trị mà sẽ submit với giá trị ""
    require: true,
    message: message,
  };
};

export const regexRules = (regex, message) => {
  return {
    regex: regex,
    message: message,
  };
};

export default validate;
