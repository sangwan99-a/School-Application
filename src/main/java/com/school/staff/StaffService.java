package com.school.staff;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StaffService {

    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<StaffEntity> getAllStaff() {
        return staffRepository.findAll();
    }

    public StaffEntity getStaffById(Long id) {
        return staffRepository.findById(id).orElseThrow(() -> new RuntimeException("Staff not found"));
    }

    public StaffEntity createStaff(StaffEntity staffEntity) {
        // Assign unique teacher ID if not already set
        if (staffEntity.getStaffCode() == null || staffEntity.getStaffCode().isEmpty()) {
            String year = String.valueOf(java.time.LocalDate.now().getYear());
            long count = staffRepository.count() + 1;
            String staffCode = "TCH" + year + String.format("%05d", count);
            staffEntity.setStaffCode(staffCode);
        }
        return staffRepository.save(staffEntity);
    }

    public StaffEntity updateStaff(Long id, StaffEntity staffDetails) {
        StaffEntity staffEntity = getStaffById(id);
        staffEntity.setName(staffDetails.getName());
        staffEntity.setRole(staffDetails.getRole());
        staffEntity.setEmail(staffDetails.getEmail());
        staffEntity.setPhoneNumber(staffDetails.getPhoneNumber());
        staffEntity.setSalary(staffDetails.getSalary());
    staffEntity.setCategory(staffDetails.getCategory());
    staffEntity.setSubCategory(staffDetails.getSubCategory());
        return staffRepository.save(staffEntity);
    }

    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }

    public long getStaffCount() {
        return staffRepository.count();
    }

    public StaffEntity updateSubjectSpecialization(Long id, String specialization) {
        StaffEntity staffEntity = getStaffById(id);
        staffEntity.setSubjectSpecialization(specialization);
        return staffRepository.save(staffEntity);
    }
}
