import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentPortal = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [fineRate, setFineRate] = useState(1.0); // Default fine rate per day

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = () => {
    axios.get("/api/transactions/student/borrowed").then((response) => setBorrowedBooks(response.data));
  };

  const calculateFine = (transactionId) => {
    return axios
      .get(`/api/transactions/fine/${transactionId}`, { params: { fineRatePerDay: fineRate } })
      .then((response) => response.data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Portal</h1>

      {/* Borrowed Books */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Borrowed Books</h2>
        <div className="mt-4">
          {borrowedBooks.map((transaction) => (
            <div key={transaction.id} className="p-2 border-b">
              <p>
                <strong>Book:</strong> {transaction.book.title}
              </p>
              <p>
                <strong>Due Date:</strong> {transaction.dueDate}
              </p>
              <button
                onClick={async () => {
                  const fine = await calculateFine(transaction.id);
                  alert(`Fine for this transaction: $${fine}`);
                }}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Calculate Fine
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fine Rate Configuration */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Fine Rate Configuration</h2>
        <input
          type="number"
          value={fineRate}
          onChange={(e) => setFineRate(parseFloat(e.target.value))}
          className="block w-full p-2 border rounded mb-2"
          placeholder="Fine Rate Per Day"
        />
      </div>
    </div>
  );
};

export default StudentPortal;
