

import axios from "axios";

const navLinks = [
  { name: "Dashboard", icon: (
    <svg className="w-5 h-5 mr-3 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"/></svg>
  ) },
  { name: "Students", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"/></svg>
  ) },
  { name: "Classes", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
  ) },
  { name: "Exams", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6"/></svg>
  ) },
  { name: "Admission", icon: (
    <svg className="w-5 h-5 mr-3 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.1.9-2 2-2h4a2 2 0 012 2v6a2 2 0 01-2 2h-4a2 2 0 01-2-2v-6z"/></svg>
  ) },
  { name: "Settings", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/></svg>
  ) },
];

const statCards = [
  { title: "New Applications", value: "32", color: "green", icon: (
    <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.1.9-2 2-2h4a2 2 0 012 2v6a2 2 0 01-2 2h-4a2 2 0 01-2-2v-6z"/></svg>
  ) },
  { title: "Approved", value: "18", color: "green", icon: (
    <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
  ) },
  { title: "Pending", value: "14", color: "green", icon: (
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

export default function Admission() {
  const [admissions, setAdmissions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState({});
  const [accepting, setAccepting] = useState({});
  const [active, setActive] = useState("Admission");

  React.useEffect(() => {
    const fetchAdmissions = axios.get("/api/admission");
    const fetchClasses = axios.get("/api/classes");
    Promise.all([fetchAdmissions, fetchClasses])
      .then(([admRes, classRes]) => {
        setAdmissions(admRes.data);
        setClasses(classRes.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch admissions or classes");
        setLoading(false);
      });
  }, []);

  const handleClassChange = (admId, classId) => {
    setSelectedClass(prev => ({ ...prev, [admId]: classId }));
  };

  const handleAccept = async (admId) => {
    const classId = selectedClass[admId];
    if (!classId) {
      alert("Please select a class");
      return;
    }
    setAccepting(prev => ({ ...prev, [admId]: true }));
    try {
      await axios.post(`/api/admissions/${admId}/approve?classId=${classId}`);
      setAdmissions(prev => prev.map(a => a.id === admId ? { ...a, status: "APPROVED" } : a));
    } catch (err) {
      alert("Failed to approve admission");
    } finally {
      setAccepting(prev => ({ ...prev, [admId]: false }));
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-lg rounded-r-3xl flex flex-col z-20">
        <div className="py-8 px-6 flex flex-col h-full">
          <div className="flex items-center mb-8">
            <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/></svg>
            <span className="text-2xl font-bold text-gray-800">Admin Hub</span>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  <button
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-transform transform hover:scale-105 font-semibold ${
                      active === link.name
                        ? "bg-gradient-to-r from-green-500 to-green-300 text-white shadow"
                        : "text-gray-700"
                    }`}
                    onClick={() => setActive(link.name)}
                  >
                    {link.icon}
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-8 text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} School Admin
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Admission</h2>
            <span className="text-gray-500 font-medium">Manage all admissions here</span>
          </div>
          <div className="w-full flex items-center">
            <div className="relative w-full">
              <input type="text" placeholder="Search applications..." className="w-full py-3 pl-12 pr-4 rounded-xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 shadow" />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
            </div>
          </div>
        </header>
        {/* Main Card */}
        <section className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map(card => (
              <StatCard key={card.title} {...card} />
            ))}
          </div>
          {/* Applications Table */}
          <div className="bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 min-h-[200px] flex flex-col items-center justify-center mb-8 p-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Applications</h3>
            {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
              <table className="min-w-full bg-white border rounded-xl overflow-hidden">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Class</th>
                    <th className="py-2 px-4 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((adm) => (
                    <tr key={adm.id}>
                      <td className="py-2 px-4 border">{adm.id}</td>
                      <td className="py-2 px-4 border">{adm.firstName} {adm.lastName}</td>
                      <td className="py-2 px-4 border">{adm.status}</td>
                      <td className="py-2 px-4 border">
                        {adm.status === "PENDING" ? (
                          <select
                            value={selectedClass[adm.id] || ""}
                            onChange={e => handleClassChange(adm.id, e.target.value)}
                            className="border rounded px-2 py-1"
                          >
                            <option value="">Select Class</option>
                            {classes.map(cls => (
                              <option key={cls.id} value={cls.id}>{cls.name} {cls.section}</option>
                            ))}
                          </select>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-2 px-4 border">
                        {adm.status === "PENDING" ? (
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => handleAccept(adm.id)}
                            disabled={accepting[adm.id]}
                          >
                            {accepting[adm.id] ? "Accepting..." : "Accept"}
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Recent Activity</h3>
            <ul className="space-y-3">
              <li className="bg-gray-50 rounded-xl p-4 shadow flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-400 text-white flex items-center justify-center font-bold text-lg">RA</span>
                <span className="text-gray-700 flex-1">Application <b>Rahul Agarwal</b> approved</span>
                <span className="text-xs text-gray-400">2h ago</span>
              </li>
              <li className="bg-gray-50 rounded-xl p-4 shadow flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">SP</span>
                <span className="text-gray-700 flex-1">Application <b>Shreya Patel</b> submitted</span>
                <span className="text-xs text-gray-400">4h ago</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
