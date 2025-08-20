import { useEffect, useState } from "react";
import API from "../utils/api";

export default function UserPanel() {
  const [dustbins, setDustbins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch dustbins
  useEffect(() => {
    const fetchDustbins = async () => {
      try {
        const res = await API.get("/dustbins");
        setDustbins(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDustbins();
  }, []);

  // Report dustbin issue
  const handleReport = async (dustbinId) => {
    try {
      await API.post("/reports", {
        user: "USER_ID_HERE", // replace with logged-in user ID from context/auth
        dustbin: dustbinId,
        message: "Dustbin is full / needs cleaning",
      });
      setMessage("✅ Report submitted successfully!");
    } catch (error) {
      setMessage("❌ Failed to submit report");
    }
  };

  if (loading) return <p className="text-center">Loading dustbins...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Nearby Dustbins</h2>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <div className="grid gap-4">
        {dustbins.map((bin) => (
          <div key={bin._id} className="p-4 border rounded-lg shadow bg-white flex justify-between items-center">
            <div>
              <p className="font-semibold">📍 {bin.location}</p>
              <p>Status: <span className="text-green-700">{bin.status}</span></p>
            </div>
            <button
              onClick={() => handleReport(bin._id)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Report Issue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
