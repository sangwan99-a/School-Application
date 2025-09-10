    // ...existing code...
package com.school.finance;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeeService {

    private final FeeRepository feeRepository;

    public FeeService(FeeRepository feeRepository) {
        this.feeRepository = feeRepository;
    }

    public List<FeeEntity> getAllFees() {
        return feeRepository.findAll();
    }

    public FeeEntity getFeeById(Long id) {
        return feeRepository.findById(id).orElseThrow(() -> new RuntimeException("Fee record not found"));
    }

    public FeeEntity createFee(FeeEntity feeEntity) {
        return feeRepository.save(feeEntity);
    }

    public FeeEntity updateFee(Long id, FeeEntity feeDetails) {
        FeeEntity feeEntity = getFeeById(id);
        feeEntity.setStudentName(feeDetails.getStudentName());
        feeEntity.setGrade(feeDetails.getGrade());
        feeEntity.setAmount(feeDetails.getAmount());
        feeEntity.setDueDate(feeDetails.getDueDate());
        feeEntity.setIsPaid(feeDetails.getIsPaid());
        return feeRepository.save(feeEntity);
    }

    public void deleteFee(Long id) {
        feeRepository.deleteById(id);
    }

    public double getTotalFeesCollected() {
        return feeRepository.findAll().stream()
            .filter(FeeEntity::getIsPaid)
            .mapToDouble(FeeEntity::getAmount)
            .sum();
    }
}
