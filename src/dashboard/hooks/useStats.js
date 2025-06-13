import { useEffect, useState } from "react";
import axios from "../api/axios";

export const useStats = () => {
  const [stats, setStats] = useState({
    plans: 0,
    tipsToday: 0,
    usersSubscribed: 0,
    telegramLink: "https://t.me/cashouttips_bot"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/stats/dashboard")
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { ...stats, loading };
};
