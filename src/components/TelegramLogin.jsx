import React, { useEffect } from "react";

const TelegramLogin = ({ onSuccess, botUsername }) => {
  useEffect(() => {
    if (!botUsername) {
      console.warn("❌ No botUsername provided to TelegramLogin");
      return;
    }

    console.log("✅ Loading Telegram widget for bot:", botUsername);

    window.TelegramLoginWidget = {
      dataOnauth: user => {
        console.log("✅ Telegram login success:", user);
        localStorage.setItem("telegram_user", JSON.stringify(user));
        onSuccess();
      }
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "TelegramLoginWidget.dataOnauth(user)");
    script.async = true;

    const container = document.getElementById("telegram-login");
    if (container) container.innerHTML = ""; // reset if reloaded
    container?.appendChild(script);
  }, [onSuccess, botUsername]);

  return <div id="telegram-login" className="flex justify-center mt-4"></div>;
};

export default TelegramLogin;
