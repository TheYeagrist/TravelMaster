import { useState } from "react";

export default function Home() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/health");
      const data = await res.json();
      setHealth(data);
    } catch (err) {
      setHealth({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">🌄 TravelMaster</h1>
          <p className="text-xl text-gray-600">Travel Backend Demo - Full API Integration</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Backend Health</h2>
          <button
            onClick={checkHealth}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Backend Health"}
          </button>
          
          {health && (
            <pre className="bg-gray-100 p-4 rounded mt-4 overflow-auto text-sm">
              {JSON.stringify(health, null, 2)}
            </pre>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">📦 Packages</h3>
            <p className="text-gray-600 mb-4">Browse travel packages and view details</p>
            <a href="/packages" className="text-blue-600 font-semibold hover:underline">
              View Packages →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">🔐 Auth</h3>
            <p className="text-gray-600 mb-4">Register, login and manage authentication</p>
            <a href="/auth" className="text-blue-600 font-semibold hover:underline">
              Go to Auth →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">📋 Bookings</h3>
            <p className="text-gray-600 mb-4">Create and manage travel bookings</p>
            <a href="/bookings" className="text-blue-600 font-semibold hover:underline">
              View Bookings →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">💳 Payments</h3>
            <p className="text-gray-600 mb-4">Payment processing and verification</p>
            <a href="/payments" className="text-blue-600 font-semibold hover:underline">
              Manage Payments →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">⭐ Reviews</h3>
            <p className="text-gray-600 mb-4">Rate and review travel packages</p>
            <a href="/reviews" className="text-blue-600 font-semibold hover:underline">
              View Reviews →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">💬 Enquiries</h3>
            <p className="text-gray-600 mb-4">Submit travel enquiries and questions</p>
            <a href="/enquiries" className="text-blue-600 font-semibold hover:underline">
              Contact Us →
            </a>
          </div>
        </div>

        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mt-8 rounded">
          <h3 className="font-bold text-indigo-900 mb-2">🚀 API Endpoints</h3>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• POST /api/auth/register - Register user</li>
            <li>• POST /api/auth/login - Login user</li>
            <li>• GET /api/packages - List packages</li>
            <li>• POST /api/bookings - Create booking</li>
            <li>• POST /api/payments/init - Initialize payment</li>
            <li>• POST /api/reviews - Create review</li>
            <li>• POST /api/enquiries - Submit enquiry</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
