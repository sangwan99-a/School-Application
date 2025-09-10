import React, { useState, useEffect } from "react";
import axios from "axios";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [form, setForm] = useState({ studentId: "", feeType: "", amount: "", dueDate: "", paymentDate: "", paymentMethod: "", status: "" });
  const [selectedFee, setSelectedFee] = useState(null);
  const [filters, setFilters] = useState({ class: "", student: "", status: "", dateRange: { start: "", end: "" } });
  const [dashboardData, setDashboardData] = useState({ totalCollected: 0, pendingCount: 0, overdueCount: 0 });

  useEffect(() => {
    fetchFees();
    fetchDashboardData();
  }, []);

  const fetchFees = () => {
    axios.get("/api/fees").then((response) => setFees(response.data));
  };

  const fetchDashboardData = () => {
    axios.get("/api/fees/calculations/total-collected").then((response) => {
      setDashboardData((prev) => ({ ...prev, totalCollected: response.data }));
    });
    axios.get("/api/fees/calculations/pending").then((response) => {
      setDashboardData((prev) => ({ ...prev, pendingCount: response.data.count }));
    });
    axios.get("/api/fees/calculations/overdue").then((response) => {
      setDashboardData((prev) => ({ ...prev, overdueCount: response.data.length }));
    });
  };

  const handleAddOrUpdateFee = () => {
    if (selectedFee) {
      axios.put(`/api/fees/${selectedFee.id}`, form).then(() => {
        fetchFees();
        setForm({ studentId: "", feeType: "", amount: "", dueDate: "", paymentDate: "", paymentMethod: "", status: "" });
        setSelectedFee(null);
      });
    } else {
      axios.post("/api/fees", form).then(() => {
        fetchFees();
        setForm({ studentId: "", feeType: "", amount: "", dueDate: "", paymentDate: "", paymentMethod: "", status: "" });
      });
    }
  };

  const handleEdit = (fee) => {
    setForm(fee);
    setSelectedFee(fee);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/fees/${id}`).then(() => fetchFees());
  };

  const handleFilter = () => {
    axios.get("/api/fees", { params: filters }).then((response) => setFees(response.data));
  };

  const downloadReceipt = (id) => {
    axios.get(`/api/fees/receipt/${id}`, { responseType: "blob" }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `fee_receipt_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80")' }}
    >
      <div className="w-full bg-white bg-opacity-80 rounded-xl shadow p-8 mt-10 mb-8 max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Welcome to the Fees Module</h1>
        <p className="text-lg text-gray-700">Track, manage, and analyze student fees. Use the controls below to view or update fee records.</p>
      </div>
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4">Fees Management</h1>
        {/* Dashboard Widgets */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-100 rounded shadow">
            <h2 className="text-lg font-semibold">Total Collected Fees</h2>
            <p className="text-2xl font-bold">${dashboardData.totalCollected}</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded shadow">
            <h2 className="text-lg font-semibold">Pending Fees</h2>
            <p className="text-2xl font-bold">{dashboardData.pendingCount}</p>
          </div>
          <div className="p-4 bg-red-100 rounded shadow">
            <h2 className="text-lg font-semibold">Overdue Fees</h2>
            <p className="text-2xl font-bold">{dashboardData.overdueCount}</p>
          </div>
        </div>
        {/* Add/Edit Fee */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add/Edit Fee</h2>
          <input
            type="text"
            placeholder="Student ID"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Fee Type"
            value={form.feeType}
            onChange={(e) => setForm({ ...form, feeType: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          />
          <input
            type="date"
            placeholder="Due Date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          />
          <input
            type="date"
            placeholder="Payment Date"
            value={form.paymentDate}
            onChange={(e) => setForm({ ...form, paymentDate: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Payment Method"
            value={form.paymentMethod}
            onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          >
            <option value="">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
          <button
            onClick={handleAddOrUpdateFee}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {selectedFee ? "Update Fee" : "Add Fee"}
          </button>
        </div>
        {/* Fee Records List */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Fee Records</h2>
          <div className="mt-4">
            {fees.map((fee) => (
              <div key={fee.id} className="p-2 border-b">
                <p>
                  <strong>Student ID:</strong> {fee.studentId} | <strong>Fee Type:</strong> {fee.feeType}
                </p>
                <p>
                  <strong>Amount:</strong> ${fee.amount} | <strong>Status:</strong> {fee.status}
                </p>
                <p>
                  <strong>Due Date:</strong> {fee.dueDate} | <strong>Payment Date:</strong> {fee.paymentDate}
                </p>
                <button
                  onClick={() => handleEdit(fee)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(fee.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => downloadReceipt(fee.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Download Receipt
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;
