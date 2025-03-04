import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const code = router.query.code;

        if (!code) {
          throw new Error("Authorization code missing");
        }

        // Send code to NestJS backend
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
          { code }
        );

        // Handle response
        const { token } = response.data;

        // Store token
        Cookies.set("auth_token", token);

        // Redirect to appropriate page
        router.push("/profile");
      } catch (error) {
        router.push("/login?error=google_auth_failed");
      }
    };

    handleGoogleCallback();
  }, [router]);

  return <div>Processing Google login...</div>;
}
