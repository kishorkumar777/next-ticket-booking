"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingSummary() {
  const [bookingData, setBookingData] = useState(null);
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

  const { ticket, quantity, safariTime } = bookingData;
  const totalPrice = ticket.price * quantity;

  const handleProceedToPayment = () => {
    router.push("/payment");
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Summary</h1>

        <div className="border-b pb-4 mb-4">
          <p className="text-lg"><strong>Ticket Type:</strong> {ticket.name}</p>
          <p className="text-lg"><strong>Quantity:</strong> {quantity}</p>
          {safariTime && <p className="text-lg"><strong>Safari Time:</strong> {safariTime}</p>}
          <p className="text-lg font-semibold"><strong>Total Price:</strong> ₹{totalPrice}</p>
        </div>

        <button
          className="w-full bg-green-600 text-white py-2 rounded text-lg"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </button>
      </div>
    </main>
  );
}
