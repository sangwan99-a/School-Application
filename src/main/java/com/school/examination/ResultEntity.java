package com.school.examination;

import jakarta.persistence.*;

@Entity
@Table(name = "results")
public class ResultEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double marksObtained;
    private String grade;
    private String remarks;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private com.school.student.Student student;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private ExamEntity exam;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private com.school.academic.ClassEntity classEntity;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getMarksObtained() { return marksObtained; }
    public void setMarksObtained(Double marksObtained) { this.marksObtained = marksObtained; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public com.school.student.Student getStudent() { return student; }
    public void setStudent(com.school.student.Student student) { this.student = student; }

    public ExamEntity getExam() { return exam; }
    public void setExam(ExamEntity exam) { this.exam = exam; }

    public com.school.academic.ClassEntity getClassEntity() { return classEntity; }
    public void setClassEntity(com.school.academic.ClassEntity classEntity) { this.classEntity = classEntity; }
}
