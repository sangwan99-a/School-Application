

import { useEffect, useState } from "react"
import axios from "axios"
import { UserCircleIcon, MagnifyingGlassIcon, FunnelIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import StatisticCards from "../components/StatisticCards"

function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start gap-2">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
          {student.firstName[0]}{student.lastName[0]}
        </div>
        <div>
          <div className="font-bold text-lg">{student.firstName} {student.lastName}</div>
          <div className="text-sm text-gray-500">{student.studentClass ? `${student.studentClass.name} - ${student.studentClass.section}` : ''}</div>
        </div>
      </div>
      <div className="text-sm text-gray-700">Father: {student.fatherName} | Mother: {student.motherName}</div>
      <div className="text-sm text-gray-700">DOB: {student.dateOfBirth} | Gender: {student.gender}</div>
      <div className="text-sm text-gray-700">Nationality: {student.nationality}</div>
      <div className="text-sm text-gray-700">Guardian: {student.guardianName} ({student.guardianRelationship})</div>
      <div className="text-sm text-gray-700">Emergency: {student.emergencyContact}</div>
      <div className="text-sm text-gray-700">Email: {student.email}</div>
      <div className="text-sm text-gray-700">Phone: {student.phoneNumber}</div>
      <div className="text-sm text-gray-700">Address: {student.address}</div>
      <div className="mt-2 flex gap-2">
        <button className="text-blue-600" onClick={() => onEdit(student)}>Edit</button>
        <button className="text-red-600" onClick={() => onDelete(student.id)}>Delete</button>
      </div>
    </div>
  )
}

export default function Students() {
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    firstName: '', lastName: '', dateOfBirth: '', nationality: '', studentClass: '',
    fatherName: '', motherName: '', guardianName: '', guardianRelationship: '',
    email: '', phoneNumber: '', address: '', emergencyContact: ''
  })
  const [step, setStep] = useState(1)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({ name: '', father: '', classId: '' })
  const [editId, setEditId] = useState(null)

  const fetchStudents = async () => {
    setLoading(true)
    try {
  const res = await axios.get("https://school-application-zs1l.onrender.com/api/students")
      setStudents(res.data)
    } catch (err) {
      setError("Failed to load students")
    } finally {
      setLoading(false)
    }
  }

  const fetchClasses = async () => {
    try {
  const res = await axios.get("https://school-application-zs1l.onrender.com/api/classes")
      setClasses(res.data)
    } catch (err) {
      setClasses([])
    }
  }

  useEffect(() => {
    fetchStudents()
    fetchClasses()
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const selectedClass = classes.find(c => c.id === Number(form.studentClass));
    const payload = {
      ...form,
      classId: selectedClass ? selectedClass.id : null,
      className: selectedClass ? selectedClass.name : "",
      // Remove studentClass from payload
    }
    console.log('Student form submitted! Payload:', payload)
    try {
      let response;
      if (editId) {
  response = await axios.put(`https://school-application-zs1l.onrender.com/api/students/${editId}`, payload)
      } else {
  response = await axios.post("https://school-application-zs1l.onrender.com/api/students", payload)
      }
      console.log('Student save response:', response)
      setForm({
        firstName: '', lastName: '', email: '', phoneNumber: '', address: '',
        fatherName: '', motherName: '', dateOfBirth: '', gender: '', nationality: '', emergencyContact: '', guardianName: '', guardianRelationship: '', studentClass: ''
      })
      setEditId(null)
      fetchStudents()
    } catch (err) {
      setError("Failed to save student")
      if (err.response) {
        console.error('Student save error:', err.response.data)
      } else {
        console.error('Student save error:', err)
      }
    }
  }

  const handleEdit = student => {
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      address: student.address,
      fatherName: student.fatherName || '',
      motherName: student.motherName || '',
      dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('-').reverse().join('-') : '',
      gender: student.gender || '',
      nationality: student.nationality || '',
      emergencyContact: student.emergencyContact || '',
      guardianName: student.guardianName || '',
      guardianRelationship: student.guardianRelationship || '',
      studentClass: student.studentClass ? student.studentClass.id : ''
    })
    setEditId(student.id)
  }

  const handleDelete = async id => {
    if (!window.confirm("Delete this student?")) return
    try {
  await axios.delete(`https://school-application-zs1l.onrender.com/api/students/${id}`)
      fetchStudents()
    } catch (err) {
      setError("Failed to delete student")
    }
  }

  if (loading) return <p className="p-6">Loading students...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  // Filter students by search and filter fields
  const filteredStudents = students.filter(s => {
    const nameMatch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(filter.name.toLowerCase())
    const fatherMatch = s.fatherName?.toLowerCase().includes(filter.father.toLowerCase())
    const classMatch = filter.classId ? (s.studentClass && s.studentClass.id === Number(filter.classId)) : true
    return nameMatch && fatherMatch && classMatch
  })

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Add Student */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Add / Edit Student</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="p-2 border rounded" required />
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="p-2 border rounded" required />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" className="p-2 border rounded" type="date" />
              <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="Nationality" className="p-2 border rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select name="studentClass" value={form.studentClass} onChange={handleChange} className="p-2 border rounded">
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name} - {cls.section}</option>
                ))}
              </select>
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" type="email" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="p-2 border rounded" />
              <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="p-2 border rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father's Name" className="p-2 border rounded" />
              <input name="motherName" value={form.motherName} onChange={handleChange} placeholder="Mother's Name" className="p-2 border rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="guardianName" value={form.guardianName} onChange={handleChange} placeholder="Guardian Name" className="p-2 border rounded" />
              <input name="guardianRelationship" value={form.guardianRelationship} onChange={handleChange} placeholder="Guardian Relationship" className="p-2 border rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} placeholder="Emergency Contact" className="p-2 border rounded" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">{editId ? "Update" : "Add"} Student</button>
            </div>
          </form>
        </div>
        {/* Right Column: Student List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Students List</h2>
          <div className="mb-4 flex gap-2">
            <input type="text" placeholder="Search by name" value={filter.name} onChange={e => setFilter({ ...filter, name: e.target.value })} className="p-2 border rounded" />
            <input type="text" placeholder="Father's Name" value={filter.father} onChange={e => setFilter({ ...filter, father: e.target.value })} className="p-2 border rounded" />
            <select value={filter.classId} onChange={e => setFilter({ ...filter, classId: e.target.value })} className="p-2 border rounded">
              <option value="">All Classes</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name} - {cls.section}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredStudents.map(student => (
              <StudentCard key={student.id} student={student} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
            {filteredStudents.length === 0 && <div className="text-gray-500">No students found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
