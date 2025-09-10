import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentTimetable() {
  const [timetables, setTimetables] = useState([]);
  useEffect(() => {
    axios.get("/api/timetable").then(res => setTimetables(res.data));
  }, []);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Timetable</h2>
      <table className="table w-full">
        <thead><tr><th>Class</th><th>Day</th><th>Periods</th></tr></thead>
        <tbody>
          {timetables.map(tt => (
            <tr key={tt.id}>
              <td>{tt.className}</td>
              <td>{tt.dayOfWeek}</td>
              <td>{tt.periods.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
