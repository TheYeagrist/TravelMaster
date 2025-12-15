import { useState } from "react";
import { enquiries } from "../utils/api";

export default function Enquiries() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    source: "web"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await enquiries.submit(form);
      setResult({ success: true, message: "Enquiry submitted successfully!", data });
      setForm({ name: "", email: "", phone: "", message: "", source: "web" });
    } catch (err) {
      setResult({ success: false, message: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💬 Enquiries</h1>
          <p className="text-gray-600">Have questions? Get in touch with us!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-3xl mb-2">📧</p>
            <p className="text-gray-600 text-sm">Email us anytime</p>
            <p className="font-semibold text-gray-800">support@travelmaster.com</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-3xl mb-2">📱</p>
            <p className="text-gray-600 text-sm">Call us</p>
            <p className="font-semibold text-gray-800">+91 9999 999 999</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-3xl mb-2">⏰</p>
            <p className="text-gray-600 text-sm">Response time</p>
            <p className="font-semibold text-gray-800">24 hours</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us an Enquiry</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="+91 9999 999 999"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Source</label>
              <select
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="web">Website</option>
                <option value="instagram">Instagram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Message *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Tell us about your travel enquiry..."
                rows="6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Enquiry"}
            </button>
          </form>

          {result && (
            <div
              className={`mt-6 p-6 rounded-lg ${
                result.success
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`font-semibold mb-2 ${
                  result.success ? "text-green-800" : "text-red-800"
                }`}
              >
                {result.message}
              </p>
              {result.data && (
                <pre className="bg-white p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h3 className="font-bold text-blue-900 mb-3">About Enquiries</h3>
          <p className="text-blue-800 text-sm mb-3">
            Our enquiry system collects your contact information and message, which helps us understand your travel needs and respond promptly.
          </p>
          <p className="text-blue-800 text-sm">
            <strong>Data sources we track:</strong> Web form, Instagram, WhatsApp, and other channels.
          </p>
        </div>
      </div>
    </div>
  );
}
