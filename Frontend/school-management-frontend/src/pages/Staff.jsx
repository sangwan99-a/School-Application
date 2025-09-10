import { useEffect, useState } from "react"
import axios from "axios"

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    aadhaarNumber: '',
    socialCategory: '',
    maritalStatus: '',
    religion: '',
    email: '',
    phone: '',
    position: '',
    category: '',
    subCategory: '',
    academicQualifications: '',
    professionalQualifications: '',
    subjectSpecialization: '',
    staffCode: '',
    appointmentType: '',
    joiningDate: '',
    appointmentDetails: '',
    trainingDetails: '',
    languageProficiency: '',
    achievementsAwards: '',
    healthCardDetails: '',
    previousEmploymentHistory: '',
    search: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8081/api/staff");
      setStaff(res.data);
    } catch (err) {
      setError("Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8081/api/staff/${editId}`, form);
      } else {
        await axios.post("http://localhost:8081/api/staff", form);
      }
      setForm({ name: '', email: '', phone: '', position: '', category: '', subCategory: '', search: '' });
      setEditId(null);
      fetchStaff();
    } catch (err) {
      setError("Failed to save staff member");
    }
  };

  const handleEdit = s => {
    setForm({ name: s.name, email: s.email, phone: s.phone, position: s.position, category: s.category, subCategory: s.subCategory, search: form.search });
    setEditId(s.id);
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this staff member?")) return;
    try {
      await axios.delete(`http://localhost:8081/api/staff/${id}`);
      fetchStaff();
    } catch (err) {
      setError("Failed to delete staff member");
    }
  };

  if (loading) return <p className="p-6">Loading staff...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Staff</h2>
      <form className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
  <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded" />
        <input name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" className="p-2 border rounded" />
        <select name="gender" value={form.gender} onChange={handleChange} className="p-2 border rounded">
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="p-2 border rounded" />
        <input name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} placeholder="Aadhaar Number" className="p-2 border rounded" />
        <input name="socialCategory" value={form.socialCategory} onChange={handleChange} placeholder="Social Category" className="p-2 border rounded" />
        <input name="maritalStatus" value={form.maritalStatus} onChange={handleChange} placeholder="Marital Status" className="p-2 border rounded" />
        <input name="religion" value={form.religion} onChange={handleChange} placeholder="Religion" className="p-2 border rounded" />
  <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" />
  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
  <input name="position" value={form.position} onChange={handleChange} placeholder="Position" className="p-2 border rounded" />
  <select name="category" value={form.category || ''} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Category</option>
          <option value="Teaching">Teaching Staff</option>
          <option value="Non-Teaching">Non-Teaching Staff</option>
        </select>
  <input name="subCategory" value={form.subCategory} onChange={handleChange} placeholder="Designation/Role (e.g. Principal, Janitor, IT Specialist)" className="p-2 border rounded" />
        <input name="academicQualifications" value={form.academicQualifications} onChange={handleChange} placeholder="Academic Qualifications" className="p-2 border rounded" />
        <input name="professionalQualifications" value={form.professionalQualifications} onChange={handleChange} placeholder="Professional Qualifications" className="p-2 border rounded" />
        <input name="subjectSpecialization" value={form.subjectSpecialization} onChange={handleChange} placeholder="Subject Specialization" className="p-2 border rounded" />
        <input name="staffCode" value={form.staffCode} onChange={handleChange} placeholder="Staff Code" className="p-2 border rounded" />
        <input name="appointmentType" value={form.appointmentType} onChange={handleChange} placeholder="Appointment Type" className="p-2 border rounded" />
        <input name="joiningDate" value={form.joiningDate} onChange={handleChange} placeholder="Joining Date" className="p-2 border rounded" />
        <input name="appointmentDetails" value={form.appointmentDetails} onChange={handleChange} placeholder="Appointment Details" className="p-2 border rounded" />
        <input name="trainingDetails" value={form.trainingDetails} onChange={handleChange} placeholder="Training Details" className="p-2 border rounded" />
        <input name="languageProficiency" value={form.languageProficiency} onChange={handleChange} placeholder="Language Proficiency" className="p-2 border rounded" />
        <input name="achievementsAwards" value={form.achievementsAwards} onChange={handleChange} placeholder="Achievements and Awards" className="p-2 border rounded" />
        <input name="healthCardDetails" value={form.healthCardDetails} onChange={handleChange} placeholder="Health Card Details" className="p-2 border rounded" />
        <input name="previousEmploymentHistory" value={form.previousEmploymentHistory} onChange={handleChange} placeholder="Previous Employment History" className="p-2 border rounded" />
  <button type="submit" className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded">{editId ? "Update" : "Add"} Staff</button>
      </form>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input type="text" placeholder="Search by name or position" className="p-2 border rounded" value={form.search || ''} onChange={e => setForm({ ...form, search: e.target.value })} />
      </div>
      <h3 className="text-xl font-semibold mt-4 mb-2">Teaching Staff</h3>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Position</th>
            <th className="p-3 text-left">Designation/Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.filter(s => s.category === "Teaching" && (!form.search || s.name.toLowerCase().includes(form.search.toLowerCase()) || s.position.toLowerCase().includes(form.search.toLowerCase()))).map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.phone}</td>
              <td className="p-3">{s.position}</td>
              <td className="p-3">{s.subCategory}</td>
              <td className="p-3">
                <button className="mr-2 text-blue-600" onClick={() => handleEdit(s)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl font-semibold mt-4 mb-2">Non-Teaching Staff</h3>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Position</th>
            <th className="p-3 text-left">Designation/Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.filter(s => s.category === "Non-Teaching" && (!form.search || s.name.toLowerCase().includes(form.search.toLowerCase()) || s.position.toLowerCase().includes(form.search.toLowerCase()))).map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.phone}</td>
              <td className="p-3">{s.position}</td>
              <td className="p-3">{s.subCategory}</td>
              <td className="p-3">
                <button className="mr-2 text-blue-600" onClick={() => handleEdit(s)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }
  
