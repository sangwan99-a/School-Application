
import React, { useEffect, useState } from "react";
import axios from "axios";

const Gradebook = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/gradebook")
      .then(res => {
        setGrades(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch gradebook");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gradebook Module</h2>
      {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Student</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => (
              <tr key={g.id}>
                <td className="py-2 px-4 border">{g.studentName}</td>
                <td className="py-2 px-4 border">{g.subject}</td>
                <td className="py-2 px-4 border">{g.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


export default Gradebook;
