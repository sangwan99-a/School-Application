import React, { useState, useEffect } from "react";
import axios from "axios";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", isbn: "", category: "", quantity: "" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [search, setSearch] = useState({ title: "", author: "", isbn: "", category: "" });
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [borrowForm, setBorrowForm] = useState({ studentId: "", bookId: "" });
  const [returnForm, setReturnForm] = useState({ transactionId: "" });
  const [overdueTransactions, setOverdueTransactions] = useState([]);
  const [fineRate, setFineRate] = useState(1.0); // Default fine rate per day
  const [errorMessage, setErrorMessage] = useState("");
  const [upcomingDueTransactions, setUpcomingDueTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBooks();
    fetchStudents();
    fetchTransactions();
    fetchOverdueTransactions();
    fetchUpcomingDueTransactions();
  }, []);

  const fetchBooks = () => {
  axios.get("/api/books").then((response) => setBooks(Array.isArray(response.data) ? response.data : []));
  };

  const fetchStudents = () => {
  axios.get("/api/students").then((response) => setStudents(Array.isArray(response.data) ? response.data : []));
  };

  const fetchTransactions = () => {
  axios.get("/api/transactions").then((response) => setTransactions(Array.isArray(response.data) ? response.data : []));
  };

  const fetchOverdueTransactions = () => {
  axios.get("/api/transactions/overdue").then((response) => setOverdueTransactions(Array.isArray(response.data) ? response.data : []));
  };

  const fetchUpcomingDueTransactions = () => {
    axios
      .get("/api/transactions/upcoming-due", { params: { days: 3 } })
      .then((response) => setUpcomingDueTransactions(Array.isArray(response.data) ? response.data : []));
  };

  const handleAddOrUpdateBook = () => {
    if (selectedBook) {
      axios.put(`/api/books/${selectedBook.id}`, form).then(() => {
        fetchBooks();
        setForm({ title: "", author: "", isbn: "", category: "", quantity: "" });
        setSelectedBook(null);
      });
    } else {
      axios.post("/api/books", form).then(() => {
        fetchBooks();
        setForm({ title: "", author: "", isbn: "", category: "", quantity: "" });
      });
    }
  };

  const handleEdit = (book) => {
    setForm(book);
    setSelectedBook(book);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/books/${id}`).then(() => fetchBooks());
  };

  const handleSearch = () => {
    axios
      .get(`/api/library/books/search?query=${searchQuery}`)
      .then((response) => setBooks(response.data));
  };

  const fetchOverdueBooks = () => {
    axios.get("/api/book-issues/overdue").then((response) => setOverdueBooks(response.data));
  };

  const handleBorrowBook = () => {
    axios
      .post("/api/transactions/borrow", borrowForm)
      .then(() => {
        fetchBooks();
        fetchTransactions();
        setBorrowForm({ studentId: "", bookId: "" });
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      });
  };

  const handleReturnBook = () => {
    axios.post(`/api/transactions/return/${returnForm.transactionId}`).then(() => {
      fetchBooks();
      fetchTransactions();
      setReturnForm({ transactionId: "" });
    });
  };

  const calculateFine = (transactionId) => {
    return axios
      .get(`/api/transactions/fine/${transactionId}`, { params: { fineRatePerDay: fineRate } })
      .then((response) => response.data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Library Management</h1>

      {/* Add/Edit Book */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add/Edit Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="ISBN"
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddOrUpdateBook}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {selectedBook ? "Update Book" : "Add Book"}
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Book List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Book List</h2>
        <div className="mt-4">
          {Array.isArray(books) && books.map((book) => (
            <div key={book.id} className="p-2 border-b">
              <p>
                <strong>Title:</strong> {book.title} | <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn} | <strong>Category:</strong> {book.category}
              </p>
              <p>
                <strong>Quantity:</strong> {book.quantity}
              </p>
              <button
                onClick={() => handleEdit(book)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Overdue Books */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overdue Books</h2>
        <button
          onClick={fetchOverdueBooks}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Fetch Overdue Books
        </button>
        <div className="mt-4">
          {overdueBooks.map((book) => (
            <div key={book.id} className="p-2 border-b">
              <p>
                <strong>Title:</strong> {book.title} | <strong>Borrower:</strong> {book.borrowerId}
              </p>
              <p>
                <strong>Due Date:</strong> {book.dueDate} | <strong>Status:</strong> {book.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Borrow Book */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Borrow Book</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <select
          value={borrowForm.studentId}
          onChange={(e) => setBorrowForm({ ...borrowForm, studentId: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        >
          <option value="">Select Student</option>
          {Array.isArray(students) && students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>
        <select
          value={borrowForm.bookId}
          onChange={(e) => setBorrowForm({ ...borrowForm, bookId: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        >
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
        <button
          onClick={handleBorrowBook}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Borrow Book
        </button>
      </div>

      {/* Return Book */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Return Book</h2>
        <select
          value={returnForm.transactionId}
          onChange={(e) => setReturnForm({ ...returnForm, transactionId: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        >
          <option value="">Select Transaction</option>
          {Array.isArray(transactions) && transactions.map((transaction) => (
            <option key={transaction.id} value={transaction.id}>
              {transaction.book.title} - Borrowed by {transaction.student.firstName} {transaction.student.lastName}
            </option>
          ))}
        </select>
        <button
          onClick={handleReturnBook}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Return Book
        </button>
      </div>

      {/* Overdue Transactions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overdue Transactions</h2>
        <div className="mt-4">
          {Array.isArray(overdueTransactions) && overdueTransactions.map((transaction) => (
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

      {/* Notifications for Upcoming Due Dates */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upcoming Due Dates</h2>
        <div className="mt-4">
          {Array.isArray(upcomingDueTransactions) && upcomingDueTransactions.length > 0 ? (
            upcomingDueTransactions.map((transaction) => (
              <div key={transaction.id} className="p-2 border-b">
                <p>
                  <strong>Book:</strong> {transaction.book.title} | <strong>Borrowed By:</strong> {transaction.student.firstName} {transaction.student.lastName}
                </p>
                <p>
                  <strong>Due Date:</strong> {transaction.dueDate}
                </p>
              </div>
            ))
          ) : (
            <p>No upcoming due dates within the next 3 days.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
