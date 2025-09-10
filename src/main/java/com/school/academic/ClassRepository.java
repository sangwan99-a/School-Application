package com.school.academic;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
	ClassEntity findByName(String name);
}
