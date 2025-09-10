package com.school.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.student.StudentRepository;
import com.school.academic.ClassRepository;
import com.school.staff.StaffRepository;
import com.school.finance.FeesRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private FeesRepository feesRepository;

    public Map<String, Long> getDashboardCounts() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("students", studentRepository.count());
        counts.put("classes", classRepository.count());
        counts.put("staff", staffRepository.count());
        counts.put("totalFees", feesRepository.sumTotalFees());
        return counts;
    }
}
