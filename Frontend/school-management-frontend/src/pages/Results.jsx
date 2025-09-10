import React, { useState, useEffect } from "react";
import axios from "axios";

const Results = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    marksObtained: "",
    remarks: "",
  });
  const [filters, setFilters] = useState({
    studentId: "",
    examId: "",
    classId: "",
  });
  const [selectedResult, setSelectedResult] = useState(null);
  const [bulkResults, setBulkResults] = useState("");
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    // Fetch exams
    axios.get("/api/exams").then((response) => setExams(response.data));
  }, []);

  const fetchStudents = (examId) => {
    axios.get(`/api/classes/${examId}/students`).then((response) => setStudents(response.data));
  };

  const fetchResults = () => {
    axios.get(`/api/results/exam/${selectedExam}`).then((response) => setResults(response.data));
  };

  const handleAddResult = () => {
    const payload = { ...form, examId: selectedExam };
    axios.post("/api/results", payload).then(() => {
      alert("Result added successfully!");
      fetchResults();
      setForm({ studentId: "", marksObtained: "", remarks: "" });
    });
  };

  const handleEditResult = (result) => {
    setForm({
      studentId: result.studentId,
      marksObtained: result.marksObtained,
      remarks: result.remarks,
    });
    setSelectedResult(result);
  };

  const handleUpdateResult = () => {
    const payload = { ...form, examId: selectedExam };
    axios.put(`/api/results/${selectedResult.id}`, payload).then(() => {
      alert("Result updated successfully!");
      fetchResults();
      setForm({ studentId: "", marksObtained: "", remarks: "" });
      setSelectedResult(null);
    });
  };

  const handleDeleteResult = (id) => {
    axios.delete(`/api/results/${id}`).then(() => {
      alert("Result deleted successfully!");
      fetchResults();
    });
  };

  const handleExportPDF = () => {
    // Logic to export results as PDF
    alert("Exporting results as PDF...");
  };

  const handleFilterResults = () => {
    axios
      .get("/api/results/filter", { params: filters })
      .then((response) => setResults(response.data));
  };

  const handleBulkUpload = () => {
    const parsedResults = JSON.parse(bulkResults);
    axios.post("/api/results/bulk-upload", parsedResults).then(() => {
      alert("Results uploaded successfully!");
      fetchResults();
      setBulkResults("");
    });
  };

  const fetchStatistics = () => {
    axios.get("/api/results/statistics").then((response) => setStatistics(response.data));
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Results</h1>

      {/* Select Exam */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Exam</h2>
        <select
          value={selectedExam}
          onChange={(e) => {
            setSelectedExam(e.target.value);
            fetchStudents(e.target.value);
            fetchResults();
          }}
          className="block w-full p-2 border rounded mb-2"
        >
          <option value="">Select Exam</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.examName} - {exam.subjectName}
            </option>
          ))}
        </select>
      </div>

      {/* Add Result */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Result</h2>
        <select
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Marks Obtained"
          value={form.marksObtained}
          onChange={(e) => setForm({ ...form, marksObtained: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Remarks"
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <button
          onClick={selectedResult ? handleUpdateResult : handleAddResult}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {selectedResult ? "Update Result" : "Add Result"}
        </button>
      </div>

      {/* Filter Results */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter Results</h2>
        <input
          type="text"
          placeholder="Student ID"
          value={filters.studentId}
          onChange={(e) => setFilters({ ...filters, studentId: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Exam ID"
          value={filters.examId}
          onChange={(e) => setFilters({ ...filters, examId: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Class ID"
          value={filters.classId}
          onChange={(e) => setFilters({ ...filters, classId: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleFilterResults}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Filter Results
        </button>
      </div>

      {/* Results List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Results List</h2>
        {results.map((result) => (
          <div key={result.id} className="p-2 border-b">
            <p>
              <strong>Exam:</strong> {result.examId} | <strong>Student:</strong> {result.studentId}
            </p>
            <p>
              <strong>Marks Obtained:</strong> {result.marksObtained} | <strong>Grade:</strong> {result.grade}
            </p>
            <p>
              <strong>Remarks:</strong> {result.remarks}
            </p>
            <button
              onClick={() => handleEditResult(result)}
              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteResult(result.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Bulk Upload Results */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Bulk Upload Results</h2>
        <textarea
          value={bulkResults}
          onChange={(e) => setBulkResults(e.target.value)}
          placeholder="Paste JSON data here"
          className="block w-full p-2 border rounded mb-2"
          rows="5"
        ></textarea>
        <button
          onClick={handleBulkUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Results
        </button>
      </div>

      {/* Result Statistics */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Result Statistics</h2>
        <ul>
          {Object.entries(statistics).map(([grade, count]) => (
            <li key={grade}>
              <strong>{grade}:</strong> {count}
            </li>
          ))}
        </ul>
      </div>

      {/* Export Results */}
      <div>
        <button
          onClick={handleExportPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default Results;
