
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LifeBuoy } from "lucide-react";

const SystemSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/system-support")
      .then(res => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch support tickets");
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-green-50 to-purple-100 flex flex-col items-center justify-start">
      {/* Abstract background SVGs */}
      <svg className="absolute left-0 top-0 -z-10 opacity-30" width="600" height="400" viewBox="0 0 600 400" fill="none"><ellipse cx="300" cy="200" rx="300" ry="200" fill="url(#paint0_radial)" /></svg>
      <svg className="absolute right-0 bottom-0 -z-10 opacity-20" width="500" height="300" viewBox="0 0 500 300" fill="none"><ellipse cx="250" cy="150" rx="250" ry="150" fill="url(#paint1_radial)" /></svg>

      <div className="w-full bg-white/70 backdrop-blur-xl rounded-xl shadow-xl p-8 mt-10 mb-8 max-w-3xl text-center border border-white/30">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-4 drop-shadow-lg flex items-center justify-center gap-2"><LifeBuoy className="w-8 h-8 text-pink-400" /> System Support Module</h2>
        <p className="text-lg text-gray-700">View and manage system support tickets and issues.</p>
      </div>

      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30">
        {loading ? <div className="text-blue-600 font-bold">Loading...</div> : error ? <div className="text-red-600 font-bold">{error}</div> : (
          <table className="min-w-full bg-white/80 rounded-xl shadow overflow-hidden border border-white/30">
            <thead className="bg-gray-100/80">
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Issue</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="py-2 px-4 border">{t.id}</td>
                  <td className="py-2 px-4 border">{t.issue}</td>
                  <td className="py-2 px-4 border">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* SVG Gradients */}
      <svg style={{ display: "none" }}>
        <radialGradient id="paint0_radial" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="paint1_radial" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.1" />
        </radialGradient>
      </svg>
    </div>
  );
};

export default SystemSupport;
