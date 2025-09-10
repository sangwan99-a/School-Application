import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminHomework() {
  const [homeworks, setHomeworks] = useState([]);
  const [form, setForm] = useState({ subject: "", description: "", dueDate: "", assignedBy: "", assignedToClass: "" });
  const [editing, setEditing] = useState(null);
  const [classes, setClasses] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("/api/homework");
    setHomeworks(res.data);
  };
  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    axios.get("/api/classes").then(res => setClasses(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (editing) {
      await axios.put(`/api/homework/${editing.id}`, form);
      setEditing(null);
    } else {
      await axios.post("/api/homework", form);
    }
    setForm({ subject: "", description: "", dueDate: "", assignedBy: "", assignedToClass: "" });
    fetchData();
  };

  const handleEdit = hw => {
    setEditing(hw);
    setForm(hw);
  };

  const handleDelete = async id => {
    await axios.delete(`/api/homework/${id}`);
    fetchData();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Homework</h2>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="input input-bordered" required />
        <input name="assignedBy" value={form.assignedBy} onChange={handleChange} placeholder="Assigned By" className="input input-bordered" required />
        <select
          name="assignedToClass"
          value={form.assignedToClass}
          onChange={handleChange}
          className="input input-bordered"
          required
        >
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.name}>{cls.name} {cls.section}</option>
          ))}
        </select>
        <input name="dueDate" value={form.dueDate} onChange={handleChange} type="date" className="input input-bordered" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input input-bordered col-span-1 md:col-span-2" required />
        <button type="submit" className="btn btn-primary col-span-1 md:col-span-2">{editing ? "Update" : "Add"} Homework</button>
      </form>
      <table className="table w-full">
        <thead><tr><th>Subject</th><th>Class</th><th>Due</th><th>By</th><th>Actions</th></tr></thead>
        <tbody>
          {homeworks.map(hw => (
            <tr key={hw.id}>
              <td>{hw.subject}</td>
              <td>{hw.assignedToClass}</td>
              <td>{hw.dueDate}</td>
              <td>{hw.assignedBy}</td>
              <td>
                <button className="btn btn-xs btn-info mr-2" onClick={() => handleEdit(hw)}>Edit</button>
                <button className="btn btn-xs btn-error" onClick={() => handleDelete(hw.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
