package com.school.results.exception;

public class ResultNotFoundException extends RuntimeException {
    public ResultNotFoundException(String message) {
        super(message);
    }

    public ResultNotFoundException(Long id) {
        super("Result not found with id: " + id);
    }
}
