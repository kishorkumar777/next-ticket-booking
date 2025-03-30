"use client";
import { useState } from "react";

const ticketTypes = [
  { id: 1, name: "Zoo Entry", price: 200 },
  { id: 2, name: "Safari", price: 500 },
];

const safariTimings = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

export default function BookingPage() {
  const [selectedTicket, setSelectedTicket] = useState(ticketTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedTime, setSelectedTime] = useState(safariTimings[0]);

  const handleProceed = () => {
    const bookingData = {
      ticket: selectedTicket,
      quantity,
      safariTime: selectedTicket.name === "Safari" ? selectedTime : null,
    };
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    window.location.href = "./summary";
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6  text-gray-800">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold  mb-4">Book Your Ticket</h1>
        
        {/* Ticket Type Selection */}
        <label className="block text-lg font-semibold mb-2">Select Ticket Type:</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedTicket.id}
          onChange={(e) =>
            setSelectedTicket(ticketTypes.find(t => t.id === parseInt(e.target.value)))
          }
        >
          {ticketTypes.map((ticket) => (
            <option key={ticket.id} value={ticket.id}>
              {ticket.name} - ₹{ticket.price}
            </option>
          ))}
        </select>

        {/* Quantity Selection */}
        <label className="block text-lg font-semibold mb-2">Select Quantity:</label>
        <input
          type="number"
          min="1"
          max="10"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Safari Timing (Only for Safari tickets) */}
        {selectedTicket.name === "Safari" && (
          <>
            <label className="block text-lg font-semibold mb-2">Select Safari Timing:</label>
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {safariTimings.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Proceed Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded text-lg"
          onClick={handleProceed}
        >
          Proceed to Summary
        </button>
      </div>
    </main>
  );
}
