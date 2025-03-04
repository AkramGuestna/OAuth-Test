import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    // Construct Google OAuth URL
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set(
      "client_id",
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string
    );
    authUrl.searchParams.set(
      "redirect_uri",
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string
    );
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("access_type", "offline");
    authUrl.searchParams.set("prompt", "consent");

    window.location.href = authUrl.toString();
  };

  // Check for existing token
  useEffect(() => {
    if (Cookies.get("auth_token")) {
      router.push("/profile");
    }
  }, [router]);

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Continue with Google</button>
    </div>
  );
}
