import TamaraWidget from "@/componnents/TamaraWidget";
import { useState, useRef, FormEvent } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);

  const initiatePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(
        "https://cultural-enrika-guestna-43d7043d.koyeb.app/bookings/initiationguestnaTripBooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            lang: "en",
          },
          body: JSON.stringify({
            paymentMethod: "TAMARA",
            trip: "677d07071f7657cd73e507fa",
            bookingDay: "2025-06-10",
            userInfo: {
              name: "Ahmed Mostafa",
              email: email,
              phone: "+966500000000",
            },
            targetAudiences: [
              {
                targetAudience: "67225c87d9e42dad5af274e6",
                quantity: 1,
              },
            ],
            redirectUrl: "https://guestna.vercel.app/ar/bookingStatus",
            isSMSupdates: false,
            tamaraUserInfo: {
              phone: "500000000",
              country: "SA",
            },
          }),
        }
      );

      const { transactionUrl } = await res.json();
      window.location.href = transactionUrl;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-8">
      <div className="w-full max-w-md space-y-4">
        <TamaraWidget
          price={250}
          publicKey="f2f0be48-09de-47d7-aea4-257480336aad"
          lang="en"
          currency="SAR"
          paymentType="installment"
        />
      </div>
      <form onSubmit={initiatePayment} className="w-full max-w-xs space-y-4">
        <div className="space-y-2">
          {/* <TamaraWidget amount={1000} currency="SAR" /> */}

          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className=" h-10 px-12 bg-no-repeat bg-center mx-auto block"
            style={{
              backgroundImage:
                "url('https://cdn.tamara.co/widget-v2/assets/tamara-grad-en.ac5bf912.svg')",
              backgroundSize: "contain", // Show full image without crop
            }}
          ></button>
        </div>
      </form>
    </div>
  );
}
