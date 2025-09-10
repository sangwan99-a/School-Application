import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentHomework() {
  const [homeworks, setHomeworks] = useState([]);
  useEffect(() => {
    axios.get("/api/homework").then(res => setHomeworks(res.data));
  }, []);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Homework</h2>
      <ul className="space-y-4">
        {homeworks.map(hw => (
          <li key={hw.id} className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold text-lg">{hw.subject}</div>
            <div className="text-sm text-gray-500">Due: {hw.dueDate} | Class: {hw.assignedToClass}</div>
            <div className="mt-2">{hw.description}</div>
            <div className="text-xs text-gray-400 mt-1">Assigned by: {hw.assignedBy}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
