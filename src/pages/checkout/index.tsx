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
            bookingDay: "2025-03-15",
            userInfo: {
              name: "Ahmed Mostafa",
              email: email,
              phone: "500000000",
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
              city: "Ryiad",
              line: "line1",
              region: "region1",
              country: "SA",
              paymentType: "PAY_BY_INSTALMENTS",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={initiatePayment} className="w-full max-w-xs space-y-4">
        <div className="space-y-2">
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
            className="w-full px-4 py-2 text-[#2D3748] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbdfcb] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{ backgroundColor: "#fbdfcb" }}
          >
            {loading ? "Processing..." : "Tamara Pay"}
          </button>
        </div>
      </form>
    </div>
  );
}
