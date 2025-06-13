import { useEffect, useState } from "react";
import axios from "../api/axios";

export const useReferrals = () => {
  const [bonus, setBonus] = useState(0);
  const [refCode, setRefCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/referrals/me")
      .then(res => {
        setBonus(res.data.bonus || 0);
        setRefCode(res.data.code || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { bonus, refCode, loading };
};
