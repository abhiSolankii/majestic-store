import { useState } from "react";
import axios from "axios";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);

  const apiRequest = async (method, path, data = null) => {
    const baseURL = "https://fakestoreapi.com";
    const url = `${baseURL}${path}`;

    setLoading(true);
    try {
      const response = await axios({
        method,
        url,
        data,
      });
      return response;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { apiRequest, loading };
};

export default useApiRequest;
