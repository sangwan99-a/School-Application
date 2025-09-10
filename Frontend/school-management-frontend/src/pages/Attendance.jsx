import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Attendance = () => {
  const [markedAttendance, setMarkedAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState([]);
  const [filters, setFilters] = useState({ studentName: "", startDate: "", endDate: "" });
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState([]);

  const chartData = {
    labels: ["Present", "Absent", "Late"],
    datasets: [
      {
        label: "Attendance",
        data: [
          summary.length > 0 ? summary[0].present : 0,
          summary.length > 0 ? summary[0].absent : 0,
          summary.length > 0 ? summary[0].late : 0
        ],
        backgroundColor: [
          "#22c55e", // green
          "#ef4444", // red
          "#eab308"  // yellow
        ]
      }
    ]
  };

  const handleAttendanceChange = (studentId, status) => {
    setMarkedAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = () => {
    const attendancePayload = Object.entries(markedAttendance).map(([studentId, status]) => ({
      studentId,
      status,
      date: selectedDate,
      classId: selectedClass
    }));
    axios.post("/api/attendance/bulk", attendancePayload)
      .then(() => {
        fetchAttendanceSummary();
        fetchAttendance();
        setMarkedAttendance({});
      })
      .catch(error => {
        console.error("Error submitting attendance:", error);
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    axios.get("/api/classes")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setClasses(response.data);
        } else {
          setClasses([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setClasses([]);
      });
  };


  const fetchStudents = (classId) => {
    axios.get(`/api/classes/${classId}/students`).then((response) => setStudents(response.data));
  };

  const fetchAttendance = () => {
    axios
      .get("/api/attendance/filter", {
        params: { ...filters, classId: selectedClass },
      })
      .then((response) => setAttendance(response.data));
  };

  // Fetch attendance summary for dashboard and chart
  const fetchAttendanceSummary = () => {
    axios
      .get("/api/attendance/summary", {
        params: { ...filters, classId: selectedClass },
      })
      .then((response) => {
        setSummary(response.data.summary || []);
        setAttendanceRecords(response.data.records || []);
      })
      .catch((error) => {
        console.error("Error fetching attendance summary:", error);
      });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-green-50 to-purple-100 flex flex-col items-center justify-start">
      {/* Abstract background SVGs */}
      <svg className="absolute left-0 top-0 -z-10 opacity-30" width="600" height="400" viewBox="0 0 600 400" fill="none"><ellipse cx="300" cy="200" rx="300" ry="200" fill="url(#paint0_radial)" /></svg>
      <svg className="absolute right-0 bottom-0 -z-10 opacity-20" width="500" height="300" viewBox="0 0 500 300" fill="none"><ellipse cx="250" cy="150" rx="250" ry="150" fill="url(#paint1_radial)" /></svg>

      <div className="w-full bg-white/70 backdrop-blur-xl rounded-xl shadow-xl p-8 mt-10 mb-8 max-w-3xl text-center border border-white/30">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow-lg flex items-center justify-center gap-2"><Users className="w-8 h-8 text-blue-400" /> Attendance Dashboard</h1>
        <p className="text-lg text-gray-700">Track, manage, and analyze student attendance with ease. Use the controls below to mark attendance, view summaries, and explore records.</p>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-4 mb-8 flex flex-col md:flex-row gap-6 items-center justify-between max-w-5xl w-full border border-white/30">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Date</label>
          <Calendar onChange={setSelectedDate} value={selectedDate} className="rounded-xl border" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Class</label>
          <select
            value={selectedClass || ""}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              fetchStudents(e.target.value);
            }}
            className="p-2 border rounded-lg"
          >
            <option value="">Select Class</option>
            {Array.isArray(classes) && classes.length === 0 && (
              <option disabled>No classes found</option>
            )}
            {Array.isArray(classes) && classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}{cls.section ? ` - Section ${cls.section}` : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Filters</label>
          <div className="flex gap-2">
            <input type="date" value={filters.startDate} onChange={e => setFilters({ ...filters, startDate: e.target.value })} className="p-2 border rounded-lg" />
            <input type="date" value={filters.endDate} onChange={e => setFilters({ ...filters, endDate: e.target.value })} className="p-2 border rounded-lg" />
            <button onClick={fetchAttendanceSummary} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow">Apply</button>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow flex flex-col items-center border border-white/30">
          <div className="text-4xl font-bold text-blue-700 flex items-center gap-2"><Users className="w-7 h-7 text-blue-400" />{students.length}</div>
          <div className="text-lg font-semibold text-blue-600">Total Students</div>
        </div>
        <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow flex flex-col items-center border border-white/30">
          <div className="text-4xl font-bold text-green-700 flex items-center gap-2"><CheckCircle className="w-7 h-7 text-green-400" />{attendanceRecords.filter(r => r.status === "Present").length}</div>
          <div className="text-lg font-semibold text-green-600">Present</div>
        </div>
        <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow flex flex-col items-center border border-white/30">
          <div className="text-4xl font-bold text-red-700 flex items-center gap-2"><XCircle className="w-7 h-7 text-red-400" />{attendanceRecords.filter(r => r.status === "Absent").length}</div>
          <div className="text-lg font-semibold text-red-600">Absent</div>
        </div>
      </div>

      {/* Responsive Student Grid for Marking Attendance */}
      <div className="mb-10 w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Mark Attendance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map(student => (
            <div key={student.id} className="bg-white/80 backdrop-blur-xl rounded-xl shadow p-4 flex flex-col gap-2 border border-white/30">
              <div className="font-bold text-lg text-blue-700">{student.firstName} {student.lastName}</div>
              <div className="text-sm text-gray-500">ID: {student.id}</div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleAttendanceChange(student.id, "Present")}
                  className={`px-4 py-2 rounded font-bold ${markedAttendance[student.id] === "Present" ? "bg-green-700 text-white" : "bg-green-500 text-white hover:bg-green-600"}`}
                >
                  Present
                </button>
                <button
                  onClick={() => handleAttendanceChange(student.id, "Absent")}
                  className={`px-4 py-2 rounded font-bold ${markedAttendance[student.id] === "Absent" ? "bg-red-700 text-white" : "bg-red-500 text-white hover:bg-red-600"}`}
                >
                  Absent
                </button>
                <button
                  onClick={() => handleAttendanceChange(student.id, "Late")}
                  className={`px-4 py-2 rounded font-bold ${markedAttendance[student.id] === "Late" ? "bg-yellow-700 text-white" : "bg-yellow-500 text-white hover:bg-yellow-600"}`}
                >
                  Late
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={submitAttendance} className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow">Submit Attendance</button>
      </div>

      {/* Attendance Summary Chart */}
      <div className="mb-10 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Attendance Summary Chart</h2>
        {summary.length > 0 ? (
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
        ) : (
          <p className="text-gray-500">No summary data available.</p>
        )}
      </div>

      {/* Attendance Records Table */}
      <div className="mb-10 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Attendance Records</h2>
        {attendance.length > 0 ? (
          <table className="min-w-full bg-white/80 backdrop-blur-xl rounded-xl shadow overflow-hidden border border-white/30">
            <thead className="bg-gray-100/80">
              <tr>
                <th className="p-3 text-left font-medium">Student Name</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(record => (
                <tr key={record.id} className="border-b">
                  <td className="p-3">{record.studentName}</td>
                  <td className="p-3">{record.status}</td>
                  <td className="p-3">{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No attendance records found.</p>
        )}
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
};

export default Attendance;

