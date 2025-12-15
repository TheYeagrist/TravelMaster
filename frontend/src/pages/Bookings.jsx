import { useState, useEffect } from "react";
import { bookings, packages as pkgApi } from "../utils/api";

export default function Bookings() {
  const [tab, setTab] = useState("create");
  const [myBookings, setMyBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [pkgs, setPkgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");

  const [bookingForm, setBookingForm] = useState({
    packageId: "",
    travelDate: "",
    peopleCount: 1,
    specialRequests: ""
  });

  useEffect(() => {
    if (token && tab === "my-bookings") {
      fetchMyBookings();
    } else if (token && tab === "all-bookings") {
      fetchAllBookings();
    } else if (tab === "create") {
      fetchPackages();
    }
  }, [tab, token]);

  const fetchPackages = async () => {
    try {
      const data = await pkgApi.list();
      setPkgs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const data = await bookings.myBookings(token);
      setMyBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setResult({ success: false, message: err.message });
    }
    setLoading(false);
  };

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const data = await bookings.allBookings(token);
      setAllBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setResult({ success: false, message: err.message });
    }
    setLoading(false);
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!token) {
      setResult({ success: false, message: "Please login first" });
      return;
    }
    setLoading(true);
    try {
      const data = await bookings.create(bookingForm, token);
      setResult({ success: true, message: "Booking created successfully!", data });
      setBookingForm({ packageId: "", travelDate: "", peopleCount: 1, specialRequests: "" });
    } catch (err) {
      setResult({ success: false, message: err.message });
    }
    setLoading(false);
  };

  if (!token && tab !== "create") {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">Please login to view your bookings</p>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📋 Bookings</h1>
          <p className="text-gray-600">Manage your travel bookings</p>
        </div>

        <div className="flex gap-2 mb-8 border-b">
          <button
            onClick={() => setTab("create")}
            className={`py-3 px-6 font-semibold transition border-b-2 ${
              tab === "create"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Create Booking
          </button>
          {token && (
            <>
              <button
                onClick={() => setTab("my-bookings")}
                className={`py-3 px-6 font-semibold transition border-b-2 ${
                  tab === "my-bookings"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setTab("all-bookings")}
                className={`py-3 px-6 font-semibold transition border-b-2 ${
                  tab === "all-bookings"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                All Bookings (Admin)
              </button>
            </>
          )}
        </div>

        {tab === "create" && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">New Booking</h2>
            <form onSubmit={handleCreateBooking}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Package</label>
                <select
                  value={bookingForm.packageId}
                  onChange={(e) => setBookingForm({ ...bookingForm, packageId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select a package</option>
                  {pkgs.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {pkg.title} - ₹{pkg.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Travel Date</label>
                  <input
                    type="date"
                    value={bookingForm.travelDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, travelDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Number of People</label>
                  <input
                    type="number"
                    min="1"
                    value={bookingForm.peopleCount}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, peopleCount: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Special Requests</label>
                <textarea
                  value={bookingForm.specialRequests}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, specialRequests: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Any special requests? (optional)"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Booking"}
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
                <p className={result.success ? "text-green-800" : "text-red-800"}>
                  {result.message}
                </p>
                {result.data && (
                  <pre className="mt-4 bg-white p-3 rounded text-xs overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}

        {tab === "my-bookings" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Your Bookings</h2>
            </div>
            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading...</div>
            ) : myBookings.length === 0 ? (
              <div className="p-8 text-center text-gray-600">No bookings yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Package
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        People
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myBookings.map((booking) => (
                      <tr key={booking._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {booking.packageId?.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {new Date(booking.travelDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{booking.peopleCount}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "all-bookings" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">All Bookings (Admin)</h2>
            </div>
            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading...</div>
            ) : allBookings.length === 0 ? (
              <div className="p-8 text-center text-gray-600">No bookings</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">User</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Package</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">People</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBookings.map((booking) => (
                      <tr key={booking._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{booking.userId?.name}</td>
                        <td className="px-4 py-3">{booking.packageId?.title}</td>
                        <td className="px-4 py-3">
                          {new Date(booking.travelDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">{booking.peopleCount}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
