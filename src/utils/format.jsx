import { DATE_FORMAT } from "../constants/format";
import moment from "moment";

export const formatDay = (date, format = DATE_FORMAT) => {
  if (!date) return "";
  return moment(date).format(format);
};

export const formatCurrency = (data, type = "vi-VN") => {
  if (!data || isNaN(data)) return 0;

  return data.toLocaleString(type);
};
