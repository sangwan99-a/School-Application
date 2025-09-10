package com.school.finance;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeRepository extends JpaRepository<FeeEntity, Long> {
	// Removed admissionNo related query method
}
