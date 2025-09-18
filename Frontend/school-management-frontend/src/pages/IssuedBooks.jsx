import { useEffect, useState } from "react";
import axios from "axios";

export default function IssuedBooks() {
  const [issued, setIssued] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  axios.get("https://school-application-tkmu.onrender.com/api/book-issues/issued")
      .then(res => setIssued(res.data))
      .catch(() => setError("Failed to load issued books"))
      .finally(() => setLoading(false));
  }, []);

  const handleReturn = async (id) => {
  await axios.post(`https://school-application-tkmu.onrender.com/api/book-issues/${id}/return`);
    setIssued(issued => issued.filter(bi => bi.id !== id));
  };

  if (loading) return <p className="p-6">Loading issued books...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Issued Books</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">Book</th>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Issue Date</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {issued.map(bi => (
            <tr key={bi.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{bi.book?.title}</td>
              <td className="p-3">{bi.student?.firstName} {bi.student?.lastName}</td>
              <td className="p-3">{bi.issueDate}</td>
              <td className="p-3">{bi.dueDate || '-'}</td>
              <td className="p-3">
                <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => handleReturn(bi.id)}>Return</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
