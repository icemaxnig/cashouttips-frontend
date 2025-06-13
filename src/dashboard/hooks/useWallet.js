import { useEffect, useState } from "react";
import axios from "../api/axios";

export const useWallet = () => {
  const [wallet, setWallet] = useState({ balance: 0, bonus: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wallet')
      .then(res => {
        setWallet(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { ...wallet, loading };
};
