package com.school.examination;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examId;

    private String examName;
    private Long classId;
    private Long subjectId;
    private LocalDate examDate;
    private LocalTime examTime; // New field for exam time
    private Integer maxMarks;
    private Integer passingMarks;
    private String type; // midterm, final, quiz, etc.
    private String associatedClass;
    private String examType; // midterm, final, etc.

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<ExamSubject> subjects;

    // Added missing methods
    public void setId(Long id) {
        this.examId = id;
    }

    public String getSubject() {
        return this.examName;
    }

    public String getGrade() {
        // Placeholder for grade logic
        return "A";
    }

    public Integer getObtainedMarks() {
        // Placeholder for obtained marks logic
        return 0;
    }

    public Integer getTotalMarks() {
        return this.maxMarks;
    }

    // Added missing setter methods
    public void setSubject(String subject) {
        this.examName = subject;
    }

    public void setGrade(String grade) {
        // Placeholder for grade logic
    }

    public void setObtainedMarks(Integer obtainedMarks) {
        // Placeholder for obtained marks logic
    }
}
