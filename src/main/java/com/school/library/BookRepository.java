package com.school.library;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    java.util.List<BookEntity> findByAvailableTrue();

    java.util.List<BookEntity> findByTitleContainingOrAuthorContainingOrCategoryContaining(String title, String author, String category);

    java.util.List<BookEntity> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrIsbnContainingIgnoreCase(String title, String author, String isbn);
}
