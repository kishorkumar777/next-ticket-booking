"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [bookingData, setBookingData] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, []);

  if (!bookingData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading booking details...</p>
      </main>
    );
  }

  const { ticket, quantity } = bookingData;
  const totalPrice = ticket.price * quantity;

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setCardNumber(value.slice(0, 16)); // Limit to 16 digits
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length > 4) return;

    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setCvv(value.slice(0, 3)); // Limit to 3 digits
  };

  const handlePayment = () => {
    if (cardNumber.length < 16 || expiry.length < 5 || cvv.length < 3) {
      alert("Please enter valid payment details!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("bookingData");
      setLoading(false);
      router.push("/confirmation");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment</h1>

        <div className="border-b pb-4 mb-4">
          <p className="text-lg"><strong>Ticket Type:</strong> {ticket.name}</p>
          <p className="text-lg"><strong>Quantity:</strong> {quantity}</p>
          <p className="text-lg font-semibold"><strong>Total Price:</strong> ₹{totalPrice}</p>
        </div>

        {/* Payment Form */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Card Number</label>
          <input
            type="text"
            maxLength="16"
            className="w-full p-2 border rounded"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-semibold mb-1">Expiry Date</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="MM/YY"
              maxLength="5"
              value={expiry}
              onChange={handleExpiryChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block font-semibold mb-1">CVV</label>
            <input
              type="text"
              maxLength="3"
              className="w-full p-2 border rounded"
              placeholder="123"
              value={cvv}
              onChange={handleCvvChange}
            />
          </div>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded text-lg mt-4"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ₹${totalPrice}`}
        </button>
      </div>
    </main>
  );
}