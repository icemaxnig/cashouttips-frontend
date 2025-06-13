import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const useTips = (type = "free") => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/tips?type=${type}`)
      .then(res => setTips(res.data.tips || []))
      .catch(() => toast.error("Failed to load tips"))
      .finally(() => setLoading(false));
  }, [type]);

  return { tips, loading };
};

export default useTips;
