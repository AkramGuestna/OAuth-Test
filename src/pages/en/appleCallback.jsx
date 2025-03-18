import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function AppleCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAppleCallback = async () => {
      try {
        if (!router.isReady) return;

        const { code } = router.query;

        if (!code) {
          throw new Error("Authorization code or state missing");
        }

        const response = await axios.post(
          `https://cultural-enrika-guestna-43d7043d.koyeb.app/auth/apple`,
          { code }
        );

        const { token } = response.data;

        Cookies.set("auth_token", token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        router.push("/profile");
      } catch (error) {
        console.error("Apple authentication failed:", error);
        router.push("/login?error=apple_auth_failed");
      }
    };

    handleAppleCallback();
  }, [router, router.isReady]);
  return <div>Processing Apple login...</div>;
}
