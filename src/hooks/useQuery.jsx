import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const useQuery = (promise, dependencies = []) => {
  // state lưu trữ giá trị các khóa học
  const [data, setData] = useState();

  // // state lưu trữ phần loading
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState();
  const fetch = async () => {
    try {
      //   const { data } = await axios.get(
      //     "https://cfdcourses.cfdcircle.vn/api/v1/courses"
      //   );
      const { data } = await promise();

      if (data) {
        setData(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, dependencies);
  return {
    data,
    error,
    loading,
    // refetch dùng để gọi lại hàm fetch call lại api
    refetch: fetch,
  };
};

export default useQuery;
