package com.school.finance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeesRepository extends JpaRepository<FeesEntity, Long> {
	@Query("SELECT SUM(f.amount) FROM FeesEntity f")
	Long sumTotalFees();
}