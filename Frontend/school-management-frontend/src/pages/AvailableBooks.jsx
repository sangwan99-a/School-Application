import { useEffect, useState } from "react";
import axios from "axios";

export default function AvailableBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/api/books/available")
      .then(res => setBooks(res.data))
      .catch(() => setError("Failed to load available books"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading available books...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Books</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Author</th>
            <th className="p-3 text-left">ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{b.title}</td>
              <td className="p-3">{b.author}</td>
              <td className="p-3">{b.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
