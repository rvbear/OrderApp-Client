export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.accounts) {
      reject(new Error("Google API가 로드되지 않았습니다."));
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response) => {
        if (response.credential) {
          const decoded = jwtDecode(response.credential);
          resolve(decoded);
        } else {
          reject(new Error("인증 정보가 없습니다."));
        }
      },
    });

    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        reject(
          new Error("사용자가 Google 로그인 창을 닫았거나 표시할 수 없습니다.")
        );
      }
    });
  });
};
