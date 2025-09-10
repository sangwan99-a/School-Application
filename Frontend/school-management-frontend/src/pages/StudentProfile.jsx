import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentProfile = ({ studentId }) => {
  const [student, setStudent] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [feeHistory, setFeeHistory] = useState([]);

  useEffect(() => {
    fetchStudentDetails();
    fetchBorrowedBooks();
    fetchFeeHistory();
  }, [studentId]);

  const fetchStudentDetails = () => {
    axios.get(`/api/students/${studentId}`).then((response) => setStudent(response.data));
  };

  const fetchBorrowedBooks = () => {
    axios.get(`/api/students/${studentId}/borrowed-books`).then((response) => setBorrowedBooks(response.data));
  };

  const fetchFeeHistory = () => {
    axios.get(`/api/students/${studentId}/fee-history`).then((response) => setFeeHistory(response.data));
  };

  if (!student) return <p>Loading...</p>;

  // Prepare base64 image if available
  let profilePhotoUrl = null;
  if (student.profilePhoto) {
    // Handle both ArrayBuffer and base64 string
    if (typeof student.profilePhoto === 'string') {
      profilePhotoUrl = `data:image/jpeg;base64,${student.profilePhoto}`;
    } else if (student.profilePhoto.data) {
      // If it's an object with a .data property (from some APIs)
      const byteArray = new Uint8Array(student.profilePhoto.data);
      let binary = '';
      for (let i = 0; i < byteArray.length; i++) {
        binary += String.fromCharCode(byteArray[i]);
      }
      profilePhotoUrl = `data:image/jpeg;base64,${window.btoa(binary)}`;
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Profile</h1>

      {/* Student Photo */}
      {profilePhotoUrl && (
        <div className="mb-6 flex justify-center">
          <img src={profilePhotoUrl} alt="Profile" className="h-32 w-32 rounded-full object-cover border-2 border-blue-400" />
        </div>
      )}

      {/* Student Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Details</h2>
        <p><strong>Admission No:</strong> {student.admissionNo || '-'}</p>
        <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Class:</strong> {student.studentClass}</p>
      </div>

      {/* Borrowed Books */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Borrowed Books</h2>
        {borrowedBooks.length > 0 ? (
          <ul>
            {borrowedBooks.map((book) => (
              <li key={book.id}>
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Due Date:</strong> {book.dueDate}</p>
                <p><strong>Status:</strong> {book.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No borrowed books.</p>
        )}
      </div>

      {/* Fee History */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Fee History</h2>
        {feeHistory.length > 0 ? (
          <ul>
            {feeHistory.map((fee) => (
              <li key={fee.id}>
                <p><strong>Fee Type:</strong> {fee.feeType}</p>
                <p><strong>Amount:</strong> ${fee.amount}</p>
                <p><strong>Status:</strong> {fee.status}</p>
                <p><strong>Payment Date:</strong> {fee.paymentDate}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No fee history available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
