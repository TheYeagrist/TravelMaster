import { useState, useEffect } from "react";
import { reviews, packages as pkgApi } from "../utils/api";

export default function Reviews() {
  const [pkgs, setPkgs] = useState([]);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [pkgReviews, setPkgReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");

  const [reviewForm, setReviewForm] = useState({
    packageId: "",
    rating: 5,
    comment: ""
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await pkgApi.list();
      setPkgs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectPackage = async (pkg) => {
    setSelectedPkg(pkg);
    setReviewForm({ ...reviewForm, packageId: pkg._id });
    setLoading(true);
    try {
      const data = await reviews.getPackageReviews(pkg._id);
      setPkgReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setPkgReviews([]);
    }
    setLoading(false);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      setResult({ success: false, message: "Please login first" });
      return;
    }
    setLoading(true);
    try {
      const data = await reviews.create(reviewForm, token);
      setResult({ success: true, message: "Review submitted successfully!", data });
      setReviewForm({ packageId: selectedPkg._id, rating: 5, comment: "" });
      // Refresh reviews
      const updatedReviews = await reviews.getPackageReviews(selectedPkg._id);
      setPkgReviews(Array.isArray(updatedReviews) ? updatedReviews : []);
    } catch (err) {
      setResult({ success: false, message: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⭐ Reviews</h1>
          <p className="text-gray-600">Rate and review travel packages</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Packages List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Packages</h2>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {pkgs.length === 0 ? (
                <div className="p-6 text-center text-gray-600">No packages available</div>
              ) : (
                pkgs.map((pkg) => (
                  <button
                    key={pkg._id}
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full text-left p-4 transition ${
                      selectedPkg?._id === pkg._id
                        ? "bg-blue-50 border-l-4 border-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-semibold text-gray-800 text-sm">{pkg.title}</p>
                    <p className="text-xs text-gray-500 mt-1">₹{pkg.price}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="lg:col-span-2">
            {!selectedPkg ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600 text-lg">Select a package to view and add reviews</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Add Review Form */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Add Your Review</h3>
                  {token ? (
                    <form onSubmit={handleSubmitReview}>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              className={`text-3xl transition ${
                                star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          You selected: {reviewForm.rating} star{reviewForm.rating !== 1 ? "s" : ""}
                        </p>
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Comment</label>
                        <textarea
                          value={reviewForm.comment}
                          onChange={(e) =>
                            setReviewForm({ ...reviewForm, comment: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          placeholder="Share your experience..."
                          rows="4"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                      >
                        {loading ? "Submitting..." : "Submit Review"}
                      </button>
                    </form>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                      <p className="text-blue-800 mb-3">Please login to add a review</p>
                      <a href="/auth" className="text-blue-600 font-semibold hover:underline">
                        Go to Login →
                      </a>
                    </div>
                  )}

                  {result && (
                    <div
                      className={`mt-4 p-4 rounded-lg ${
                        result.success
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <p className={result.success ? "text-green-800" : "text-red-800"}>
                        {result.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Reviews List */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Reviews ({pkgReviews.length})
                  </h3>
                  {loading ? (
                    <p className="text-gray-600">Loading reviews...</p>
                  ) : pkgReviews.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No reviews yet. Be the first!</p>
                  ) : (
                    <div className="space-y-4">
                      {pkgReviews.map((review) => (
                        <div key={review._id} className="border-b pb-4 last:border-b-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-gray-800">
                                {review.userId?.name || "Anonymous"}
                              </p>
                              <div className="flex gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={
                                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                                    }
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          {review.comment && (
                            <p className="text-gray-700 text-sm">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
