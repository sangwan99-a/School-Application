import { useEffect, useState } from "react"
import axios from "axios"
import { Users, BookOpen, DollarSign, Home } from "lucide-react"
import GlassLayout from "../components/GlassLayout";

function AdmissionApplicationsCard() {
  const [admissions, setAdmissions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [selectedClass, setSelectedClass] = useState({});

  useEffect(() => {
    async function fetchAdmissionsAndClasses() {
      try {
        const [admRes, classRes] = await Promise.all([
          axios.get("https://school-application-zs1l.onrender.com/api/admissions"),
          axios.get("https://school-application-zs1l.onrender.com/api/classes")
        ]);
        setAdmissions(admRes.data);
        setClasses(classRes.data);
      } catch (err) {
        setError("Failed to load admission applications or classes");
      } finally {
        setLoading(false);
      }
    }
    fetchAdmissionsAndClasses();
  }, [actionSuccess]);

  const handleClassChange = (admId, classId) => {
    setSelectedClass(prev => ({ ...prev, [admId]: classId }));
  };

  const handleAction = async (adm, status) => {
    setActionLoading(true);
    setActionError("");
    setActionSuccess("");
    try {
      if (status === "APPROVED") {
        const classId = selectedClass[adm.id];
        if (!classId) {
          setActionError("Please select a class before approving.");
          setActionLoading(false);
          return;
        }
  await axios.post(`https://school-application-zs1l.onrender.com/api/admissions/${adm.id}/approve?classId=${classId}`);
        setActionSuccess("Application approved.");
      } else if (status === "REJECTED") {
        // You need to implement a reject endpoint in backend for this to work
  await axios.post(`https://school-application-zs1l.onrender.com/api/admissions/${adm.id}/reject`);
        setActionSuccess("Application rejected.");
      }
      setSelected(null);
    } catch (err) {
      setActionError("Failed to update application status.");
    } finally {
      setActionLoading(false);
    }
  };


  // Helper to render a download/view link for a file (assumes file is base64 string or byte array)
  const renderFileLink = (file, name, label) => {
    if (!file) return <span className="text-gray-400">Not uploaded</span>;
    // If file is a byte array, convert to base64
    let base64 = "";
    if (typeof file === "string") {
      base64 = file;
    } else if (file instanceof Uint8Array || Array.isArray(file)) {
      base64 = btoa(String.fromCharCode(...new Uint8Array(file)));
    }
    return (
      <a href={`data:application/octet-stream;base64,${base64}`} download={name || label} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View {label}</a>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h3 className="text-xl font-bold mb-4">Admission Applications</h3>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {actionError && <div className="text-red-600">{actionError}</div>}
      {actionSuccess && <div className="text-green-600">{actionSuccess}</div>}
      {admissions.length === 0 && !loading && <div>No admission applications found.</div>}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-yellow-700">Pending Applications</h4>
        <ul className="space-y-4">
          {admissions.filter(a => a.status === 'PENDING').map(adm => (
            <li key={adm.id} className="border rounded-lg p-4 flex flex-col gap-2 bg-yellow-50">
              <div><b>Name:</b> {adm.firstName} {adm.lastName}</div>
              <div><b>Class Applied:</b> {adm.classApplied}</div>
              <div><b>Email:</b> {adm.email}</div>
              <div><b>Phone:</b> {adm.phone}</div>
              <div><b>Status:</b> {adm.status}</div>
              <div>
                <label className="mr-2 font-semibold">Assign to Class:</label>
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
              </div>
              <button className="btn btn-primary mt-2 w-max" onClick={() => setSelected(adm)}>View Full Application</button>
            </li>
          ))}
          {admissions.filter(a => a.status === 'PENDING').length === 0 && <li className="text-gray-500">No pending applications.</li>}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2 text-green-700">Approved Applications</h4>
  // ...existing code...
        <ul className="space-y-4">
          {admissions.filter(a => a.status === 'APPROVED').map(adm => (
            <li key={adm.id} className="border rounded-lg p-4 flex flex-col gap-2 bg-green-50">
              <div><b>Name:</b> {adm.firstName} {adm.lastName}</div>
              <div><b>Class:</b> {adm.classApplied}</div>
              <div><b>Email:</b> {adm.email}</div>
              <div><b>Phone:</b> {adm.phone}</div>
              <div><b>Status:</b> {adm.status}</div>
              <button className="btn btn-primary mt-2 w-max" onClick={() => setSelected(adm)}>View Full Application</button>
            </li>
          ))}
          {admissions.filter(a => a.status === 'APPROVED').length === 0 && <li className="text-gray-500">No approved applications.</li>}
        </ul>
      </div>

      {/* Modal for full application view */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setSelected(null)}>&times;</button>
              <h3 className="text-2xl font-bold mb-4">Full Application</h3>
              <div className="space-y-2">
                <div><b>Name:</b> {selected.firstName} {selected.lastName}</div>
                <div><b>Date of Birth:</b> {selected.dob}</div>
                <div><b>Gender:</b> {selected.gender}</div>
                <div><b>Class Applied:</b> {selected.classApplied}</div>
                <div><b>Address:</b> {selected.address}</div>
                <div><b>Phone:</b> {selected.phone}</div>
                {/* Add more fields as needed, e.g. documents, etc. */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default AdmissionApplicationsCard;


