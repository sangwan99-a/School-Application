package com.school.staff;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StaffEntity {
    private String dateOfBirth;
    private String gender;
    private String address;
    private String aadhaarNumber;
    private String socialCategory;
    private String maritalStatus;
    private String religion;
    private String academicQualifications;
    private String professionalQualifications;
    private String subjectSpecialization;
    private String staffCode;
    private String appointmentType;
    private String joiningDate;
    private String appointmentDetails;
    private String trainingDetails;
    private String languageProficiency;
    private String achievementsAwards;
    private String healthCardDetails;
    private String previousEmploymentHistory;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String role;

    private String category; // Teaching or Non-Teaching

    private String subCategory; // e.g., Principal, Janitor, IT Specialist, etc.

    private String email;

    private String phoneNumber;

    private Double salary;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}
