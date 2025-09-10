package com.school.examination;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ExamResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private com.school.student.Student student;

    private Integer marks;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    private boolean pass;

    private String grade;

    // Add logic to calculate pass/fail status based on marks obtained and passing marks
    // Add logic to calculate grades based on marks obtained and predefined criteria

    public void setExamId(Long examId) {
        if (this.exam == null) {
            this.exam = new Exam();
        }
        this.exam.setId(examId);
    }

    public Long getStudentId() {
        return this.student != null ? this.student.getId() : null;
    }

    public void setStudentId(Long studentId) {
        if (this.student == null) {
            this.student = new com.school.student.Student();
        }
        this.student.setId(studentId);
    }

    public Integer getMarksObtained() {
        return this.marks;
    }

    public void setMarksObtained(Integer marks) {
        this.marks = marks;
    }

    public Integer getTotalMarks() {
        return this.exam != null ? this.exam.getMaxMarks() : null;
    }
}
