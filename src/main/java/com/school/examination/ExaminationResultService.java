            // ...existing code...
package com.school.examination;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("examinationResultService")
public class ExaminationResultService {

    @Autowired
    private ResultRepository resultRepository;

    public List<ResultEntity> getAllResults() {
        return resultRepository.findAll();
    }

    public ResultEntity getResultById(Long id) {
        return resultRepository.findById(id).orElseThrow(() -> new RuntimeException("Result not found"));
    }

    public ResultEntity createResult(ResultEntity resultEntity) {
        resultEntity.setGrade(calculateGrade(resultEntity.getMarksObtained(), resultEntity.getExam().getMaximumMarks()));
        return resultRepository.save(resultEntity);
    }

    public ResultEntity updateResult(Long id, ResultEntity resultDetails) {
        ResultEntity result = resultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Result not found"));
        result.setMarksObtained(resultDetails.getMarksObtained());
        result.setGrade(calculateGrade(resultDetails.getMarksObtained(), result.getExam().getMaximumMarks()));
        return resultRepository.save(result);
    }

    public void deleteResult(Long id) {
        resultRepository.deleteById(id);
    }

    public List<ResultEntity> getResultsByStudentId(Long studentId) {
        return resultRepository.findByStudent_Id(studentId);
    }

    public List<ResultEntity> getResultsByClassId(Long classId) {
        return resultRepository.findByClassEntity_Id(classId);
    }

    public List<ResultEntity> getResultsByExamId(Long examId) {
        return resultRepository.findByExam_Id(examId);
    }

    private String calculateGrade(double marksObtained, double maximumMarks) {
        double percentage = (marksObtained / maximumMarks) * 100;
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B+";
        if (percentage >= 60) return "B";
        if (percentage >= 50) return "C";
        return "F";
    }
}
