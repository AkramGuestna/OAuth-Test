import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function AppleCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAppleCallback = async () => {
      try {
        // Apple returns both code and state in query parameters
        const code = router.query.code;
        const state = router.query.state;

        if (!code || !state) {
          throw new Error("Authorization code or state missing");
        }

        // Optional: Validate state parameter
        const storedState = sessionStorage.getItem("apple_oauth_state");
        if (state !== storedState) {
          throw new Error("Invalid state parameter");
        }

        // Send code to NestJS backend
        const response = await axios.post(
          `https://cultural-enrika-guestna-43d7043d.koyeb.app/auth/apple`,
          { code }
        );

        // Handle response
        const { token } = response.data;

        // Store token
        Cookies.set("auth_token", token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // Redirect to profile
        router.push("/profile");
      } catch (error) {
        console.error("Apple authentication failed:", error);
        router.push("/login?error=apple_auth_failed");
      }
    };

    handleAppleCallback();
  }, [router]);

  return <div>Processing Apple login...</div>;
}
