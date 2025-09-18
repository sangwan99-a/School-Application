INSERT INTO book (title, author, isbn, category, status) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'Fiction', 'available'),
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 'Fiction', 'available'),
('1984', 'George Orwell', '9780451524935', 'Dystopian', 'issued');

INSERT INTO issued_book (book_id, student_id, issue_date, due_date, late_fee) VALUES
(3, 1, '2025-08-01', '2025-08-10', 0.0);

INSERT INTO route (pickup_points, drop_points, timings) VALUES
('Point A, Point B', 'Point C, Point D', '8:00 AM - 9:00 AM'),
('Point E, Point F', 'Point G, Point H', '9:00 AM - 10:00 AM');

INSERT INTO bus (vehicle_number, capacity, driver_name, driver_contact, route_id) VALUES
('Bus 101', 50, 'John Doe', '1234567890', 1),
('Bus 102', 40, 'Jane Smith', '0987654321', 2);

INSERT INTO exam (name, class_name, subject, date, time, total_marks) VALUES
('Midterm Exam', 'Class X', 'Mathematics', '2025-09-15', '09:00:00', 100),
('Final Exam', 'Class X', 'Mathematics', '2025-12-20', '09:00:00', 100);

INSERT INTO exam_subject (exam_id, subject_name, teacher_id) VALUES
(1, 'Mathematics', 101),
(1, 'Science', 102),
(2, 'Mathematics', 101),
(2, 'Science', 102);

INSERT INTO results (exam_id, student_id, class_id, marks_obtained, grade) VALUES
(1, 201, 1, 85.0, 'A'),
(1, 202, 1, 90.0, 'A+'),
(2, 201, 1, 88.0, 'A'),
(2, 202, 1, 92.0, 'A+');
