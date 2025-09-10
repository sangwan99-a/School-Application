package com.school.results;

import org.springframework.stereotype.Service;
import com.school.examination.ResultEntity;
import com.school.examination.ResultRepository;
import com.school.results.dto.ResultDTO;
import com.school.results.mapper.ResultMapper;
import com.school.results.exception.ResultNotFoundException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service("resultsResultService")
public class ResultService {

    private final ResultRepository resultRepository;
    private final ResultMapper resultMapper;

    public ResultService(ResultRepository resultRepository, ResultMapper resultMapper) {
        this.resultRepository = resultRepository;
        this.resultMapper = resultMapper;
    }

    public ResultDTO createResult(ResultDTO resultDTO) {
        ResultEntity entity = resultMapper.toEntity(resultDTO);
        entity = resultRepository.save(entity);
        return resultMapper.toDTO(entity);
    }

    public List<ResultDTO> getAllResults() {
        return resultMapper.toDTOList(resultRepository.findAll());
    }

    public ResultDTO getResultById(Long id) {
        ResultEntity entity = resultRepository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException(id));
        return resultMapper.toDTO(entity);
    }

    public ResultDTO updateResult(Long id, ResultDTO resultDTO) {
        ResultEntity entity = resultRepository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException(id));
        resultMapper.updateEntityFromDTO(resultDTO, entity);
        entity = resultRepository.save(entity);
        return resultMapper.toDTO(entity);
    }

    public void deleteResult(Long id) {
        if (!resultRepository.existsById(id)) {
            throw new ResultNotFoundException(id);
        }
        resultRepository.deleteById(id);
    }

    public double calculateOverallPercentage(Long studentId) {
        List<ResultEntity> results = resultRepository.findByStudent_Id(studentId);
        if (results.isEmpty()) {
            throw new ResultNotFoundException("No results found for student with id: " + studentId);
        }
        
        double marksObtained = results.stream()
                .mapToDouble(ResultEntity::getMarksObtained)
                .sum();
        
        // Get total possible marks from exam
        double maxMarks = results.stream()
                .mapToDouble(result -> result.getExam().getMaxMarks())
                .sum();
                
        return maxMarks == 0 ? 0 : (marksObtained / maxMarks) * 100;
    }

    public String calculateGrade(double marksObtained, double maxMarks) {
        if (maxMarks <= 0) {
            throw new IllegalArgumentException("Maximum marks must be greater than 0");
        }
        
        double percentage = (marksObtained / maxMarks) * 100;
        if (percentage >= 90) return "A+";
        else if (percentage >= 80) return "A";
        else if (percentage >= 70) return "B+";
        else if (percentage >= 60) return "B";
        else if (percentage >= 50) return "C";
        else return "F";
    }

    public List<ResultDTO> getResultsByFilters(Long studentId, Long examId, Long classId) {
        List<ResultEntity> results;
        
        if (studentId != null && examId != null) {
            results = resultRepository.findByExam_IdAndStudent_Id(examId, studentId);
        } else if (studentId != null) {
            results = resultRepository.findByStudent_Id(studentId);
        } else if (examId != null) {
            results = resultRepository.findByExam_Id(examId);
        } else if (classId != null) {
            results = resultRepository.findByClassEntity_Id(classId);
        } else {
            results = resultRepository.findAll();
        }
        
        return resultMapper.toDTOList(results);
    }

    public Map<String, Long> getResultStatistics() {
        List<ResultDTO> results = getAllResults();
        return results.stream()
                .collect(Collectors.groupingBy(ResultDTO::getGrade, Collectors.counting()));
    }
}
