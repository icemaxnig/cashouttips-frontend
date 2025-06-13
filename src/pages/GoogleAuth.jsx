
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const GoogleAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", "?"));
    const accessToken = params.get("access_token");

    if (!accessToken) {
      alert("Google authentication failed.");
      return navigate("/login");
    }

    api.post("/auth/google", { token: accessToken })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        } else {
          alert("Google login failed: No token returned");
        }
      })
      .catch((err) => {
        console.error("Google login error:", err);
        alert("Google login failed. Please try again.");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E2C] text-white">
      <p>Logging in with Google...</p>
    </div>
  );
};

export default GoogleAuth;
