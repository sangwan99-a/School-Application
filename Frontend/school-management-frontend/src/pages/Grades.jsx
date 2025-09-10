import React, { useState, useEffect } from "react";
import axios from "axios";

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ studentId: "", examId: "", marks: "", grade: "", remarks: "" });
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = () => {
    axios.get("/api/grades").then((response) => setGrades(response.data));
  };

  const handleAddOrUpdateGrade = () => {
    if (selectedGrade) {
      axios.put(`/api/grades/${selectedGrade.id}`, form).then(() => {
        fetchGrades();
        setForm({ studentId: "", examId: "", marks: "", grade: "", remarks: "" });
        setSelectedGrade(null);
      });
    } else {
      axios.post("/api/grades", form).then(() => {
        fetchGrades();
        setForm({ studentId: "", examId: "", marks: "", grade: "", remarks: "" });
      });
    }
  };

  const handleEdit = (grade) => {
    setForm(grade);
    setSelectedGrade(grade);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/grades/${id}`).then(() => fetchGrades());
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Grades Management</h1>

      {/* Add/Edit Grade */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add/Edit Grade</h2>
        <input
          type="text"
          placeholder="Student ID"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Exam ID"
          value={form.examId}
          onChange={(e) => setForm({ ...form, examId: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          placeholder="Marks"
          value={form.marks}
          onChange={(e) => setForm({ ...form, marks: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Grade"
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Remarks"
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          onClick={handleAddOrUpdateGrade}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {selectedGrade ? "Update Grade" : "Add Grade"}
        </button>
      </div>

      {/* Grades List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Grades List</h2>
        <div className="mt-4">
          {grades.map((grade) => (
            <div key={grade.id} className="p-2 border-b">
              <p>
                <strong>Student ID:</strong> {grade.studentId} | <strong>Exam ID:</strong> {grade.examId}
              </p>
              <p>
                <strong>Marks:</strong> {grade.marks} | <strong>Grade:</strong> {grade.grade}
              </p>
              <p>
                <strong>Remarks:</strong> {grade.remarks}
              </p>
              <button
                onClick={() => handleEdit(grade)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(grade.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grades;
