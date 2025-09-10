
import React, { useEffect, useState } from "react";
import axios from "axios";

const Gamification = () => {
  const [gamification, setGamification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/gamification")
      .then(res => {
        setGamification(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch gamification data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gamification Module</h2>
      {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
        <ul className="list-disc pl-6">
          {gamification.map((item) => (
            <li key={item.id}>{item.title || item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default Gamification;
