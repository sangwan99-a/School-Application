import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarDays, Clock } from "lucide-react";

const localizer = momentLocalizer(moment);

const Timetable = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    subjectName: "",
    teacherId: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    // Fetch classes
    axios.get("/api/classes").then((response) => setClasses(response.data));
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchTimetable(selectedClass);
    }
  }, [selectedClass]);

  const formatTimetableToEvents = (timetable) => {
    return timetable.map((item) => ({
      title: `${item.subjectName} (${item.teacherId})`,
      start: new Date(`2025-01-01T${item.startTime}`),
      end: new Date(`2025-01-01T${item.endTime}`),
    }));
  };

  const fetchTimetable = (classId) => {
    axios.get(`/api/timetables/class/${classId}`).then((response) => {
      setTimetable(response.data);
      setEvents(formatTimetableToEvents(response.data));
    });
  };

  const handleAddSession = () => {
    const payload = { ...form, classId: selectedClass };
    axios.post("/api/timetables", payload).then(() => {
      alert("Session added successfully!");
      fetchTimetable(selectedClass);
      setForm({ subjectName: "", teacherId: "", dayOfWeek: "", startTime: "", endTime: "" });
    });
  };

  const handleDeleteSession = (id) => {
    axios.delete(`/api/timetables/${id}`).then(() => {
      alert("Session deleted successfully!");
      fetchTimetable(selectedClass);
    });
  };

  const handleDetectConflicts = () => {
    axios.post("/api/timetable/conflicts", form).then((response) => {
      if (response.data.length > 0) {
        alert("Conflicts detected: " + response.data.join(", "));
      } else {
        alert("No conflicts detected.");
      }
    });
  };


  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-green-50 to-purple-100 flex flex-col items-center justify-start">
      {/* Abstract background SVGs */}
      <svg className="absolute left-0 top-0 -z-10 opacity-30" width="600" height="400" viewBox="0 0 600 400" fill="none"><ellipse cx="300" cy="200" rx="300" ry="200" fill="url(#paint0_radial)" /></svg>
      <svg className="absolute right-0 bottom-0 -z-10 opacity-20" width="500" height="300" viewBox="0 0 500 300" fill="none"><ellipse cx="250" cy="150" rx="250" ry="150" fill="url(#paint1_radial)" /></svg>

      <div className="w-full bg-white/70 backdrop-blur-xl rounded-xl shadow-xl p-8 mt-10 mb-8 max-w-3xl text-center border border-white/30">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4 drop-shadow-lg flex items-center justify-center gap-2"><CalendarDays className="w-8 h-8 text-blue-400" /> Timetable</h1>
        <p className="text-lg text-gray-700">Manage and view class timetables, sessions, and calendar events.</p>
      </div>

      {/* Select Class */}
      <div className="mb-6 w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30">
        <h2 className="text-xl font-semibold mb-2">Select Class</h2>
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            fetchTimetable(e.target.value);
          }}
          className="block w-full p-2 border rounded-lg mb-2"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Session */}
      <div className="mb-6 w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><Clock className="w-6 h-6 text-yellow-400" /> Add Session</h2>
        <input
          type="text"
          placeholder="Subject Name"
          value={form.subjectName}
          onChange={(e) => setForm({ ...form, subjectName: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Teacher ID"
          value={form.teacherId}
          onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <select
          value={form.dayOfWeek}
          onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
        <input
          type="time"
          placeholder="Start Time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="time"
          placeholder="End Time"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddSession}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition"
          >
            Add Session
          </button>
          <button
            onClick={handleDetectConflicts}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-yellow-600 transition"
          >
            Detect Conflicts
          </button>
        </div>
      </div>

      {/* Timetable */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30 mb-8">
        <h2 className="text-xl font-semibold mb-2">Weekly Timetable</h2>
        {timetable.map((session) => (
          <div key={session.id} className="p-2 border-b flex justify-between items-center">
            <div>
              {session.dayOfWeek} - {session.startTime} to {session.endTime} - {session.subjectName} (Teacher: {session.teacherId})
            </div>
            <button
              onClick={() => handleDeleteSession(session.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Calendar View */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30 mb-8">
        <h2 className="text-xl font-semibold mb-2">Calendar View</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </div>

      {/* Timetable Calendar */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30 mb-10">
        <h2 className="text-xl font-semibold mb-2">Timetable Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
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

export default Timetable;
