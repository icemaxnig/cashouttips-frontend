import axios from "axios";

export const fetchAllPlans = async () => {
  const res = await axios.get("/api/rollover/plans");
  return res.data;
};

export const fetchUserRolloverPlans = async (userId) => {
  const res = await axios.get(`/api/rollover/my?userId=${userId}`);
  return res.data;
};

export const subscribeToPlan = async (userId, planId) => {
  const res = await axios.post("/api/rollover/subscribe", { userId, planId });
  return res.data;
};

export const fetchDailyTip = async (userId) => {
  const res = await axios.get(`/api/rollover/daily-tip?userId=${userId}`);
  return res.data;
};
