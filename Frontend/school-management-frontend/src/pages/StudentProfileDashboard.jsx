
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { User, BookOpen, CalendarCheck2, FileText, BadgeCheck, Newspaper, CalendarDays, Clock, ClipboardList, Edit, Download } from "lucide-react";

function StudentProfileDashboard({ studentId }) {
  // Use studentId prop directly (or from context/auth if available)
  const id = studentId;
  const [student, setStudent] = useState(null);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [homework, setHomework] = useState([]);
  const [exams, setExams] = useState([]);
  const [fee, setFee] = useState(null);

  useEffect(() => {
  if (!id) return;
  axios.get(`/api/students/${id}`).then(res => setStudent(res.data)).catch(() => setStudent(null));
    axios.get(`/api/news`).then(res => setNews(res.data || [])).catch(() => setNews([]));
    axios.get(`/api/events`).then(res => setEvents(res.data || [])).catch(() => setEvents([]));
    axios.get(`/api/timetable`).then(res => setTimetable(res.data || [])).catch(() => setTimetable([]));
    axios.get(`/api/homework`).then(res => setHomework(res.data || [])).catch(() => setHomework([]));
  axios.get(`/api/exam-results/student/${id}`).then(res => setExams(res.data || [])).catch(() => setExams([]));
  axios.get(`/api/fees/${id}/latest`).then(res => setFee(res.data)).catch(() => setFee(null));
  }, [id]);

  if (!student) return <div className="p-8 text-center">Loading...</div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 pb-12">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-green-500 py-10 px-4 flex flex-col md:flex-row items-center justify-between shadow-lg rounded-b-3xl mb-8">
        <div className="flex items-center gap-6">
          {(() => {
            let profilePhotoUrl = null;
            if (student.profilePhoto) {
              if (typeof student.profilePhoto === 'string') {
                profilePhotoUrl = `data:image/jpeg;base64,${student.profilePhoto}`;
              } else if (student.profilePhoto.data) {
                const byteArray = new Uint8Array(student.profilePhoto.data);
                let binary = '';
                for (let i = 0; i < byteArray.length; i++) {
                  binary += String.fromCharCode(byteArray[i]);
                }
                profilePhotoUrl = `data:image/jpeg;base64,${window.btoa(binary)}`;
              }
            }
            return (
              <img src={profilePhotoUrl || "/default-profile.png"} alt="Profile" className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover" />
            );
          })()}
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">{student.firstName} {student.lastName}</h1>
            {/* Removed Admission No display */}
          </div>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <button className="flex items-center gap-2 bg-white text-blue-700 px-5 py-2 rounded-2xl font-bold shadow hover:bg-blue-50 transition"><Edit className="h-5 w-5" /> Edit Profile</button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-2xl font-bold shadow hover:bg-green-700 transition"><Download className="h-5 w-5" /> Download ID Card</button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Personal Info */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2"><User className="h-6 w-6 text-blue-600" /><span className="font-bold text-lg">Personal Information</span></div>
          <div><b>First Name:</b> {student.firstName || "-"}</div>
          <div><b>Last Name:</b> {student.lastName || "-"}</div>
          <div><b>Date of Birth:</b> {student.dob || "-"}</div>
          <div><b>Gender:</b> {student.gender || "-"}</div>
          <div><b>Current Class:</b> {student.studentClass || "-"}</div>
          <div><b>Address:</b> {student.address || "-"}</div>
          <div><b>Phone No.:</b> {student.phone || "-"}</div>
          <div><b>Email:</b> {student.email || "-"}</div>
          <div><b>Father Name:</b> {student.fatherName || "-"}</div>
          <div><b>Mother Name:</b> {student.motherName || "-"}</div>
          <div><b>Guardian Name:</b> {student.guardianName || "-"}</div>
          <div><b>Guardian Relationship:</b> {student.guardianRelationship || "-"}</div>
          <div><b>Guardian Contact:</b> {student.guardianContact || "-"}</div>
        </motion.div>
        {/* Academic Info */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2"><BookOpen className="h-6 w-6 text-green-600" /><span className="font-bold text-lg">Academic Information</span></div>
          <div><b>Subjects:</b> {(student.subjects || []).join(", ")}</div>
          <div><b>Class Teacher:</b> {student.classTeacher || "-"}</div>
          <div className="flex items-center gap-2"><b>GPA:</b> <span>{student.gpa || "-"}</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden w-32">
              <div className="h-full bg-green-500" style={{ width: `${((student.gpa || 0) / 10) * 100}%` }}></div>
            </div>
          </div>
        </motion.div>
        {/* Attendance */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2"><CalendarCheck2 className="h-6 w-6 text-yellow-600" /><span className="font-bold text-lg">Attendance</span></div>
          <div className="flex items-center gap-2"><b>Attendance:</b> <span>{student.attendance != null ? student.attendance + "%" : "-"}</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden w-32">
              <div className="h-full bg-yellow-500" style={{ width: `${student.attendance ? student.attendance : 0}%` }}></div>
            </div>
          </div>
        </motion.div>
        {/* Exams & Grades */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2"><FileText className="h-6 w-6 text-purple-600" /><span className="font-bold text-lg">Exams & Grades</span></div>
          <ul className="mb-2">
            {(exams || []).length > 0 ? exams.map((exam, i) => (
              <li key={i} className="flex justify-between"><span>{exam.name}</span><span>{exam.score} ({exam.grade})</span></li>
            )) : <li className="text-gray-400">No exam data.</li>}
          </ul>
          <button className="btn btn-primary flex items-center gap-2 w-max"><Download className="h-4 w-4" /> Download Report Card</button>
        </motion.div>
        {/* Fee Status */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2"><BadgeCheck className="h-6 w-6 text-green-600" /><span className="font-bold text-lg">Fee Status</span></div>
          <div><b>Last Payment:</b> {fee?.lastPayment || "-"}</div>
          <div className="flex items-center gap-2"><b>Status:</b> <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${fee?.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'}`}>{fee?.status || "-"}</span></div>
          <button className="btn btn-primary flex items-center gap-2 w-max"><Download className="h-4 w-4" /> Download Receipt</button>
        </motion.div>
        {/* News Section (collapsible) */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
          <details open>
            <summary className="flex items-center gap-2 mb-2 cursor-pointer select-none"><Newspaper className="h-6 w-6 text-blue-600" /><span className="font-bold text-lg">Latest News</span></summary>
            <ul>
              {(news || []).length > 0 ? news.map((n, i) => (
                <li key={i} className="flex justify-between"><span>{n.title}</span><span className="text-xs text-gray-500">{n.publishedAt || n.date || "-"}</span></li>
              )) : <li className="text-gray-400">No news available.</li>}
            </ul>
          </details>
        </motion.div>
        {/* Upcoming Events (collapsible) */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} className="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
          <details open>
            <summary className="flex items-center gap-2 mb-2 cursor-pointer select-none"><CalendarDays className="h-6 w-6 text-pink-600" /><span className="font-bold text-lg">Upcoming Events</span></summary>
            <ul>
              {(events || []).length > 0 ? events.map((e, i) => (
                <li key={i} className="flex justify-between"><span>{e.title}</span><span className="text-xs text-gray-500">{e.date}</span></li>
              )) : <li className="text-gray-400">No events.</li>}
            </ul>
          </details>
        </motion.div>
        {/* Timetable (collapsible) */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7 }} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
          <details open>
            <summary className="flex items-center gap-2 mb-2 cursor-pointer select-none"><Clock className="h-6 w-6 text-green-600" /><span className="font-bold text-lg">Timetable</span></summary>
            <table className="w-full text-sm mt-2">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-1">Day</th>
                  <th className="py-1">Periods</th>
                </tr>
              </thead>
              <tbody>
                {(timetable || []).length > 0 ? timetable.map((row, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="py-1 font-semibold">{row.dayOfWeek || row.day || "-"}</td>
                    <td className="py-1">{(row.periods || []).join(", ")}</td>
                  </tr>
                )) : <tr><td colSpan={2} className="text-gray-400">No timetable data.</td></tr>}
              </tbody>
            </table>
          </details>
        </motion.div>
        {/* Homework (collapsible) */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.8 }} className="bg-gradient-to-br from-yellow-50 to-blue-50 rounded-2xl shadow-lg p-6 flex flex-col gap-3">
          <details open>
            <summary className="flex items-center gap-2 mb-2 cursor-pointer select-none"><ClipboardList className="h-6 w-6 text-yellow-600" /><span className="font-bold text-lg">Homework</span></summary>
            <ul>
              {(homework || []).length > 0 ? homework.map((h, i) => (
                <li key={i} className="flex justify-between"><span>{h.subject}: {h.description || h.desc}</span><span className="text-xs text-gray-500">Due: {h.dueDate || h.due || "-"}</span></li>
              )) : <li className="text-gray-400">No homework assigned.</li>}
            </ul>
          </details>
        </motion.div>
      </div>
    </div>
  );
}

export default StudentProfileDashboard;
