package com.school.academic;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ClassEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String section;

    private String teacherInCharge;

    private Long teacherInChargeId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getTeacherInCharge() {
        return teacherInCharge;
    }

    public void setTeacherInCharge(String teacherInCharge) {
        this.teacherInCharge = teacherInCharge;
    }

    public Long getTeacherInChargeId() {
        return teacherInChargeId;
    }

    public void setTeacherInChargeId(Long teacherInChargeId) {
        this.teacherInChargeId = teacherInChargeId;
    }
}
