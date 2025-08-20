import { useEffect, useState } from "react";
import API from "../utils/api";

export default function AdminPanel() {
  const [reports, setReports] = useState([]);
  const [dustbins, setDustbins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reports & dustbins
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resReports = await API.get("/reports");
        const resDustbins = await API.get("/dustbins");
        setReports(resReports.data);
        setDustbins(resDustbins.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update dustbin status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/dustbins/${id}`, { status });
      setDustbins((prev) =>
        prev.map((bin) => (bin._id === id ? { ...bin, status } : bin))
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center">Loading admin data...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 grid gap-8">
      {/* Reports Section */}
      <div>
        <h2 className="text-2xl font-bold text-green-700 mb-4">User Reports</h2>
        {reports.length === 0 ? (
          <p>No reports yet.</p>
        ) : (
          reports.map((r) => (
            <div key={r._id} className="p-4 border rounded-lg bg-white shadow mb-2">
              <p><strong>User:</strong> {r.user?.name} ({r.user?.email})</p>
              <p><strong>Dustbin:</strong> {r.dustbin?.location}</p>
              <p><strong>Message:</strong> {r.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Dustbin Management */}
      <div>
        <h2 className="text-2xl font-bold text-green-700 mb-4">Manage Dustbins</h2>
        {dustbins.map((bin) => (
          <div key={bin._id} className="p-4 border rounded-lg bg-white shadow flex justify-between items-center mb-2">
            <div>
              <p><strong>📍 {bin.location}</strong></p>
              <p>Status: {bin.status}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => updateStatus(bin._id, "empty")}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Empty
              </button>
              <button
                onClick={() => updateStatus(bin._id, "half")}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Half
              </button>
              <button
                onClick={() => updateStatus(bin._id, "full")}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Full
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
