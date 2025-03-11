import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-tamara-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const { url } = await res.json();
      window.location.href = url.checkout_url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={initiatePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay 100 SAR with Tamara"}
    </button>
  );
}
