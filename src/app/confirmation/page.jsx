"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Generate a random booking reference number
    const refNumber = "BZ-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceNumber(refNumber);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100  text-gray-700 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
        <p className="text-lg text-gray-700">Thank you for booking your visit to Bannerghatta Zoo.</p>
        <p className="text-lg font-semibold mt-4">Your Booking Reference:</p>
        <p className="text-xl font-bold bg-gray-200 p-2 rounded-lg mt-2">{referenceNumber}</p>

        <button
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded text-lg"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
