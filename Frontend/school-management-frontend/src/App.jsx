import Events from './pages/Events';
// Admin layout as a separate component
function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        {/* Profile Section */}
        <div className="flex flex-col items-center py-6 border-b border-gray-200">
          <img src="/admin.jpg" alt="Admin" className="h-16 w-16 rounded-full" />
          <h2 className="mt-2 text-lg font-semibold text-gray-700">Admin</h2>
          <p className="text-sm text-gray-500">ADMIN</p>
        </div>
        {/* Sidebar Menu */}
        <ul className="mt-6 space-y-2">
          <li><Link to="/admin/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><Home className="h-5 w-5 mr-3 text-blue-600" /> Dashboard</Link></li>
          <li><Link to="/admin/students" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><Users className="h-5 w-5 mr-3 text-green-600" /> Students</Link></li>
          <li><Link to="/admin/classes" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><BookOpen className="h-5 w-5 mr-3 text-yellow-600" /> Classes</Link></li>
          <li><Link to="/admin/exams" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><ClipboardList className="h-5 w-5 mr-3 text-red-600" /> Exams</Link></li>
          <li><Link to="/admin/attendance" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><CalendarCheck2 className="h-5 w-5 mr-3 text-purple-600" /> Attendance</Link></li>
          <li><Link to="/admin/library" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><Book className="h-5 w-5 mr-3 text-indigo-600" /> Library</Link></li>
          <li><Link to="/admin/staff" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><UserCog className="h-5 w-5 mr-3 text-pink-600" /> Staff</Link></li>
          <li><Link to="/admin/fees" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><DollarSign className="h-5 w-5 mr-3 text-orange-600" /> Fees</Link></li>
          <li><Link to="/admin/homework" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><ClipboardList className="h-5 w-5 mr-3 text-yellow-600" /> Homework (Admin)</Link></li>
          <li><Link to="/admin/news" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><BookOpen className="h-5 w-5 mr-3 text-blue-600" /> News (Admin)</Link></li>
          <li><Link to="/admin/timetable" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><CalendarCheck2 className="h-5 w-5 mr-3 text-green-600" /> Timetable (Admin)</Link></li>
          <li><Link to="/admission" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">Admission</Link></li>
          <li><Link to="/certificates" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">Certificates</Link></li>
          <li><Link to="/gradebook" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">Gradebook</Link></li>
          <li><Link to="/analytics" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">Analytics</Link></li>
          <li><Link to="/gamification" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">Gamification</Link></li>
          <li><Link to="/ai-recommendations" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">AI Recommendations</Link></li>
          <li><Link to="/system-support" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">System Support</Link></li>
  <li><Link to="/admin/events" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"><CalendarCheck2 className="h-5 w-5 mr-3 text-red-500" /> Events</Link></li>
  </ul>
        {/* Footer */}
        <footer className="mt-auto py-4 text-center text-gray-500 text-sm border-t border-gray-200">© 2025 Sunrise Public School</footer>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-3">
            <img src="/school-logo.png" alt="School Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold text-gray-700">Sunrise Public School</h1>
          </div>
          <div className="flex-1 flex justify-center">
            <input type="text" placeholder="Search students, staff, exams..." className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
        </header>
        <main className="p-6 overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="student-profile" element={<StudentProfileDashboard />} />
            <Route path="classes" element={<Classes />} />
            <Route path="exams" element={<Exam />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="library" element={<Library />} />
            <Route path="staff" element={<Staff />} />
            <Route path="fees" element={<Fees />} />
            <Route path="homework" element={<AdminHomework />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="timetable" element={<AdminTimetable />} />
            <Route path="events" element={<Events />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { Home, Users, BookOpen, DollarSign, ClipboardList, CalendarCheck2, Book, UserCog } from "lucide-react";
import './App.css';

// Import pages
import Dashboard from './pages/Dashboard';
import AdminHomework from './pages/AdminHomework';
import StudentHomework from './pages/StudentHomework';
import AdminNews from './pages/AdminNews';
import StudentNews from './pages/StudentNews';
import AdminTimetable from './pages/AdminTimetable';
import StudentTimetable from './pages/StudentTimetable';
import StudentProfileDashboard from './pages/StudentProfileDashboard';
import PublicLanding from './pages/PublicLanding';
import AdmissionForm from './pages/AdmissionForm';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Exam from './pages/Exam';   // ✅ Added Exams page
import Attendance from './pages/Attendance';
import Library from './pages/Library';
import Staff from './pages/Staff';
import Fees from './pages/Fees';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Certificates from './pages/Certificates';
import Gradebook from './pages/Gradebook';
import Analytics from './pages/Analytics';
import Gamification from './pages/Gamification';
import SystemSupport from './pages/SystemSupport';
import Admission from './pages/Admission';
// ...existing code...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLanding />} />
        <Route path="/admission" element={<AdmissionForm />} />

        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/student" element={<StudentDashboard />} />
  <Route path="/student-profile" element={<StudentProfileDashboard studentId={1} />} />
        {/* Fallback: could add a 404 page here */}
      </Routes>
    </Router>
  );
}

export default App;
