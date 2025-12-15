import { useState } from "react";
import { payments, bookings as bookingsApi } from "../utils/api";

export default function Payments() {
  const [tab, setTab] = useState("init");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [bookingList, setBookingList] = useState([]);
  const token = localStorage.getItem("token");

  const [initForm, setInitForm] = useState({
    bookingId: ""
  });

  const [verifyForm, setVerifyForm] = useState({
    paymentId: "",
    orderId: ""
  });

  const handleInitPayment = async (e) => {
    e.preventDefault();
    if (!token) {
      setResult({ success: false, message: "Please login first" });
      return;
    }
    setLoading(true);
    try {
      const data = await payments.init(initForm, token);
      setResult({ success: true, message: "Payment initialized!", data });
    } catch (err) {
      setResult({ success: false, message: err.message });
    }
    setLoading(false);
  };

  const handleVerifyPayment = async (e) => {
    e.preventDefault();
    if (!token) {
      setResult({ success: false, message: "Please login first" });
      return;
    }
    setLoading(true);
    try {
      const data = await payments.verify(verifyForm, token);
      setResult({ success: true, message: "Payment verified!", data });
    } catch (err) {
      setResult({ success: false, message: err.message });
    }
    setLoading(false);
  };

  const fetchMyBookings = async () => {
    if (!token) return;
    try {
      const data = await bookingsApi.myBookings(token);
      setBookingList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">Please login to manage payments</p>
          <a href="/auth" className="text-blue-600 font-semibold">
            Go to Login →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💳 Payments</h1>
          <p className="text-gray-600">Payment processing and verification</p>
        </div>

        <div className="flex gap-2 mb-8 border-b">
          <button
            onClick={() => setTab("init")}
            className={`py-3 px-6 font-semibold transition border-b-2 ${
              tab === "init"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Initialize Payment
          </button>
          <button
            onClick={() => {
              setTab("verify");
              fetchMyBookings();
            }}
            className={`py-3 px-6 font-semibold transition border-b-2 ${
              tab === "verify"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Verify Payment
          </button>
        </div>

        {tab === "init" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Initialize Payment</h2>
              <form onSubmit={handleInitPayment}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Booking ID</label>
                  <input
                    type="text"
                    value={initForm.bookingId}
                    onChange={(e) => setInitForm({ ...initForm, bookingId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter booking ID"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Find your booking ID from your bookings list
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Initializing..." : "Initialize Payment"}
                </button>
              </form>

              {result && (
                <div
                  className={`mt-6 p-4 rounded-lg ${
                    result.success
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <p className={result.success ? "text-green-800 font-semibold" : "text-red-800"}>
                    {result.message}
                  </p>
                  {result.data && (
                    <pre className="mt-3 bg-white p-3 rounded text-xs overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>

            <div className="bg-indigo-50 rounded-lg p-8 border border-indigo-200">
              <h3 className="font-bold text-indigo-900 mb-4">📝 Payment Flow</h3>
              <ol className="space-y-3 text-sm text-indigo-800">
                <li className="flex gap-2">
                  <span className="font-bold flex-shrink-0">1.</span>
                  <span>Create a booking</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold flex-shrink-0">2.</span>
                  <span>Initialize payment with booking ID</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold flex-shrink-0">3.</span>
                  <span>Get payment session details</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold flex-shrink-0">4.</span>
                  <span>Verify payment to confirm booking</span>
                </li>
              </ol>

              <div className="mt-6 pt-6 border-t border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-2">Payment Status Types:</h4>
                <ul className="text-xs space-y-1 text-indigo-800">
                  <li>🟡 <strong>Pending</strong> - Waiting for payment</li>
                  <li>❌ <strong>Failed</strong> - Payment attempt failed</li>
                  <li>✅ <strong>Paid</strong> - Payment successful</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === "verify" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Verify Payment</h2>
              <form onSubmit={handleVerifyPayment}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Payment ID</label>
                  <input
                    type="text"
                    value={verifyForm.paymentId}
                    onChange={(e) => setVerifyForm({ ...verifyForm, paymentId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter payment ID"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Order ID</label>
                  <input
                    type="text"
                    value={verifyForm.orderId}
                    onChange={(e) => setVerifyForm({ ...verifyForm, orderId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter order ID"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify Payment"}
                </button>
              </form>

              {result && (
                <div
                  className={`mt-6 p-4 rounded-lg ${
                    result.success
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <p className={result.success ? "text-green-800 font-semibold" : "text-red-800"}>
                    {result.message}
                  </p>
                  {result.data && (
                    <pre className="mt-3 bg-white p-3 rounded text-xs overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="font-bold text-gray-800 mb-4">Your Bookings</h3>
              {bookingList.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No bookings found</p>
              ) : (
                <div className="space-y-3">
                  {bookingList.map((booking) => (
                    <div key={booking._id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <p className="font-semibold text-gray-800">{booking.packageId?.title}</p>
                      <p className="text-sm text-gray-600">
                        Booking ID: <span className="font-mono">{booking._id.slice(0, 8)}...</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Status:{" "}
                        <span
                          className={`font-semibold ${
                            booking.status === "pending"
                              ? "text-yellow-600"
                              : booking.status === "confirmed"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
