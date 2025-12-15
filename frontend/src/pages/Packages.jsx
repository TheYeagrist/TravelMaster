import { useState, useEffect } from "react";
import { packages } from "../utils/api";

export default function Packages() {
  const [pkgs, setPkgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPkg, setSelectedPkg] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await packages.list();
      setPkgs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setPkgs([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📦 Travel Packages</h1>
          <p className="text-gray-600">Discover amazing travel packages</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading packages...</p>
          </div>
        ) : pkgs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No packages available yet.</p>
            <p className="text-sm text-gray-500">Admin can create packages via API</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkgs.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedPkg(pkg)}
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-40 flex items-center justify-center text-white text-2xl">
                  🏔️
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">₹{pkg.price}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {pkg.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {pkg.dates?.length > 0 && (
                    <p className="text-xs text-gray-500 mt-3">{pkg.dates.length} dates available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedPkg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedPkg.title}</h2>
                <button
                  onClick={() => setSelectedPkg(null)}
                  className="text-2xl cursor-pointer hover:bg-white hover:bg-opacity-20 w-8 h-8 flex items-center justify-center rounded"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600 text-sm">Price</p>
                    <p className="text-2xl font-bold text-green-600">₹{selectedPkg.price}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600 text-sm">Slug</p>
                    <p className="font-mono text-sm">{selectedPkg.slug}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedPkg.description}</p>
                </div>

                {selectedPkg.itinerary && (
                  <div className="mb-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Itinerary</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedPkg.itinerary}</p>
                  </div>
                )}

                {selectedPkg.inclusions?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Inclusions</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {selectedPkg.inclusions.map((inc, i) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedPkg.exclusions?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Exclusions</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {selectedPkg.exclusions.map((exc, i) => (
                        <li key={i}>{exc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-8 pt-4 border-t">
                  <p>Created: {new Date(selectedPkg.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
