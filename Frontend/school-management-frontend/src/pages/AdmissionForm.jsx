import React, { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  classApplied: "",
  address: "",
  phone: "",
  fatherName: "",
  motherName: "",
  parentPhone: "",
  parentEmail: "",
  nationality: "",
  guardianName: "",
  guardianRelationship: "",
  guardianNumber: "",
  marksheet: null,
  aadhaar: null,
  birthCertificate: null,
  studentPhoto: null,
  parentsId: null,
  transferCertificate: null,
};

const fileFields = [
  { label: "Old Marksheet", name: "marksheet" },
  { label: "Aadhaar Card", name: "aadhaar" },
  { label: "Birth Certificate", name: "birthCertificate" },
  { label: "Student Photo", name: "studentPhoto" },
  { label: "Parents ID", name: "parentsId" },
  { label: "Transfer Certificate", name: "transferCertificate" },
];

export default function AdmissionForm() {
  const [form, setForm] = useState(initialState);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const logData = { ...form };
    Object.keys(logData).forEach((key) => {
      if (logData[key] instanceof File) {
        logData[key] = logData[key].name;
      }
    });
    console.log("Admission Form Data:", logData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    setForm(initialState);
  };

  return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 relative overflow-hidden">
        {/* Abstract floating shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-gradient-to-br from-blue-300 via-blue-200 to-purple-200 rounded-full blur-3xl opacity-60 animate-float" />
          <div className="absolute bottom-[-100px] right-[-100px] w-[340px] h-[340px] bg-gradient-to-tr from-purple-200 via-blue-100 to-blue-300 rounded-full blur-3xl opacity-50 animate-float2" />
          <div className="absolute top-1/2 left-1/2 w-[180px] h-[180px] bg-gradient-to-br from-blue-200 to-purple-100 rounded-full blur-2xl opacity-40 animate-float3" />
        </div>
        {/* Card */}
        <div className="relative z-10 w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-2">School Admission Form</h2>
          {success && (
            <div className="bg-teal-100 text-teal-700 rounded-lg py-2 px-4 text-center font-semibold mb-2">
              ✅ Admission Form Submitted Successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Inputs grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">First Name *</label>
                <input name="firstName" type="text" required value={form.firstName} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Last Name *</label>
                <input name="lastName" type="text" required value={form.lastName} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Date of Birth</label>
                <input name="dob" type="date" value={form.dob} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Gender</label>
                <div className="flex gap-4 mt-1">
                  {[
                    "Male",
                    "Female",
                    "Other"
                  ].map((g) => (
                    <label key={g} className="flex items-center gap-1 text-gray-700">
                      <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange}
                        className="accent-blue-500" /> {g}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Class Applying For</label>
                <select name="classApplied" value={form.classApplied} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="KG">KG</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Nationality</label>
                <input name="nationality" type="text" value={form.nationality} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input name="phone" type="text" value={form.phone} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Father Name</label>
                <input name="fatherName" type="text" value={form.fatherName} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mother Name</label>
                <input name="motherName" type="text" value={form.motherName} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Parent Phone</label>
                <input name="parentPhone" type="text" value={form.parentPhone} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Parent Email</label>
                <input name="parentEmail" type="email" value={form.parentEmail} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Guardian Name</label>
                <input name="guardianName" type="text" value={form.guardianName} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Guardian Relationship</label>
                <input name="guardianRelationship" type="text" value={form.guardianRelationship} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Guardian Number</label>
                <input name="guardianNumber" type="text" value={form.guardianNumber} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
            </div>
            {/* File Uploads */}
            <div>
              <h3 className="text-gray-700 font-semibold mb-2">Required Documents</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {fileFields.map((file) => (
                  <label key={file.name} className="flex flex-col items-center gap-2 bg-white/70 border border-gray-200 rounded-xl shadow-sm p-4 cursor-pointer hover:border-blue-400 transition relative">
                    <span className="text-sm text-gray-700 font-medium">{file.label}</span>
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <input
                      name={file.name}
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {form[file.name] && (
                      <span className="text-xs text-blue-500 mt-1">{form[file.name].name}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold text-lg shadow-md hover:from-blue-600 hover:to-blue-500 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
        {/* Floating shapes animation */}
        <style>{`
          .animate-float {
            animation: float 7s ease-in-out infinite alternate;
          }
          .animate-float2 {
            animation: float2 9s ease-in-out infinite alternate;
          }
          .animate-float3 {
            animation: float3 11s ease-in-out infinite alternate;
          }
          @keyframes float {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(40px) scale(1.08); }
          }
          @keyframes float2 {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-30px) scale(1.04); }
          }
          @keyframes float3 {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(25px) scale(1.07); }
          }
        `}</style>
      </div>
    );
  }
// ...existing code...
