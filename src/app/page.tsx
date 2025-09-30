"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Debug: Log the button state
  console.log('Button disabled state:', !isClient || isSubmitting || inputValue.trim() === "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/events/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: inputValue }),
      });

      if (response.ok) {
        setMessage("Event sent successfully!");
        setInputValue("");
      } else {
        setMessage("Failed to send event. Please try again.");
      }
    } catch {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send Event Message
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter a message to trigger an Inngest event
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <input
              id="message"
              name="message"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={!isClient || isSubmitting || inputValue.trim() === ""}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Event"}
            </button>
          </div>
          {message && (
            <div
              className={`text-center text-sm ${
                message.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
