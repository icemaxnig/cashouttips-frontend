import { useEffect, useState } from "react";
import axios from "../api/axios";

export const useTips = (type = "today") => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/tips?type=${type}`)
      .then(res => {
        setTips(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [type]);

  return { tips, loading };
};
