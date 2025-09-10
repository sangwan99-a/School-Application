
package com.school.academic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AcademicTimetableRepository extends JpaRepository<AcademicTimetableEntity, Long> {

    List<AcademicTimetableEntity> findByClassId(Long classId);
}
