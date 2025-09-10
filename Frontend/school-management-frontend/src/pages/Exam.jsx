import { useEffect, useState } from "react"
import axios from "axios"

const Exam = () => {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', date: '', subject: '' })
  const [editId, setEditId] = useState(null)

  const fetchExams = async () => {
    setLoading(true)
    try {
      const res = await axios.get("/api/exams")
      setExams(res.data)
    } catch (err) {
      setError("Failed to load exams")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExams()
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editId) {
        await axios.put(`/api/exams/${editId}`, form)
      } else {
        await axios.post("/api/exams", form)
      }
      setForm({ name: '', date: '', subject: '' })
      setEditId(null)
      fetchExams()
    } catch (err) {
      setError("Failed to save exam")
    }
  }

  const handleEdit = exam => {
    setForm({
      name: exam.name,
      date: exam.date,
      subject: exam.subject
    })
    setEditId(exam.id)
  }

  const handleDelete = async id => {
    if (!window.confirm("Delete this exam?")) return
    try {
      await axios.delete(`/api/exams/${id}`)
      fetchExams()
    } catch (err) {
      setError("Failed to delete exam")
    }
  }

  if (loading) return <p className="p-6">Loading exams...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Exams</h2>
      <form className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Exam Name" className="p-2 border rounded" required />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date (YYYY-MM-DD)" className="p-2 border rounded" required />
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="p-2 border rounded" required />
        <button type="submit" className="col-span-1 md:col-span-4 bg-blue-600 text-white py-2 rounded">{editId ? "Update" : "Add"} Exam</button>
      </form>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((e) => (
            <tr key={e.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{e.name}</td>
              <td className="p-3">{e.date}</td>
              <td className="p-3">{e.subject}</td>
              <td className="p-3">
                <button className="mr-2 text-blue-600" onClick={() => handleEdit(e)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Exam;

