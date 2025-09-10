package com.school.library;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issued-books")
public class IssuedBookController {

    private final IssuedBookService issuedBookService;

    public IssuedBookController(IssuedBookService issuedBookService) {
        this.issuedBookService = issuedBookService;
    }

    @GetMapping("/student/{borrower}")
    public List<IssuedBook> getIssuedBooksByStudentId(@PathVariable String borrower) {
        return issuedBookService.getIssuedBooksByStudentId(borrower);
    }

    @PostMapping
    public IssuedBook issueBook(@RequestBody IssuedBook issuedBook) {
        return issuedBookService.issueBook(issuedBook);
    }

    @DeleteMapping("/{id}")
    public void returnBook(@PathVariable Long id) {
        issuedBookService.returnBook(id);
    }
}
