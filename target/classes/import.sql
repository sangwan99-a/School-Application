-- Seed Classes
INSERT INTO class_entity (id, name, section, teacher_in_charge, teacher_in_charge_id) VALUES (1, '10th', 'A', 'Mr. Smith', 101);
INSERT INTO class_entity (id, name, section, teacher_in_charge, teacher_in_charge_id) VALUES (2, '9th', 'B', 'Ms. Johnson', 102);

-- Seed Students
INSERT INTO student (id, first_name, last_name, email, phone_number, address, father_name, mother_name, date_of_birth, gender, nationality, emergency_contact, guardian_name, guardian_relationship, class_id)
VALUES (1, 'John', 'Doe', 'john.doe@email.com', '1234567890', '123 Main St', 'Richard Doe', 'Mary Doe', '2010-05-15', 'MALE', 'Indian', '9876543210', 'Richard Doe', 'Father', 1);
INSERT INTO student (id, first_name, last_name, email, phone_number, address, father_name, mother_name, date_of_birth, gender, nationality, emergency_contact, guardian_name, guardian_relationship, class_id)
VALUES (2, 'Jane', 'Smith', 'jane.smith@email.com', '2345678901', '456 Elm St', 'Robert Smith', 'Linda Smith', '2011-08-22', 'FEMALE', 'Indian', '8765432109', 'Linda Smith', 'Mother', 2);

-- Seed Staff
INSERT INTO staff_entity (id, name, role, email, phone_number, salary, category, sub_category, subject_specialization)
VALUES (101, 'Mr. Smith', 'Teacher', 'mr.smith@email.com', '1112223333', 50000, 'Academic', 'Math', 'Mathematics');
INSERT INTO staff_entity (id, name, role, email, phone_number, salary, category, sub_category, subject_specialization)
VALUES (102, 'Ms. Johnson', 'Teacher', 'ms.johnson@email.com', '4445556666', 48000, 'Academic', 'Science', 'Physics');

-- Seed Fees
INSERT INTO fee_entity (id, student_name, grade, amount, due_date, is_paid)
VALUES (1, 'John Doe', '10th', 1500.00, '2025-09-01', TRUE);
INSERT INTO fee_entity (id, student_name, grade, amount, due_date, is_paid)
VALUES (2, 'Jane Smith', '9th', 1400.00, '2025-09-01', FALSE);
