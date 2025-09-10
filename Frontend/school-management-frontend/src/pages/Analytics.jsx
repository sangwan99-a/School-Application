
import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/analytics")
      .then(res => {
        setAnalytics(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch analytics");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Analytics Module</h2>
      {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(analytics, null, 2)}</pre>
      )}
    </div>
  );
};


export default Analytics;
