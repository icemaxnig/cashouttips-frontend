
import React, { useEffect, useRef } from "react";

const CloudflareTurnstile = ({ siteKey, onVerify }) => {
  const ref = useRef();

  useEffect(() => {
    const loadScript = () => {
      if (window.turnstile) {
        window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: onVerify,
          theme: "light",
        });
      } else {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          window.turnstile.render(ref.current, {
            sitekey: siteKey,
            callback: onVerify,
            theme: "light",
          });
        };
        document.body.appendChild(script);
      }
    };

    loadScript();
  }, [siteKey, onVerify]);

  return <div ref={ref} className="my-4" />;
};

export default CloudflareTurnstile;
