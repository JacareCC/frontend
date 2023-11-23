import React, {useState, useEffect} from "react";
import { hasCookie, setCookie } from "cookies-next";

export default function CookieConsent ({ onAccept }) {
  const [showConsent, setShowConsent] = useState<boolean>(true);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted) {
      setShowConsent(false);
    }
  }, []);

  function acceptCookies(){
    localStorage.setItem('cookiesAccepted', 'true');
    setShowConsent(false);
    onAccept();
  };

  return (
    <div className={`fixed bottom-0 w-full p-4 bg-gray-800 text-white ${showConsent ? 'cookie-tab' : 'hidden'}`}>
      {showConsent && (
        <div className="cookie-tab-content">
          <p>This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy.</p>
          <button onClick={acceptCookies} className="ml-4 bg-green-500 text-white p-2 rounded">Accept</button>
        </div>
      )}
    </div>
  );
};

