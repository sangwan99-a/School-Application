import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StatisticCards = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    studentClass: "",
  });
  const [students, setStudents] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
  "https://school-application-zs1l.onrender.com/api/students/search",
        {
          params: search,
        }
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Add Student Card */}
      <div
        className="bg-blue-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-600"
        onClick={() => navigate("/students/add")}
      >
        <h2 className="text-xl font-bold">Add Student</h2>
        <p className="mt-2">Click here to add a new student to the system.</p>
      </div>

      {/* Search Student Card */}
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Search Student</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Full Name"
            value={search.fullName}
            onChange={(e) =>
              setSearch({ ...search, fullName: e.target.value })
            }
            className="block w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Father Name"
            value={search.fatherName}
            onChange={(e) =>
              setSearch({ ...search, fatherName: e.target.value })
            }
            className="block w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Mother Name"
            value={search.motherName}
            onChange={(e) =>
              setSearch({ ...search, motherName: e.target.value })
            }
            className="block w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Class with Section"
            value={search.studentClass}
            onChange={(e) =>
              setSearch({ ...search, studentClass: e.target.value })
            }
            className="block w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Search
          </button>
        </div>
        <div className="mt-4">
          {students.map((student) => (
            <div key={student.id} className="p-2 border-b">
              {student.fullName} - {student.studentClass}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticCards;
