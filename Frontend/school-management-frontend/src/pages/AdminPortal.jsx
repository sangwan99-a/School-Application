import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPortal = () => {
  const [books, setBooks] = useState([]);
  const [overdueTransactions, setOverdueTransactions] = useState([]);
  const [fineRate, setFineRate] = useState(1.0); // Default fine rate per day

  useEffect(() => {
    fetchBooks();
    fetchOverdueTransactions();
  }, []);

  const fetchBooks = () => {
    axios.get("/api/books").then((response) => setBooks(response.data));
  };

  const fetchOverdueTransactions = () => {
    axios.get("/api/transactions/overdue").then((response) => setOverdueTransactions(response.data));
  };

  const calculateFine = (transactionId) => {
    return axios
      .get(`/api/transactions/fine/${transactionId}`, { params: { fineRatePerDay: fineRate } })
      .then((response) => response.data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin/Staff Portal</h1>

      {/* Library Inventory */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Library Inventory</h2>
        <div className="mt-4">
          {books.map((book) => (
            <div key={book.id} className="p-2 border-b">
              <p>
                <strong>Title:</strong> {book.title} | <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Category:</strong> {book.category} | <strong>Available:</strong> {book.quantityAvailable}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Overdue Transactions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overdue Transactions</h2>
        <div className="mt-4">
          {overdueTransactions.map((transaction) => (
            <div key={transaction.id} className="p-2 border-b">
              <p>
                <strong>Book:</strong> {transaction.book.title} | <strong>Borrowed By:</strong> {transaction.student.firstName} {transaction.student.lastName}
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

export default AdminPortal;
