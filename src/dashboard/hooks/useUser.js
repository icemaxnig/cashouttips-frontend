import { useAuth } from "../context/AuthContext";

export const useUser = () => {
  const { user, logout } = useAuth();
  return { user, logout };
};
