
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IdCard,
  ClipboardList,
  FileText,
  DollarSign,
  Award,
  Edit,
  Download,
} from "lucide-react";

// Mock data state
const initialProfile = {
  photoUrl: "/teacher-photo.png",
  name: "Amit Sharma",
  role: "Mathematics Teacher",
  staffCode: "TCH2025001",
  dob: "1985-04-12",
  gender: "Male",
  maritalStatus: "Married",
  religion: "Hindu",
  phone: "+91 9876543210",
  email: "amit.sharma@school.edu",
  aadhaar: "1234-5678-9012",
  address: "123, Green Avenue, Delhi",
  category: "Teaching",
  subCategory: "PGT",
  appointmentType: "Permanent",
  joiningDate: "2010-06-15",
  appointmentDetails: "Joined as PGT Mathematics",
  previousEmployment: "ABC Public School (2005-2010)",
  academicQualifications: "M.Sc. Mathematics, B.Ed.",
  professionalQualifications: "CTET, NET",
  subjectSpecialization: "Mathematics",
  training: "CBSE Training 2022",
  languages: "English, Hindi",
  awards: "Best Teacher 2021",
  attendance: 97,
  leaves: 2,
  examsConducted: 5,
  examDuties: 3,
  salary: 65000,
  lastPayment: "2025-08-01",
  announcements: [
    { title: "Staff Meeting", date: "2025-09-05" },
    { title: "Exam Duty", date: "2025-09-10" },
    { title: "Workshop", date: "2025-09-15" },
  ],
};

export default function TeacherProfileDashboard() {
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-green-50 to-purple-100 flex items-stretch">
      {/* Abstract background SVGs */}
      <svg className="absolute left-0 top-0 -z-10 opacity-30" width="600" height="400" viewBox="0 0 600 400" fill="none"><ellipse cx="300" cy="200" rx="300" ry="200" fill="url(#paint0_radial)" /></svg>
      <svg className="absolute right-0 bottom-0 -z-10 opacity-20" width="500" height="300" viewBox="0 0 500 300" fill="none"><ellipse cx="250" cy="150" rx="250" ry="150" fill="url(#paint1_radial)" /></svg>
      {/* Sidebar */}
      <aside className="w-20 bg-white/60 backdrop-blur-xl shadow-2xl flex flex-col items-center py-8 space-y-8 rounded-r-3xl border-r border-white/30">
        <button onClick={() => setActiveTab("profile")}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === "profile" ? "bg-blue-200/70 text-blue-700 shadow-lg" : "text-gray-400 hover:bg-blue-100/40"}`}
          title="Profile"><IdCard className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab("attendance")}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === "attendance" ? "bg-green-200/70 text-green-700 shadow-lg" : "text-gray-400 hover:bg-green-100/40"}`}
          title="Attendance"><ClipboardList className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab("exams")}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === "exams" ? "bg-purple-200/70 text-purple-700 shadow-lg" : "text-gray-400 hover:bg-purple-100/40"}`}
          title="Exams"><FileText className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab("salary")}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === "salary" ? "bg-yellow-200/70 text-yellow-700 shadow-lg" : "text-gray-400 hover:bg-yellow-100/40"}`}
          title="Salary"><DollarSign className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab("announcements")}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === "announcements" ? "bg-pink-200/70 text-pink-700 shadow-lg" : "text-gray-400 hover:bg-pink-100/40"}`}
          title="Announcements"><Award className="w-7 h-7" /></button>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Banner */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-green-500 py-10 px-8 flex flex-col md:flex-row items-center justify-between shadow-xl rounded-b-3xl mb-8">
          <div className="flex items-center gap-8">
            <img src={profile.photoUrl} alt="Profile" className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover" />
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">{profile.name}</h1>
              <div className="text-lg text-blue-100 font-semibold drop-shadow">{profile.role} | Staff Code: {profile.staffCode}</div>
            </div>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button className="flex items-center gap-2 bg-white/80 text-blue-700 px-5 py-2 rounded-2xl font-bold shadow hover:bg-blue-50 transition"><Edit className="h-5 w-5" /> Edit Profile</button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-2xl font-bold shadow hover:bg-green-700 transition"><Download className="h-5 w-5" /> Download ID</button>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Personal Info */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-white/30">
              <div className="flex items-center gap-2 mb-2"><IdCard className="h-6 w-6 text-blue-600" /><span className="font-bold text-lg">Personal Information</span></div>
              <div><b>Date of Birth:</b> {profile.dob}</div>
              <div><b>Gender:</b> {profile.gender}</div>
              <div><b>Marital Status:</b> {profile.maritalStatus}</div>
              <div><b>Religion:</b> {profile.religion}</div>
              <div><b>Phone:</b> {profile.phone}</div>
              <div><b>Email:</b> {profile.email}</div>
              <div><b>Aadhaar:</b> {profile.aadhaar}</div>
              <div><b>Address:</b> {profile.address}</div>
            </motion.div>
          )}
          {/* Employment Info */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gradient-to-br from-blue-50/80 to-green-50/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-white/30">
              <div className="flex items-center gap-2 mb-2"><ClipboardList className="h-6 w-6 text-green-600" /><span className="font-bold text-lg">Employment Information</span></div>
              <div><b>Category:</b> {profile.category}</div>
              <div><b>Sub-Category:</b> {profile.subCategory}</div>
              <div><b>Role:</b> {profile.role}</div>
              <div><b>Appointment Type:</b> {profile.appointmentType}</div>
              <div><b>Joining Date:</b> {profile.joiningDate}</div>
              <div><b>Appointment Details:</b> {profile.appointmentDetails}</div>
              <div><b>Previous Employment:</b> {profile.previousEmployment}</div>
            </motion.div>
          )}
          {/* Professional Info */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-white/30">
              <div className="flex items-center gap-2 mb-2"><Award className="h-6 w-6 text-yellow-600" /><span className="font-bold text-lg">Professional Information</span></div>
              <div><b>Academic Qualifications:</b> {profile.academicQualifications}</div>
              <div><b>Professional Qualifications:</b> {profile.professionalQualifications}</div>
              <div><b>Subject Specialization:</b> {profile.subjectSpecialization}</div>
              <div><b>Training:</b> {profile.training}</div>
              <div><b>Languages:</b> {profile.languages}</div>
              <div><b>Awards:</b> {profile.awards}</div>
            </motion.div>
          )}
          {/* Attendance */}
          {activeTab === "attendance" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-3 col-span-2 border border-white/30">
              <div className="flex items-center gap-2 mb-2"><ClipboardList className="h-6 w-6 text-blue-600" /><span className="font-bold text-lg">Attendance</span></div>
              <div><b>Attendance %:</b> {profile.attendance}%</div>
              <div><b>Leaves Taken:</b> {profile.leaves}</div>
            </motion.div>
          )}
          {/* Exams */}
          {activeTab === "exams" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-3 col-span-2 border border-white/30">
              <div className="flex items-center gap-2 mb-2"><FileText className="h-6 w-6 text-purple-600" /><span className="font-bold text-lg">Exams</span></div>
              <div><b>Exams Conducted:</b> {profile.examsConducted}</div>
              <div><b>Exam Duties:</b> {profile.examDuties}</div>
            </motion.div>
          )}
          {/* Salary */}
          {activeTab === "salary" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-3 col-span-2 border border-white/30">
              <div className="flex items-center gap-2 mb-2"><DollarSign className="h-6 w-6 text-green-600" /><span className="font-bold text-lg">Salary</span></div>
              <div><b>Amount:</b> ₹{profile.salary}</div>
              <div><b>Last Payment:</b> {profile.lastPayment}</div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-blue-700 transition w-max mt-2"><Download className="h-4 w-4" /> Download Slip</button>
            </motion.div>
          )}
          {/* Announcements */}
          {activeTab === "announcements" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-3 col-span-2 border border-white/30">
              <div className="flex items-center gap-2 mb-2"><Award className="h-6 w-6 text-blue-600" /><span className="font-bold text-lg">Announcements</span></div>
              <ul>
                {profile.announcements.map((a, i) => (
                  <li key={i} className="flex justify-between border-b last:border-b-0 py-2"><span>{a.title}</span><span className="text-xs text-gray-500">{a.date}</span></li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
      {/* SVG Gradients */}
      <svg style={{ display: "none" }}>
        <radialGradient id="paint0_radial" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="paint1_radial" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.1" />
        </radialGradient>
      </svg>
    </div>
  );
}

export default function TeacherProfileDashboard() {
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 bg-white shadow-lg flex flex-col items-center py-8 space-y-8">
        <button onClick={() => setActiveTab("profile")}
          className={`p-3 rounded-lg ${activeTab === "profile" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
          title="Profile"><IdCard className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab("attendance")}
          className={`p-3 rounded-lg ${activeTab === "attendance" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
          title="Attendance"><ClipboardList className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab("exams")}
          className={`p-3 rounded-lg ${activeTab === "exams" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
          title="Exams"><FileText className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab("salary")}
          className={`p-3 rounded-lg ${activeTab === "salary" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
          title="Salary"><DollarSign className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab("announcements")}
          className={`p-3 rounded-lg ${activeTab === "announcements" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
          title="Announcements"><Award className="w-7 h-7" /></button>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Banner */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-green-500 py-10 px-8 flex flex-col md:flex-row items-center justify-between shadow-lg rounded-b-3xl mb-8">
          <div className="flex items-center gap-8">
            <img src={profile.photoUrl} alt="Profile" className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover" />
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2">{profile.name}</h1>
              <div className="text-lg text-blue-100 font-semibold">{profile.role} | Staff Code: {profile.staffCode}</div>
            </div>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button className="flex items-center gap-2 bg-white text-blue-700 px-5 py-2 rounded-2xl font-bold shadow hover:bg-blue-50 transition"><Edit className="h-5 w-5" /> Edit Profile</button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-2xl font-bold shadow hover:bg-green-700 transition"><Download className="h-5 w-5" /> Download ID</button>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Personal Info */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2"><IdCard className="h-6 w-6 text-blue-600" /><span className="font-bold text-lg">Personal Information</span></div>
              <div><b>Date of Birth:</b> {profile.dob}</div>
              <div><b>Gender:</b> {profile.gender}</div>
              <div><b>Marital Status:</b> {profile.maritalStatus}</div>
              <div><b>Religion:</b> {profile.religion}</div>
              <div><b>Phone:</b> {profile.phone}</div>
              <div><b>Email:</b> {profile.email}</div>
              <div><b>Aadhaar:</b> {profile.aadhaar}</div>
              <div><b>Address:</b> {profile.address}</div>
            </motion.div>
          )}
          {/* Employment Info */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2"><ClipboardList className="h-6 w-6 text-green-600" /><span className="font-bold text-lg">Employment Information</span></div>
              <div><b>Category:</b> {profile.category}</div>
              <div><b>Sub-Category:</b> {profile.subCategory}</div>
              <div><b>Role:</b> {profile.role}</div>
              <div><b>Appointment Type:</b> {profile.appointmentType}</div>
              <div><b>Joining Date:</b> {profile.joiningDate}</div>
              <div><b>Appointment Details:</b> {profile.appointmentDetails}</div>
              <div><b>Previous Employment:</b> {profile.previousEmployment}</div>
            </motion.div>
          )}
          {/* Professional Info */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2"><Award className="h-6 w-6 text-yellow-600" /><span className="font-bold text-lg">Professional Information</span></div>
              <div><b>Academic Qualifications:</b> {profile.academicQualifications}</div>
              <div><b>Professional Qualifications:</b> {profile.professionalQualifications}</div>
              <div><b>Subject Specialization:</b> {profile.subjectSpecialization}</div>
              <div><b>Training:</b> {profile.training}</div>
              <div><b>Languages:</b> {profile.languages}</div>
              <div><b>Awards:</b> {profile.awards}</div>
            </motion.div>
          )}
          {/* Attendance */}
          {activeTab === "attendance" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 col-span-2">
              <div className="flex items-center gap-2 mb-2"><ClipboardList className="h-6 w-6 text-blue-600" /><span className="font-bold text-lg">Attendance</span></div>
              <div><b>Attendance %:</b> {profile.attendance}%</div>
              <div><b>Leaves Taken:</b> {profile.leaves}</div>
            </motion.div>
          )}
          {/* Exams */}
          {activeTab === "exams" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 col-span-2">
              <div className="flex items-center gap-2 mb-2"><FileText className="h-6 w-6 text-purple-600" /><span className="font-bold text-lg">Exams</span></div>
              <div><b>Exams Conducted:</b> {profile.examsConducted}</div>
              <div><b>Exam Duties:</b> {profile.examDuties}</div>
            </motion.div>
          )}
          {/* Salary */}
          {activeTab === "salary" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 col-span-2">
              <div className="flex items-center gap-2 mb-2"><DollarSign className="h-6 w-6 text-green-600" /><span className="font-bold text-lg">Salary</span></div>
              <div><b>Amount:</b> ₹{profile.salary}</div>
              <div><b>Last Payment:</b> {profile.lastPayment}</div>
              <button className="btn btn-primary flex items-center gap-2 w-max mt-2"><Download className="h-4 w-4" /> Download Slip</button>
            </motion.div>
          )}
          {/* Announcements */}
          {activeTab === "announcements" && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 col-span-2">
              <div className="flex items-center gap-2 mb-2"><Award className="h-6 w-6 text-blue-600" /><span className="font-bold text-lg">Announcements</span></div>
              <ul>
                {profile.announcements.map((a, i) => (
                  <li key={i} className="flex justify-between border-b last:border-b-0 py-2"><span>{a.title}</span><span className="text-xs text-gray-500">{a.date}</span></li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
