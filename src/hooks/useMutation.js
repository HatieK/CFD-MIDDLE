import React from "react";
import { useState } from "react";

const useMutation = (promise) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  //   hàm onSuccess và onFail để cho component nơi
  //  gọi hàm đó sẽ quyết định sau khi setData lại thì sẽ phải làm gì

  const execute = async (payload, { onSuccess, onFail }) => {
    setLoading(true);
    try {
      const { data } = await promise(payload);
      if (data) {
        setData(data);
        onSuccess?.(data);
      }
    } catch (error) {
      setError(error);
      onFail?.(error);
    }
  };

  return {
    execute,
    data: data,
    loading: loading,
    error: error,
  };
};

export default useMutation;
