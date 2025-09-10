package com.school.communication;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private LocalDateTime timestamp;

    @ManyToOne
    private com.school.student.Student sender;

    @ManyToOne
    private com.school.student.Student receiver;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    public enum MessageType {
        STUDENT_TO_TEACHER, TEACHER_TO_TEACHER, TEACHER_TO_ADMIN, ADMIN_TO_ALL
    }
}
