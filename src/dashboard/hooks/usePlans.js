import { useEffect, useState } from "react";
import axios from "../api/axios";

export const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/plans")
      .then(res => {
        setPlans(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { plans, loading };
};
