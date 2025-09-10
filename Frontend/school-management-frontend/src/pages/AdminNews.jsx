import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", publishedAt: "", publishedBy: "" });
  const [editing, setEditing] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("/api/news");
    setNews(res.data);
  };
  useEffect(() => { fetchData(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (editing) {
      await axios.put(`/api/news/${editing.id}`, form);
      setEditing(null);
    } else {
      await axios.post("/api/news", form);
    }
    setForm({ title: "", content: "", publishedAt: "", publishedBy: "" });
    fetchData();
  };

  const handleEdit = n => {
    setEditing(n);
    setForm(n);
  };

  const handleDelete = async id => {
    await axios.delete(`/api/news/${id}`);
    fetchData();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage News</h2>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input input-bordered" required />
        <input name="publishedBy" value={form.publishedBy} onChange={handleChange} placeholder="Published By" className="input input-bordered" required />
        <input name="publishedAt" value={form.publishedAt} onChange={handleChange} type="datetime-local" className="input input-bordered" required />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="input input-bordered col-span-1 md:col-span-2" required />
        <button type="submit" className="btn btn-primary col-span-1 md:col-span-2">{editing ? "Update" : "Add"} News</button>
      </form>
      <table className="table w-full">
        <thead><tr><th>Title</th><th>By</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          {news.map(n => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{n.publishedBy}</td>
              <td>{n.publishedAt}</td>
              <td>
                <button className="btn btn-xs btn-info mr-2" onClick={() => handleEdit(n)}>Edit</button>
                <button className="btn btn-xs btn-error" onClick={() => handleDelete(n.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
