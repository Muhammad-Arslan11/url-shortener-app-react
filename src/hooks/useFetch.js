import {useState, useCallback} from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options, ...args);
      // console.log(response)
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  },[cb,options]);

  return {data, loading, error, fn};
};

export default useFetch;