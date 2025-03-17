export default function LoginApplePage() {
    const generateState = () => {
      const array = new Uint32Array(10);
      crypto.getRandomValues(array);
      const state = Array.from(array, dec => ('0' + dec.toString(16)).slice(-2)).join('');
      sessionStorage.setItem('apple_oauth_state', state);
      return state;
    };
  
    const handleAppleLogin = () => {
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID!,
        redirect_uri: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI!,
        response_type: 'code',
        scope: 'openid',
        response_mode: 'query',
        state: generateState()
      });
  
      window.location.href = `https://appleid.apple.com/auth/authorize?${params}`;
    };
  
    return (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
        }}
      >
        <button
          onClick={handleAppleLogin}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Continue with Apple
        </button>
      </div>
    );
  }