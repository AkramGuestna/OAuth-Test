import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function AppleCallback() {
  const router = useRouter();

  // في ملف AppleCallback
  useEffect(() => {
    const handleAppleCallback = async () => {
      try {
        // انتظر حتى يصبح الـ router جاهزًا (مهم في Next.js)
        if (!router.isReady) return;

        const { code } = router.query;

        if (!code) {
          throw new Error("Authorization code or state missing");
        }

        // // تحقق من تطابق الـ state مع المخزن
        // const storedState = sessionStorage.getItem("apple_oauth_state");
        // if (state !== storedState) {
        //   throw new Error("Invalid state parameter");
        // }

        // أرسل الـ code إلى الخادم
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
  }, [router, router.isReady]); // <-- تأكد من إضافة router.isReady هنا
  return <div>Processing Apple login...</div>;
}
