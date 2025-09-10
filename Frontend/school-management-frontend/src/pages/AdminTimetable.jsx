import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTimetable() {
  const [timetables, setTimetables] = useState([]);
  const [form, setForm] = useState({ className: "", dayOfWeek: "", periods: "" });
  const [editing, setEditing] = useState(null);
  const [classes, setClasses] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("/api/timetable");
    setTimetables(res.data);
  };
  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    axios.get("/api/classes").then(res => setClasses(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { ...form, periods: form.periods.split(",").map(p => p.trim()) };
    if (editing) {
      await axios.put(`/api/timetable/${editing.id}`, payload);
      setEditing(null);
    } else {
      await axios.post("/api/timetable", payload);
    }
    setForm({ className: "", dayOfWeek: "", periods: "" });
    fetchData();
  };

  const handleEdit = tt => {
    setEditing(tt);
    setForm({ ...tt, periods: tt.periods.join(", ") });
  };

  const handleDelete = async id => {
    await axios.delete(`/api/timetable/${id}`);
    fetchData();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Timetable</h2>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="className"
          value={form.className}
          onChange={handleChange}
          className="input input-bordered"
          required
        >
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.name}>{cls.name} {cls.section}</option>
          ))}
        </select>
        <input name="dayOfWeek" value={form.dayOfWeek} onChange={handleChange} placeholder="Day of Week" className="input input-bordered" required />
        <input name="periods" value={form.periods} onChange={handleChange} placeholder="Periods (comma separated)" className="input input-bordered col-span-1 md:col-span-2" required />
        <button type="submit" className="btn btn-primary col-span-1 md:col-span-2">{editing ? "Update" : "Add"} Timetable</button>
      </form>
      <table className="table w-full">
        <thead><tr><th>Class</th><th>Day</th><th>Periods</th><th>Actions</th></tr></thead>
        <tbody>
          {timetables.map(tt => (
            <tr key={tt.id}>
              <td>{tt.className}</td>
              <td>{tt.dayOfWeek}</td>
              <td>{tt.periods.join(", ")}</td>
              <td>
                <button className="btn btn-xs btn-info mr-2" onClick={() => handleEdit(tt)}>Edit</button>
                <button className="btn btn-xs btn-error" onClick={() => handleDelete(tt.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
