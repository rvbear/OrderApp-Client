import React from "react";

const OauthPage = () => {
  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <div>
      <button onClick={handleLogin}>구글 로그인</button>
    </div>
  );
};

export default OauthPage;
