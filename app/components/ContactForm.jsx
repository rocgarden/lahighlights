"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simple email format check
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e) {
    e.preventDefault();
    const formEl = e.target;
    const honeypot = formEl.honeypot.value;
    setStatus(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("❌ All fields are required.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus("❌ Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot }),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          router.push("/"); // Redirect to homepage after 2 seconds
        }, 2000);
      } else {
        const { error } = await res.json();
        setStatus(`❌ ${error || "Failed to send message."}`);
      }
    } catch (err) {
      setStatus("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input type="text" name="honeypot" className="hidden" tabIndex="-1" autoComplete="off" />

      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full border px-3 py-2 rounded h-32"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
}

