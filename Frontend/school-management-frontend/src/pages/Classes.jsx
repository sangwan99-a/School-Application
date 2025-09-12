import { useEffect, useState } from "react"
import axios from "axios"
import React from "react"

const navLinks = [
  { name: "Dashboard", icon: (
    <svg className="w-5 h-5 mr-3 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"/></svg>
  ) },
  { name: "Students", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"/></svg>
  ) },
  { name: "Classes", icon: (
    <svg className="w-5 h-5 mr-3 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
  ) },
  { name: "Exams", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6"/></svg>
  ) },
  { name: "Admission", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.1.9-2 2-2h4a2 2 0 012 2v6a2 2 0 01-2 2h-4a2 2 0 01-2-2v-6z"/></svg>
  ) },
  { name: "Settings", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/></svg>
  ) },
];

const statCards = [
  { title: "Total Classes", value: "36", color: "purple", icon: (
    <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
  ) },
  { title: "Active Sections", value: "108", color: "purple", icon: (
    <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
  ) },
  { title: "Avg. Class Size", value: "33", color: "purple", icon: (
    <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"/></svg>
  ) },
];

function StatCard({ title, value, color, icon }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700"
  };
  return (
    <div className={`rounded-2xl shadow p-6 flex flex-col items-start ${colorMap[color]}`}>
      <div className="flex items-center mb-2">
        <span className="text-3xl font-bold mr-2">{value}</span>
        {icon}
      </div>
      <div className="font-semibold">{title}</div>
    </div>
  );
}

export default function Classes() {
  const [showModal, setShowModal] = useState(false);
  const [modalStudents, setModalStudents] = useState([]);
  const [modalClass, setModalClass] = useState(null);
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', section: '', teacher: '' })
  const [editId, setEditId] = useState(null)

  const fetchClasses = async () => {
    setLoading(true)
    try {
  const res = await axios.get("http://localhost:8080/api/classes")
      setClasses(res.data)
    } catch (err) {
      setError("Failed to load classes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editId) {
  await axios.put(`http://localhost:8080/api/classes/${editId}`, form)
      } else {
  await axios.post("http://localhost:8080/api/classes", form)
      }
      setForm({ name: '', section: '', teacher: '' })
      setEditId(null)
      fetchClasses()
    } catch (err) {
      setError("Failed to save class")
    }
  }

  const handleEdit = classObj => {
    setForm({
      name: classObj.name,
      section: classObj.section,
      teacher: classObj.teacher
    })
    setEditId(classObj.id)
  }

  const handleDelete = async id => {
    if (!window.confirm("Delete this class?")) return
    try {
  await axios.delete(`http://localhost:8080/api/classes/${id}`)
      fetchClasses()
    } catch (err) {
      setError("Failed to delete class")
    }
  }

  if (loading) return <p className="p-6">Loading classes...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80")' }}
    >
      <div className="w-full bg-white bg-opacity-80 rounded-xl shadow p-8 mt-10 mb-8 max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Welcome to the Classes Module</h1>
        <p className="text-lg text-gray-700">View, manage, and organize classes. Use the controls below to add or edit class details.</p>
      </div>
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6">Classes</h2>
        <form className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Class Name" className="p-2 border rounded" required />
          <input name="section" value={form.section} onChange={handleChange} placeholder="Section" className="p-2 border rounded" required />
          <input name="teacher" value={form.teacher} onChange={handleChange} placeholder="Teacher" className="p-2 border rounded" required />
          <button type="submit" className="col-span-1 md:col-span-4 bg-blue-600 text-white py-2 rounded">{editId ? "Update" : "Add"} Class</button>
        </form>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Section</th>
              <th className="p-3 text-left">Teacher</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={async () => {
                setModalClass(c);
                setShowModal(true);
                try {
                  const res = await axios.get(`http://localhost:8080/api/classes/${c.id}/students`);
                  setModalStudents(res.data);
                } catch {
                  setModalStudents([]);
                }
              }}>
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.section}</td>
                <td className="p-3">{c.teacher}</td>
                <td className="p-3">
                  <button className="mr-2 text-blue-600" onClick={e => {e.stopPropagation(); handleEdit(c);}}>Edit</button>
                  <button className="text-red-600" onClick={e => {e.stopPropagation(); handleDelete(c.id);}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
              <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowModal(false)}>&times;</button>
              <h3 className="text-xl font-bold mb-4">Students in {modalClass?.name} {modalClass?.section}</h3>
              {modalStudents.length === 0 ? (
                <p className="text-gray-500">No students found for this class.</p>
              ) : (
                <table className="w-full mb-2">
                  <thead>
                    <tr>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Email</th>
                      <th className="p-2 text-left">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalStudents.map(s => (
                      <tr key={s.id}>
                        <td className="p-2">{s.firstName} {s.lastName}</td>
                        <td className="p-2">{s.email}</td>
                        <td className="p-2">{s.phoneNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
